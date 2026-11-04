"use client";

import * as React from "react";
import Image from "next/image";
import tbcLogo from "../../../assets/logos/tbc-logo-header.png";
import styles from "./polaroid-line-carousel.module.css";

/*
 * Polaroid Line Carousel — instant photos mounted with TBC logo clips. Drag the
 * line and the prints slide along it, swinging on their
 * pegs with the speed you give them and settling back with a little
 * overshoot; even at rest they sway in a light breeze. The one in the middle
 * is the one you're looking at.
 *
 * Drag, click a print, horizontal scroll, ←/→ and autoplay that pauses on hover or focus.
 */

export type Slide = {
  image: string;
  title?: string;
  caption?: string;
  alt?: string;
};

export type PolaroidLineCarouselProps = {
  slides: Slide[];
  initialIndex?: number;
  /** Any CSS length. Default 560px. */
  height?: number | string;
  /** Width of a print in px (it shrinks on narrow screens). */
  cardWidth?: number;
  /** How far the string sags in the middle, px. */
  sag?: number;
  /** How much the prints swing; 0 holds them still. */
  swing?: number;
  /** ms per print; 0 turns autoplay off. It waits while someone is interacting. */
  autoplay?: number;
  /** Colour of the string and pegs. */
  string?: string;
  background?: string;
  ink?: string;
  onChange?: (index: number) => void;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
};

// #region logic
export function wrap(i: number, n: number): number {
  return n ? ((i % n) + n) % n : 0;
}

export function clamp(v: number, a: number, b: number): number {
  return Math.min(b, Math.max(a, v));
}

/** Height of a string sagging by `sag` between (0, y0) and (w, y0), at x. */
export function stringY(x: number, w: number, y0: number, sag: number): number {
  const t = clamp(x / w, 0, 1);
  return y0 + 4 * sag * t * (1 - t);
}

/** One step of a critically damped spring toward target. */
export function springStep(
  x: number,
  v: number,
  target: number,
  dt: number,
  k = 70,
): [number, number] {
  const c = 2 * Math.sqrt(k);
  const nv = v + (k * (target - x) - c * v) * dt;
  return [x + nv * dt, nv];
}

/** One step of a print's swing. lineVel is the prints' on-screen speed (px/s, + = moving right); a print lags behind the motion, is pulled back by gravity and damped. */
export function swingStep(
  a: number,
  w: number,
  lineVel: number,
  dt: number,
  gain: number,
): [number, number] {
  const nw = w + (-38 * a - 4.2 * w + lineVel * 0.0034 * gain) * dt;
  return [clamp(a + nw * dt, -0.6, 0.6), nw];
}

/** Index of the print nearest the centre for a line offset. */
export function nearestAt(off: number, spacing: number, n: number): number {
  return wrap(Math.round(off / spacing), n);
}

export function pad2(n: number): string {
  return n < 10 ? "0" + n : String(n);
}
// #endregion logic

export default function PolaroidLineCarousel({
  slides,
  initialIndex = 0,
  height = 560,
  cardWidth = 350,
  sag = 40,
  swing = 1,
  autoplay = 4500,
  string = "var(--tbc-purple)",
  background = "#100d17",
  ink = "#ffffff",
  onChange,
  className,
  style,
  ariaLabel = "Image carousel",
}: PolaroidLineCarouselProps) {
  const n = slides.length;
  const start = clamp(initialIndex, 0, Math.max(0, n - 1));
  const [active, setActive] = React.useState(start);
  const [interacting, setInteracting] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);
  const [size, setSize] = React.useState({ w: 1200, h: 800, cw: cardWidth });
  const rootRef = React.useRef(null as HTMLDivElement | null);
  const pathRef = React.useRef(null as SVGPathElement | null);
  const braidRef = React.useRef<SVGPathElement | null>(null);
  const cards = React.useRef([] as (HTMLDivElement | null)[]);
  const sim = React.useRef({
    off: 0,
    vel: 0,
    target: 0,
    a: [] as number[],
    w: [] as number[],
  });
  const drag = React.useRef(
    null as null | {
      x: number;
      off: number;
      lx: number;
      lt: number;
      v: number;
      moved: boolean;
    },
  );
  const lastTouch = React.useRef(0);
  const activeRef = React.useRef(start);
  const opts = React.useRef({ sag, swing });
  React.useEffect(() => {
    opts.current = { sag, swing };
  }, [sag, swing]);

  const spacing = size.cw * 1.08;
  const goTo = React.useCallback(
    (i: number) => {
      sim.current.target = i * spacing;
    },
    [spacing],
  );

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(() => {
      const r = root.getBoundingClientRect();
      const cw = Math.round(
        Math.max(180, Math.min(cardWidth, r.width * 0.76, r.height - 185)),
      );
      setSize({ w: r.width, h: r.height, cw });
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [cardWidth]);

  // keep the target on the active print when the spacing changes
  React.useEffect(() => {
    sim.current.target = activeRef.current * spacing;
    sim.current.off = activeRef.current * spacing;
  }, [spacing]);

  React.useEffect(() => {
    onChange?.(active);
  }, [active, onChange]);

  // the simulation, written straight to the DOM each frame
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let visible = true;
    let raf = 0;
    let prev = performance.now();
    const S = sim.current;
    const frame = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.033, (now - prev) / 1000);
      prev = now;
      const { w, h, cw } = size;
      const y0 = Math.max(54, h * 0.1);
      const d = drag.current;
      let lineVel: number;
      if (d && d.moved) {
        lineVel = d.v * 1000;
      } else {
        const before = S.off;
        if (reduce) {
          S.off = S.target;
          S.vel = 0;
        } else {
          [S.off, S.vel] = springStep(S.off, S.vel, S.target, dt);
        }
        lineVel = -(S.off - before) / Math.max(dt, 1e-3);
      }
      const o = opts.current;
      const g = reduce ? 0 : o.swing;
      const near = nearestAt(S.off, spacing, n);
      for (let i = 0; i < n; i++) {
        const el = cards.current[i];
        if (!el) continue;
        // Recycle each print only after it travels outside the viewport.
        // The unbounded offset keeps last → first moving in the same direction.
        const distance = wrap(i - S.off / spacing + n / 2, n) - n / 2;
        const x = w / 2 + distance * spacing;
        if (x < -cw * 1.5 || x > w + cw * 1.5) {
          el.style.visibility = "hidden";
          continue;
        }
        el.style.visibility = "visible";
        let a = S.a[i] || 0;
        let av = S.w[i] || 0;
        [a, av] = swingStep(a, av, lineVel, dt, g);
        if (g) a += Math.sin(now / 1300 + i * 1.7) * 0.0009 * g;
        S.a[i] = a;
        S.w[i] = av;
        const y = stringY(x, w, y0, o.sag) - 6;
        el.style.transform =
          "translate(" +
          (x - cw / 2).toFixed(1) +
          "px," +
          y.toFixed(1) +
          "px) rotate(" +
          a.toFixed(4) +
          "rad)";
        el.style.zIndex = String(
          i === near ? n + 1 : n - Math.round(Math.abs(distance)),
        );
      }
      const rope = `M0 ${y0 + 4} Q${w / 2} ${y0 + 2 * o.sag + 4} ${w} ${y0 + 4}`;
      pathRef.current?.setAttribute("d", rope);
      braidRef.current?.setAttribute("d", rope);
      if (near !== activeRef.current) {
        activeRef.current = near;
        setActive(near);
      }
      raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) {
        prev = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(root);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [size, spacing, n]);

  // Autoplay advances an unbounded slot so the loop never rewinds.
  React.useEffect(() => {
    if (
      !autoplay ||
      n < 2 ||
      interacting ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const t = window.setInterval(() => {
      if (
        document.hidden ||
        drag.current ||
        performance.now() - lastTouch.current < autoplay
      )
        return;
      goTo(Math.round(sim.current.target / spacing) + 1);
    }, autoplay);
    return () => window.clearInterval(t);
  }, [autoplay, n, goTo, interacting, spacing]);

  const onDown = (e: React.PointerEvent) => {
    if (n < 2 || e.button !== 0) return;
    lastTouch.current = performance.now();
    drag.current = {
      x: e.clientX,
      off: sim.current.off,
      lx: e.clientX,
      lt: e.timeStamp,
      v: 0,
      moved: false,
    };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      setDragging(true);
      rootRef.current?.setPointerCapture(e.pointerId);
    }
    if (!d.moved) return;
    const dt = Math.max(1, e.timeStamp - d.lt);
    d.v = 0.7 * ((e.clientX - d.lx) / dt) + 0.3 * d.v;
    d.lx = e.clientX;
    d.lt = e.timeStamp;
    sim.current.off = d.off - dx;
  };
  const onUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    lastTouch.current = performance.now();
    if (!d) return;
    if (d.moved) {
      setDragging(false);
      sim.current.vel = -d.v * 1000;
      goTo(Math.round((sim.current.off - d.v * 180) / spacing));
      return;
    }
    const card = (e.target as HTMLElement).closest("[data-i]");
    if (card) {
      const current = Math.round(sim.current.off / spacing);
      const index = Number(card.getAttribute("data-i"));
      goTo(current + wrap(index - wrap(current, n) + n / 2, n) - n / 2);
    }
  };
  const step = (dir: number) => {
    lastTouch.current = performance.now();
    if (n > 1) goTo(Math.round(sim.current.target / spacing) + dir);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
    else return;
    e.preventDefault();
  };

  const s = slides[active] || {};
  if (!n) return null;

  return (
    <div
      ref={rootRef}
      className={["pl-root", styles.carousel, className]
        .filter(Boolean)
        .join(" ")}
      style={{
        height,
        ["--pl-bg" as string]: background,
        ["--pl-ink" as string]: ink,
        ["--pl-muted" as string]:
          "color-mix(in srgb, var(--pl-ink) 55%, transparent)",
        ["--pl-line" as string]:
          "color-mix(in srgb, var(--pl-ink) 18%, transparent)",
        ["--pl-cw" as string]: size.cw + "px",
        ...style,
      }}
      data-drag={dragging ? "1" : "0"}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKey}
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false);
      }}
      onWheel={(e) => {
        if (n > 1 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          lastTouch.current = performance.now();
          sim.current.target += e.deltaX;
        }
      }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <svg className="pl-chain" aria-hidden="true">
        <path
          ref={pathRef}
          fill="none"
          stroke={string}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          ref={braidRef}
          fill="none"
          stroke="#d8caee"
          strokeOpacity=".5"
          strokeWidth="1"
          strokeDasharray="2 4"
          strokeLinecap="round"
        />
      </svg>
      {slides.map((sl, i) => (
        <div
          key={i}
          className="pl-card"
          data-i={i}
          data-on={i === active ? "1" : "0"}
          ref={(el) => void (cards.current[i] = el)}
          aria-hidden={i === active ? undefined : true}
        >
          <div className="pl-print">
            <div className="pl-shot">
              <Image
                src={sl.image}
                alt={sl.alt || sl.title || ""}
                fill
                sizes="(max-width: 600px) 76vw, 350px"
                style={{ objectFit: "cover", objectPosition: "center" }}
                unoptimized
                draggable={false}
              />
            </div>
            <div className="pl-note">{sl.title || ""}</div>
          </div>
          <Image
            className="pl-logo"
            src={tbcLogo}
            alt=""
            aria-hidden="true"
            width={44}
            height={44}
            draggable={false}
          />
        </div>
      ))}
      <div
        className="pl-sr"
        aria-live={interacting || !autoplay ? "polite" : "off"}
      >
        {"Print " + (active + 1) + " of " + n + (s.title ? ": " + s.title : "")}
      </div>
    </div>
  );
}

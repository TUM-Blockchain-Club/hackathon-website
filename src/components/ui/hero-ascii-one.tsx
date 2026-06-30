import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { FallingPattern } from "@/components/ui/falling-pattern";
import { HeroLogoShader } from "@/components/ui/hero-logo-shader";
import { ShaderCtaLink } from "@/components/ui/shader-cta-link";
import { cn } from "@/lib/utils";

type HeroAsciiOneProps = {
  eyebrow: string;
  headline: string;
  subhead: string;
  primaryCta: {
    label: string;
    href: string;
    disabled?: boolean;
  };
  devfolioHackathonSlug?: string;
  secondaryCta: {
    label: string;
    href: string;
  };
};

export function HeroAsciiOne({
  eyebrow,
  devfolioHackathonSlug,
  primaryCta,
  secondaryCta,
}: HeroAsciiOneProps) {
  return (
    <section className="relative isolate flex min-h-svh items-center justify-center overflow-hidden border-b border-border bg-black">
      {/* Falling pattern background */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 top-8 z-0"
        aria-hidden="true"
      >
        <FallingPattern
          className="h-full w-full [filter:brightness(5)] [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.55)_8%,rgba(0,0,0,0.92)_22%,var(--background)_100%)]"
          color="var(--primary)"
          duration={120}
          blurIntensity="0.75rem"
          density={2}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-55"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(circle at 50% 50%, black 0%, transparent 72%)",
        }}
      />

      {/* Centered hero content */}
      <div className="site-container relative z-10 flex flex-col items-center pb-16 pt-28 text-center">
        {/* Big graphic – centered and dominant */}
        <div className="w-full max-w-[820px]">
          <HeroLogoShader
            priority
            className="w-full"
            sizes="(min-width: 1024px) 820px, calc(100vw - 32px)"
          />
        </div>

        {/* Date · Venue line */}
        <p className="mt-8 font-mono text-sm font-medium tracking-wide text-white/70 md:text-base">
          {eyebrow}
        </p>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {primaryCta.disabled ? (
            <button
              disabled
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "cursor-not-allowed border-white/20 bg-white/10 text-white/65 shadow-none disabled:opacity-100",
              )}
            >
              {primaryCta.label}
              <ArrowRight aria-hidden="true" size={18} />
            </button>
          ) : devfolioHackathonSlug ? (
            <div className="relative h-11 w-[calc(100vw-32px)] max-w-[312px] shrink-0 sm:w-[312px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden opacity-0"
              >
                <div
                  className="apply-button"
                  data-hackathon-slug={devfolioHackathonSlug}
                  data-button-theme="light"
                  style={{ height: 44, width: 312 }}
                />
              </div>
              <Link
                href={primaryCta.href}
                className="relative z-10 inline-flex h-11 w-full items-center justify-center border-2 border-transparent bg-[#3770ff] px-8 text-[20px] font-semibold leading-none text-white transition-colors duration-100 hover:bg-[#2f62df] focus-visible:border-[#85a7ff] focus-visible:outline-none"
                style={{
                  borderRadius: 4,
                  fontFamily: '"Nunito Sans", sans-serif',
                }}
              >
                <svg
                  aria-hidden="true"
                  className="mr-2 size-6 shrink-0"
                  viewBox="0 0 115.46 123.46"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M115.46 68a55.43 55.43 0 0 1-50.85 55.11S28.12 124 16 123a12.6 12.6 0 0 1-10.09-7.5 15.85 15.85 0 0 0 5.36 1.5c4 .34 10.72.51 20.13.51 13.82 0 28.84-.38 29-.38h.26a60.14 60.14 0 0 0 54.72-52.47c.05 1.05.08 2.18.08 3.34z" />
                  <path d="M110.93 55.87A55.43 55.43 0 0 1 60.08 111s-36.48.92-48.58-.12C5 110.29.15 104.22 0 97.52l.2-83.84C.38 7 5.26.94 11.76.41c12.11-1 48.59.12 48.59.12a55.41 55.41 0 0 1 50.58 55.34z" />
                </svg>
                Apply with Devfolio
              </Link>
            </div>
          ) : (
            <ShaderCtaLink href={primaryCta.href} size="lg">
              {primaryCta.label}
              <ArrowRight aria-hidden="true" size={18} />
            </ShaderCtaLink>
          )}
          <Link
            href={secondaryCta.href}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            {secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

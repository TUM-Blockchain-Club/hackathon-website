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
  secondaryCta: {
    label: string;
    href: string;
  };
};

export function HeroAsciiOne({
  eyebrow,
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

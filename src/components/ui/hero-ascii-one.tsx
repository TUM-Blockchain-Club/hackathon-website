import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { FallingPattern } from "@/components/ui/falling-pattern";
import { HeroLogoShader } from "@/components/ui/hero-logo-shader";
import { ShaderCtaLink } from "@/components/ui/shader-cta-link";
import { cn } from "@/lib/utils";

type HeroAsciiOneProps = {
  eyebrow?: string;
  date?: string;
  location?: string;
  headline?: string;
  subhead?: string;
  primaryCta: {
    label: string;
    href: string;
    disabled?: boolean;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  partnerInquiry?: {
    label: string;
    href: string;
  };
};

export function HeroAsciiOne({
  eyebrow,
  date,
  location,
  primaryCta,
  secondaryCta,
  partnerInquiry,
}: HeroAsciiOneProps) {
  const displayDate =
    date ??
    (eyebrow?.includes("//") ? eyebrow.split("//")[1]?.trim() : eyebrow);

  const displayLocation =
    location ??
    (eyebrow?.includes("//") ? eyebrow.split("//")[0]?.trim() : undefined);

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
      <div className="site-container relative z-10 flex min-h-[calc(100svh-1px)] flex-col items-center justify-center gap-[clamp(0.75rem,3svh,1.5rem)] pb-6 pt-28 text-center [@media(max-height:500px)]:pb-3">
        {/* Big graphic – centered and dominant */}
        <div className="w-full max-w-[min(820px,max(120px,calc((100svh-27rem)*875/495)))] sm:max-w-[min(820px,max(120px,calc((100svh-25rem)*875/495)))]">
          <HeroLogoShader
            priority
            className="w-full"
            sizes="(min-width: 1024px) 820px, calc(100vw - 32px)"
          />
        </div>

        {/* Semi-transparent frosted box for date, location & CTAs */}
        <div className="relative w-full max-w-xl overflow-hidden rounded-none border border-white/15 bg-black/70 p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-5 md:p-6 [@media(max-height:500px)]:p-3">
          {/* Subtle top sheen highlight */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
            aria-hidden="true"
          />

          {/* Date & Location block */}
          <div className="flex flex-col items-center gap-1.5 sm:gap-2">
            {displayDate && (
              <p className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl [@media(max-height:500px)]:text-2xl">
                {displayDate}
              </p>
            )}
            {displayLocation && (
              <p className="text-sm font-medium text-white/75 sm:text-base md:text-lg">
                {displayLocation}
              </p>
            )}
          </div>

          {/* CTA buttons */}
          <div className="mt-4 flex flex-col items-center gap-3 [@media(max-height:500px)]:mt-3 [@media(max-height:500px)]:gap-2">
            <div className="flex flex-col gap-3 sm:flex-row">
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

            {partnerInquiry && (
              <Link
                href={partnerInquiry.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-white/50 transition-colors hover:text-white sm:text-sm"
              >
                <span>{partnerInquiry.label}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

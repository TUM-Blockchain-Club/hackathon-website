"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Globe,
  Lightbulb,
  Trophy,
} from "lucide-react";

import { prizeContent } from "@/content/prizes";
import { cn } from "@/lib/utils";
import type { PrizeTrack, TrackCompany } from "@/types/content";

type PrizeTracksProps = {
  tracks: PrizeTrack[];
  className?: string;
};

function hostLabel(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function PartnerCard({ company }: { company: TrackCompany }) {
  const prizes = company.prizes ?? [];

  return (
    <article className="flex flex-col rounded-[16px] border border-white/10 bg-black p-5 transition-colors hover:border-white/20 sm:p-6">
      <div className="flex items-center gap-3.5">
        <span
          className={cn(
            "relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[10px]",
            company.markFullBleed ? "ring-1 ring-white/10" : "bg-white",
          )}
        >
          {company.markSrc || company.logoSrc ? (
            <Image
              src={company.markSrc ?? company.logoSrc ?? ""}
              alt={company.logoAlt ?? `${company.name} logo`}
              fill
              sizes="48px"
              className={
                company.markFullBleed ? "object-cover" : "object-contain p-1.5"
              }
            />
          ) : (
            <span
              role="img"
              aria-label={company.logoAlt ?? `${company.name} logo`}
              className="font-display text-sm font-bold text-black"
            >
              {initials(company.name)}
            </span>
          )}
        </span>
        <div className="min-w-0">
          <h4 className="font-display text-base font-semibold text-white sm:text-lg">
            {company.name}
          </h4>
          <a
            href={company.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-0.5 text-xs text-white/50 transition-colors hover:text-white"
          >
            {hostLabel(company.href)}
            <ArrowUpRight aria-hidden="true" size={12} />
          </a>
        </div>
      </div>

      <p className="mt-6 font-display text-3xl font-semibold tracking-tight text-white">
        {company.amount}
        {company.amountNote ? (
          <span className="ml-2 text-sm font-normal tracking-normal text-white/50">
            {company.amountNote}
          </span>
        ) : null}
      </p>

      {company.description ? (
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          {company.description}
        </p>
      ) : null}

      <div className="mt-auto pt-6">
        {prizes.length > 0 ? (
          <dl className="divide-y divide-white/10 border-t border-white/10 text-sm">
            {prizes.map((prize, idx) => (
              <div
                key={`${prize.place ?? idx}-${prize.title}`}
                className="flex items-baseline gap-4 py-2.5"
              >
                <dt className="w-8 shrink-0 text-white/40">{prize.place}</dt>
                <dd className="min-w-0 flex-1 text-white/85">{prize.title}</dd>
                <dd className="shrink-0 tabular-nums text-white/60">
                  {prize.amount}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="border-t border-white/10 pt-3 text-sm text-white/40">
            {prizeContent.partnerPrizesFallback}
          </p>
        )}
      </div>
    </article>
  );
}

export function PrizeTracks({ tracks, className }: PrizeTracksProps) {
  const [activeSlug, setActiveSlug] = useState<string>(tracks[0]?.slug ?? "");

  // Sync active tab with URL hash (e.g. /prizes#cardano) without awkward jump scrolling
  useEffect(() => {
    if (typeof window !== "undefined") {
      const syncFromHash = () => {
        let hash = window.location.hash.replace("#", "");
        if (
          hash === "adevar-labs" ||
          hash === "tum-blockchain-track" ||
          hash === "tum-blockchain"
        ) {
          hash = "tum-blockchain-club";
        }
        if (hash && tracks.some((t) => t.slug === hash)) {
          setActiveSlug(hash);
        }
      };

      syncFromHash();
      // Keep page positioned at the top on entry so the header banner and layout remain in view
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" as ScrollBehavior,
      });

      window.addEventListener("hashchange", syncFromHash);
      return () => {
        window.removeEventListener("hashchange", syncFromHash);
      };
    }
  }, [tracks]);

  if (tracks.length === 0) {
    return (
      <div className={cn("mx-auto max-w-4xl", className)}>
        <div className="surface-panel prize-track-field p-6 text-center md:p-10">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-tbc-yellow">
            Partner track slots
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold text-white">
            {prizeContent.fallback}
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Partner tracks are being finalized, and confirmed program details
            will be added soon.
          </p>
        </div>
      </div>
    );
  }

  const activeTrack = tracks.find((t) => t.slug === activeSlug) ?? tracks[0];

  const ideas = activeTrack.ideas ?? [];
  const howToWin = activeTrack.howToWin ?? [];
  const companies = activeTrack.companies ?? [];
  const selectionCriteria = activeTrack.selectionCriteria ?? [];
  const requirements =
    activeTrack.requirements && activeTrack.requirements.length > 0
      ? activeTrack.requirements
      : companies.length > 0
        ? []
        : prizeContent.defaultRequirements;
  const hasDetailedContent =
    Boolean(activeTrack.description) ||
    ideas.length > 0 ||
    howToWin.length > 0 ||
    companies.length > 0 ||
    selectionCriteria.length > 0 ||
    requirements.length > 0;

  const activeLogoSrc =
    activeTrack.sponsorLogoSrc ?? activeTrack.sponsorMarkSrc;

  return (
    <div
      className={cn(
        "prize-track-field relative z-10 overflow-hidden rounded-[24px] border border-white/15 bg-[#0a0a0c] shadow-[0_24px_80px_rgba(0,0,0,0.8)] ring-1 ring-white/10",
        className,
      )}
    >
      <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-[280px_1fr] md:divide-x md:divide-y-0 lg:grid-cols-[320px_1fr]">
        {/* Left Column: Sidebar / Tab List */}
        <div className="flex flex-col bg-black/40">
          <div className="hidden border-b border-white/10 px-6 py-5 md:block">
            <h3 className="font-display text-xl font-bold tracking-tight text-white">
              {tracks.length} {tracks.length === 1 ? "Prize" : "Prizes"}
            </h3>
          </div>

          <div
            className="flex flex-row gap-2 overflow-x-auto p-3 md:flex-col md:overflow-x-visible md:p-4"
            role="tablist"
          >
            {tracks.map((track) => {
              const isSelected = track.slug === activeTrack.slug;
              const markSrc = track.sponsorMarkSrc ?? track.sponsorLogoSrc;

              return (
                <button
                  key={track.slug}
                  id={track.slug}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setActiveSlug(track.slug);
                    if (typeof window !== "undefined") {
                      window.history.replaceState(null, "", `#${track.slug}`);
                    }
                  }}
                  className={cn(
                    "flex shrink-0 items-center gap-3.5 rounded-[16px] px-4 py-3 text-left transition-all md:w-full",
                    isSelected
                      ? "border-l-2 border-l-tbc-yellow bg-gradient-to-r from-white/[0.14] to-white/[0.05] text-white shadow-md ring-1 ring-tbc-yellow/30"
                      : "text-white/70 hover:bg-white/[0.04] hover:text-white",
                  )}
                >
                  {markSrc ? (
                    <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-[9999px] bg-white shadow-sm transition-transform">
                      <Image
                        src={markSrc}
                        alt={`${track.sponsor} logo`}
                        fill
                        sizes="40px"
                        className="object-contain p-1.5"
                      />
                    </span>
                  ) : (
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-[9999px] bg-white font-mono text-xs font-bold text-black">
                      {track.sponsor[0]}
                    </span>
                  )}
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-bold tracking-tight text-white">
                      {track.sponsor}
                    </span>
                    <span className="text-xs font-semibold text-white/60">
                      {track.amount ?? prizeContent.trackAmountFallback}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Tab Detail Pane */}
        <div className="flex flex-col justify-between bg-white/[0.02] p-5 sm:p-6 md:p-8">
          <div>
            {/* Header: Logo, Title, Amount, Badges, & External Link */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4 sm:gap-5">
                {/* Large Logo Badge with ambient backlight glow */}
                <div className="relative shrink-0">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-1 rounded-[18px] bg-white/[0.04] blur-sm opacity-50"
                  />
                  {activeLogoSrc ? (
                    <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-[16px] bg-white p-2 shadow-lg sm:size-20">
                      <Image
                        src={activeLogoSrc}
                        alt={`${activeTrack.sponsor} logo`}
                        fill
                        sizes="80px"
                        className="object-contain p-2"
                      />
                    </div>
                  ) : (
                    <div className="relative flex size-16 shrink-0 items-center justify-center rounded-[16px] bg-white font-mono text-xl font-bold text-black shadow-lg sm:size-20">
                      {activeTrack.sponsor[0]}
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl">
                    {activeTrack.trackName ?? activeTrack.sponsor}
                  </h2>
                  <p className="mt-0.5 font-display text-lg font-bold text-tbc-yellow drop-shadow-[0_2px_12px_rgba(255,193,16,0.25)] sm:text-xl md:text-2xl">
                    {activeTrack.amount ?? prizeContent.trackAmountFallback}
                  </p>

                  {/* Badges / Links Row */}
                  <div className="mt-2.5 flex flex-wrap items-center gap-2">
                    {activeTrack.sponsorHref ? (
                      <a
                        href={activeTrack.sponsorHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-[9999px] border border-white/20 bg-white/[0.08] px-3 py-0.5 text-xs font-medium text-white/90 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/15 hover:text-white"
                      >
                        <Globe size={12} className="text-white/70" />
                        <span>{hostLabel(activeTrack.sponsorHref)}</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Open page button on top right */}
              {activeTrack.sponsorHref ? (
                <a
                  href={activeTrack.sponsorHref}
                  target="_blank"
                  rel="noreferrer"
                  className="prize-open-page-btn group/btn inline-flex shrink-0 items-center justify-center gap-1.5 rounded-[9999px] border border-white/25 bg-white/15 px-4 py-1.5 text-xs font-bold text-white shadow-md transition-all hover:scale-105 hover:border-white hover:bg-white hover:!text-black active:scale-95 sm:self-start"
                >
                  <span className="transition-colors group-hover/btn:!text-black">
                    Open page
                  </span>
                  <ArrowRight
                    size={13}
                    className="stroke-current transition-colors group-hover/btn:!text-black"
                  />
                </a>
              ) : null}
            </div>

            {/* About Section */}
            <div className="mt-6">
              <h3 className="font-display text-base font-bold text-white sm:text-lg">
                About
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-white/75 sm:text-sm">
                {activeTrack.about ?? prizeContent.trackDescriptionFallback}
              </p>
            </div>

            {/* Prize Details Section */}
            {hasDetailedContent ? (
              <div className="mt-8 space-y-8">
                {activeTrack.description ? (
                  <div>
                    <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                      Track brief
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/80 sm:text-sm">
                      {activeTrack.description}
                    </p>
                  </div>
                ) : null}

                {/* How to Win Section */}
                {howToWin.length > 0 ? (
                  <div>
                    <h4 className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                      <Trophy
                        aria-hidden="true"
                        size={13}
                        className="text-tbc-yellow"
                      />
                      How to win
                    </h4>
                    <ul className="mt-2.5 space-y-2">
                      {howToWin.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 rounded-[12px] border border-white/10 bg-white/[0.03] p-3 text-xs text-white/85 sm:text-sm"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 size-1.5 shrink-0 rounded-full bg-tbc-yellow shadow-[0_0_8px_rgba(255,193,16,0.5)]"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : ideas.length > 0 ? (
                  <div>
                    <h4 className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                      <Lightbulb aria-hidden="true" size={13} />
                      Example ideas
                    </h4>
                    <ul className="mt-1.5 space-y-1.5 text-xs text-white/80 sm:text-sm">
                      {ideas.map((idea) => (
                        <li key={idea} className="flex gap-2">
                          <span
                            aria-hidden="true"
                            className="mt-1.5 size-1.5 shrink-0 rounded-full bg-tbc-yellow"
                          />
                          <span>{idea}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {/* Contributing partners: one card per company in the pool */}
                {companies.length > 0 ? (
                  <section aria-labelledby="track-partners-heading">
                    <h3
                      id="track-partners-heading"
                      className="font-display text-base font-bold text-white sm:text-lg"
                    >
                      Contributing partners
                    </h3>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {companies.map((company) => (
                        <PartnerCard key={company.name} company={company} />
                      ))}
                    </div>
                  </section>
                ) : null}

                {selectionCriteria.length > 0 ? (
                  <section aria-labelledby="track-criteria-heading">
                    <h3
                      id="track-criteria-heading"
                      className="font-display text-base font-bold text-white sm:text-lg"
                    >
                      Selection criteria
                    </h3>
                    <ol className="mt-3 divide-y divide-white/10 rounded-[16px] border border-white/10 bg-black">
                      {selectionCriteria.map((criterion, idx) => (
                        <li
                          key={criterion}
                          className="flex gap-4 px-5 py-3.5 text-sm text-white/80"
                        >
                          <span className="w-4 shrink-0 tabular-nums text-white/35">
                            {idx + 1}
                          </span>
                          <span>{criterion}</span>
                        </li>
                      ))}
                    </ol>
                  </section>
                ) : null}

                {/* Submission requirements */}
                {requirements.length > 0 ? (
                  <details className="rounded-[14px] border border-white/10 bg-black/25 p-3.5">
                    <summary className="cursor-pointer font-mono text-xs font-semibold uppercase tracking-[0.16em] text-tbc-yellow">
                      Submission requirements
                    </summary>
                    <ul className="mt-3 space-y-1.5 text-xs text-white/80 sm:text-sm">
                      {requirements.map((requirement) => (
                        <li key={requirement} className="flex gap-2">
                          <Check
                            aria-hidden="true"
                            className="mt-0.5 shrink-0 text-tbc-yellow"
                            size={14}
                          />
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : null}
              </div>
            ) : (
              /* Coming soon dashed placeholder with warm ambient trophy badge */
              <div className="mt-6 flex flex-col items-center justify-center rounded-[16px] border border-dashed border-white/20 bg-gradient-to-b from-white/[0.04] to-transparent p-6 text-center backdrop-blur-sm sm:p-8">
                <div className="mb-2.5 flex size-12 items-center justify-center rounded-full border border-tbc-yellow/30 bg-tbc-yellow/10 shadow-[0_0_20px_rgba(255,193,16,0.18)]">
                  <Trophy className="size-5 text-tbc-yellow" />
                </div>
                <p className="text-xs font-semibold text-white/90 sm:text-sm">
                  Prize details coming soon
                </p>
                <p className="mt-1 text-[11px] text-white/50">
                  Track briefs and prize breakdowns will be published soon
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

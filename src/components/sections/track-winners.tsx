import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, LockKeyhole, Medal, Trophy } from "lucide-react";

import { prizeTracks } from "@/content/prizes";
import {
  winnerResults,
  type TrackWinner,
  type WinnerResults,
} from "@/content/winners";

// Gold, silver and bronze so the three places read apart at a glance.
const placeStyles: Record<
  string,
  { cell: string; badge: string; Icon: typeof Trophy }
> = {
  "1st": {
    cell: "border-tbc-yellow/45 border-t-tbc-yellow bg-tbc-yellow/[0.07]",
    badge: "bg-tbc-yellow text-black",
    Icon: Trophy,
  },
  "2nd": {
    cell: "border-[#d9dde3]/30 border-t-[#d9dde3] bg-white/[0.04]",
    badge: "bg-[#d9dde3] text-black",
    Icon: Medal,
  },
  "3rd": {
    cell: "border-[#e0965a]/35 border-t-[#e0965a] bg-[#e0965a]/[0.05]",
    badge: "bg-[#e0965a] text-black",
    Icon: Medal,
  },
};

function WinnerDetails({ winner }: { winner: TrackWinner }) {
  const identity = (
    <div className="min-w-0">
      <p className="break-words text-[15px] font-semibold leading-snug text-white">
        {winner.project}
      </p>
      <p className="mt-1 break-words text-xs leading-relaxed text-white/60">
        {winner.team}
      </p>
    </div>
  );

  // Missing or invalid destinations leave the same plain text in place.
  // Accept Devfolio project/profile URLs, not arbitrary protocols or lookalike hosts.
  let href: string | undefined;
  try {
    const url = new URL(winner.devfolioUrl ?? "");
    if (
      url.protocol === "https:" &&
      (url.hostname === "devfolio.co" ||
        url.hostname.endsWith(".devfolio.co")) &&
      !url.username &&
      !url.password
    ) {
      href = url.href;
    }
  } catch {
    // An incomplete content edit must not break the landing page.
  }

  return href ? (
    <a
      href={href}
      className="group flex items-end justify-between gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tbc-yellow"
    >
      {identity}
      {/* Signals that the winner opens its Devfolio project page. */}
      <ArrowUpRight
        aria-hidden="true"
        size={16}
        className="mb-0.5 shrink-0 text-white/55 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tbc-yellow"
      />
    </a>
  ) : (
    identity
  );
}

export function TrackWinners({
  results = winnerResults,
}: {
  results?: WinnerResults;
}) {
  return (
    <section
      id="winners"
      aria-labelledby="winners-heading"
      className="site-container scroll-mt-28 py-12 md:py-16"
    >
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-tbc-yellow">
            Hackathon 2026
          </p>
          <h2
            id="winners-heading"
            className="font-display text-3xl font-semibold leading-tight md:text-5xl"
          >
            Track winners
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            {results.published
              ? "The teams and projects recognised across our four tracks."
              : "Four tracks. Winners will be revealed here once judging is complete."}
          </p>
        </div>
        {!results.published && (
          <p className="inline-flex w-fit items-center gap-2 border border-tbc-yellow/25 bg-tbc-yellow/5 px-4 py-2.5 font-mono text-xs text-tbc-yellow">
            <LockKeyhole aria-hidden="true" size={14} />
            Results locked
          </p>
        )}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {prizeTracks.map((track) => {
          const company = track.companies?.[0];
          const prizes = track.prizes ?? company?.prizes ?? [];
          const mark = track.sponsorMarkSrc ?? track.sponsorLogoSrc;

          return (
            <article
              key={track.slug}
              aria-labelledby={`winner-track-${track.slug}`}
              className="surface-panel prize-pool-field min-w-0 overflow-hidden"
            >
              <div className="p-5 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    {mark && (
                      <span className="flex size-11 shrink-0 items-center justify-center bg-white p-2">
                        <Image
                          src={mark}
                          alt=""
                          width={36}
                          height={36}
                          className="h-full w-full object-contain"
                        />
                      </span>
                    )}
                    <h3
                      id={`winner-track-${track.slug}`}
                      className="font-display text-base font-bold leading-tight sm:text-lg"
                    >
                      {track.sponsor}
                    </h3>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                      {company?.amount ?? track.amount}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/60">
                      {company?.amountNote ?? "Track prize pool"}
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-sm text-white/70">{track.trackName}</p>

                <ol className="mt-5 grid gap-2 sm:grid-cols-3">
                  {prizes.map((prize) => {
                    const winner =
                      results.published && prize.place
                        ? results.tracks[track.slug]?.[prize.place]
                        : undefined;
                    const announced =
                      winner?.team.trim() && winner.project.trim()
                        ? winner
                        : undefined;

                    const place = prize.place
                      ? placeStyles[prize.place]
                      : undefined;

                    return (
                      <li
                        key={prize.place ?? prize.title}
                        className={`flex min-w-0 flex-col border border-t-2 p-4 ${place?.cell ?? "border-white/15 bg-black/25"}`}
                      >
                        <p
                          className={`inline-flex w-fit items-center gap-1.5 px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-[0.12em] ${place?.badge ?? "bg-white/10 text-white"}`}
                        >
                          {place && <place.Icon aria-hidden="true" size={13} />}
                          {prize.place} place
                        </p>
                        <p className="mt-2 font-display text-2xl font-bold tracking-tight">
                          {prize.amount}
                        </p>
                        {company?.amountNote && (
                          <p className="mt-1 text-[11px] text-white/60">
                            {company.amountNote}
                          </p>
                        )}
                        <div aria-hidden="true" className="h-5 shrink-0" />
                        <div className="mt-auto border-t border-white/10 pt-4">
                          {announced ? (
                            // Only pass published identities to the link renderer.
                            // Locked entries render neither names nor Devfolio URLs.
                            <WinnerDetails winner={announced} />
                          ) : (
                            <>
                              <p className="flex items-center gap-2 text-xs font-medium text-white/75">
                                <LockKeyhole
                                  aria-hidden="true"
                                  size={13}
                                  className="shrink-0 text-tbc-yellow/80"
                                />
                                Winner locked
                              </p>
                              <p className="mt-1.5 text-[11px] text-white/50">
                                To be announced
                              </p>
                            </>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-black/20 px-5 py-3 sm:px-7">
                {company ? (
                  <p className="text-xs text-white/55">
                    Audit credits by {company.name}
                  </p>
                ) : (
                  <span aria-hidden="true" />
                )}
                <Link
                  href={`/prizes#${track.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 transition-colors hover:text-tbc-yellow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tbc-yellow"
                >
                  Track details
                  <ArrowUpRight aria-hidden="true" size={14} />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

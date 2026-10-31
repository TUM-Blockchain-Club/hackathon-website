import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, LockKeyhole, Trophy } from "lucide-react";

import { prizeTracks } from "@/content/prizes";
import { winnerResults, type WinnerResults } from "@/content/winners";

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

                    return (
                      <li
                        key={prize.place ?? prize.title}
                        className="min-w-0 border border-white/15 bg-black/25 p-4 first:border-tbc-yellow/35 first:bg-tbc-yellow/[0.04]"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white/65">
                            {prize.place} place
                          </p>
                          {prize.place === "1st" && (
                            <Trophy
                              aria-hidden="true"
                              size={14}
                              className="text-tbc-yellow"
                            />
                          )}
                        </div>
                        <p className="mt-2 font-display text-2xl font-bold tracking-tight">
                          {prize.amount}
                        </p>
                        {company?.amountNote && (
                          <p className="mt-1 text-[11px] text-white/60">
                            {company.amountNote}
                          </p>
                        )}
                        <div className="mt-5 border-t border-white/10 pt-4">
                          {announced ? (
                            <>
                              <p className="break-words text-sm font-semibold text-tbc-yellow">
                                {announced.team}
                              </p>
                              <p className="mt-1 break-words text-xs leading-relaxed text-white/70">
                                {announced.project}
                              </p>
                            </>
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
                <p className="text-xs text-white/55">
                  {company
                    ? `Audit credits by ${company.name}`
                    : "1st · 2nd · 3rd"}
                </p>
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

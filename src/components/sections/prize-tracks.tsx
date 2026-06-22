"use client";

import { useMemo, useState } from "react";
import { Check, Lightbulb } from "lucide-react";

import { CategoryList, type Category } from "@/components/ui/category-list";
import { prizeContent } from "@/content/prizes";
import { cn } from "@/lib/utils";
import type { PrizeTrack } from "@/types/content";

type PrizeTracksProps = {
  tracks: PrizeTrack[];
  className?: string;
  compact?: boolean;
  constrained?: boolean;
};

function prizeTrackId(track: PrizeTrack, index: number) {
  return `${track.sponsor}-${track.trackName}-${index}`;
}

export function PrizeTracks({
  tracks,
  className,
  compact = false,
  constrained = true,
}: PrizeTracksProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const hasTracks = tracks.length > 0;
  const selectedTrack = hasTracks ? tracks[selectedIndex] ?? tracks[0] : null;

  const categories = useMemo<Category[]>(() => {
    if (!hasTracks) {
      return [
        {
          id: "tracks-fallback",
          eyebrow: "Tracks",
          title: "Partner tracks",
          subtitle: prizeContent.fallback,
          rightMark: "TBA",
          featured: true,
        },
        {
          id: "amounts-fallback",
          eyebrow: "Amounts",
          title: "Prize breakdown",
          subtitle: prizeContent.trackAmountFallback,
          rightMark: "TBA",
        },
        {
          id: "requirements-fallback",
          eyebrow: "Submissions",
          title: "Requirements",
          subtitle: prizeContent.trackRequirementsFallback,
          rightMark: "REQ",
        },
      ];
    }

    return tracks.map((track, index) => ({
      id: prizeTrackId(track, index),
      eyebrow: track.sponsor,
      title: track.trackName,
      subtitle: track.amount ?? prizeContent.trackAmountFallback,
      rightMark: track.rightMark ?? "TBA",
      featured: index === 0,
      active: selectedIndex === index,
      onClick: () => setSelectedIndex(index),
    }));
  }, [hasTracks, selectedIndex, tracks]);

  if (!hasTracks) {
    return (
      <div
        className={cn(
          constrained ? "mx-auto max-w-4xl" : "w-full",
          className,
        )}
      >
        <CategoryList
          categories={categories}
          className={cn(
            "surface-panel prize-track-field",
            compact ? "p-5 md:p-6" : "p-5 md:p-8",
          )}
          compact={compact}
          title="Partner track slots"
          subtitle="Partner tracks are being finalized, and confirmed program details will be added soon."
        />
      </div>
    );
  }

  const ideas =
    selectedTrack?.ideas && selectedTrack.ideas.length > 0
      ? selectedTrack.ideas
      : [prizeContent.trackIdeasFallback];
  const requirements =
    selectedTrack?.requirements && selectedTrack.requirements.length > 0
      ? selectedTrack.requirements
      : prizeContent.defaultRequirements;

  return (
    <div
      className={cn(
        "grid gap-5 lg:grid-cols-[minmax(0,1fr)_400px]",
        className,
      )}
    >
      <CategoryList
        categories={categories}
        className={cn(
          "surface-panel prize-track-field",
          compact ? "p-5 md:p-6" : "p-5 md:p-8",
        )}
        compact={compact}
        title="Partner tracks"
        subtitle="Select a confirmed track to review its prize breakdown, idea space, and submission requirements."
      />

      {selectedTrack ? (
        <article className="surface-panel overflow-hidden">
          <div className="border-b border-white/10 bg-black/45 p-5 md:p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-tbc-yellow">
                  {selectedTrack.sponsor}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-white">
                  {selectedTrack.trackName}
                </h3>
              </div>
              <div className="flex size-16 shrink-0 items-center justify-center border border-tbc-yellow bg-tbc-yellow font-mono text-sm font-bold uppercase tracking-[0.08em] text-black">
                {selectedTrack.rightMark ?? "TBA"}
              </div>
            </div>
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.14em] text-white/45">
              Prize breakdown
            </p>
            <p className="mt-2 text-lg font-semibold text-tbc-yellow">
              {selectedTrack.amount ?? prizeContent.trackAmountFallback}
            </p>
          </div>

          <div className="space-y-7 p-5 md:p-6">
            <section>
              <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                Track brief
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {selectedTrack.description ??
                  prizeContent.trackDescriptionFallback}
              </p>
            </section>

            <section>
              <p className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                <Lightbulb aria-hidden="true" size={14} />
                Example ideas
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {ideas.map((idea) => (
                  <li key={idea} className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-2 size-1.5 shrink-0 bg-tbc-yellow",
                        idea === prizeContent.trackIdeasFallback &&
                          "bg-white/30",
                      )}
                    />
                    <span>{idea}</span>
                  </li>
                ))}
              </ul>
            </section>

            <details className="border border-white/10 bg-black/25 p-4">
              <summary className="cursor-pointer font-mono text-xs font-semibold uppercase tracking-[0.16em] text-tbc-yellow">
                Submission requirements
              </summary>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {requirements.map((requirement) => (
                  <li key={requirement} className="flex gap-2">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-tbc-yellow"
                      size={15}
                    />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </article>
      ) : null}
    </div>
  );
}

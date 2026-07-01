import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Calendar } from "lucide-react";

import { SectionShell } from "@/components/primitives/section-shell";
import { CurrentYearSponsors } from "@/components/sections/current-year-sponsors";
import { PrizeMainPool } from "@/components/sections/prize-main-pool";
import { SpeakersJudges } from "@/components/sections/speakers-judges";
import { RollingSponsors } from "@/components/sections/rolling-sponsors";
import { DevfolioApplyButton } from "@/components/ui/devfolio-apply-button";
import { HeroAsciiOne } from "@/components/ui/hero-ascii-one";
import { buttonVariants } from "@/components/ui/button";
import { homeContent } from "@/content/home";
import { people, peopleContent } from "@/content/people";
import { prizeTracks } from "@/content/prizes";
import { scheduleDays } from "@/content/schedule";
import { allSponsors, currentYearSponsors } from "@/content/sponsors";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";
import type { ScheduleSession } from "@/types/content";

const compactScheduleTypeStyles: Record<
  ScheduleSession["type"],
  {
    card: string;
    accent: string;
    badge: string;
  }
> = {
  Ceremony: {
    card: "border-l-[var(--tbc-red)] bg-[rgba(244,67,54,0.065)]",
    accent: "bg-[var(--tbc-red)]",
    badge: "text-[var(--tbc-red)]",
  },
  Workshop: {
    card: "border-l-[var(--tbc-purple)] bg-[rgba(111,61,226,0.075)]",
    accent: "bg-[var(--tbc-purple)]",
    badge: "text-[var(--tbc-purple)]",
  },
  Meal: {
    card: "border-l-[var(--tbc-yellow)] bg-[rgba(255,193,16,0.085)]",
    accent: "bg-[var(--tbc-yellow)]",
    badge: "text-[var(--tbc-yellow)]",
  },
  Mentoring: {
    card: "border-l-[var(--tbc-purple)] bg-[rgba(111,61,226,0.075)]",
    accent: "bg-[var(--tbc-purple)]",
    badge: "text-[var(--tbc-purple)]",
  },
  Registration: {
    card: "border-l-[var(--tbc-purple)] bg-[rgba(111,61,226,0.075)]",
    accent: "bg-[var(--tbc-purple)]",
    badge: "text-[var(--tbc-purple)]",
  },
  Talk: {
    card: "border-l-[var(--tbc-yellow)] bg-[rgba(255,193,16,0.085)]",
    accent: "bg-[var(--tbc-yellow)]",
    badge: "text-[var(--tbc-yellow)]",
  },
  Keynote: {
    card: "border-l-[var(--tbc-red)] bg-[rgba(244,67,54,0.065)]",
    accent: "bg-[var(--tbc-red)]",
    badge: "text-[var(--tbc-red)]",
  },
  Networking: {
    card: "border-l-[var(--tbc-purple)] bg-[rgba(111,61,226,0.075)]",
    accent: "bg-[var(--tbc-purple)]",
    badge: "text-[var(--tbc-purple)]",
  },
  Deadline: {
    card: "border-l-[var(--tbc-red)] bg-[rgba(244,67,54,0.065)]",
    accent: "bg-[var(--tbc-red)]",
    badge: "text-[var(--tbc-red)]",
  },
  Judging: {
    card: "border-l-[var(--tbc-purple)] bg-[rgba(111,61,226,0.075)]",
    accent: "bg-[var(--tbc-purple)]",
    badge: "text-[var(--tbc-purple)]",
  },
  Pitch: {
    card: "border-l-[var(--tbc-yellow)] bg-[rgba(255,193,16,0.085)]",
    accent: "bg-[var(--tbc-yellow)]",
    badge: "text-[var(--tbc-yellow)]",
  },
  Other: {
    card: "border-l-white/30 bg-white/[0.04]",
    accent: "bg-white/30",
    badge: "text-white/70",
  },
};

export default function HomePage() {
  const publicPeople = people.filter((person) => person.publicCleared);

  return (
    <>
      <HeroAsciiOne
        eyebrow={homeContent.eyebrow}
        headline={homeContent.headline}
        subhead={homeContent.subhead}
        primaryCta={homeContent.primaryCta}
        secondaryCta={homeContent.secondaryCta}
      />
      <Script
        defer
        async
        src="https://apply.devfolio.co/v2/sdk.js"
        strategy="afterInteractive"
      />

      <SectionShell
        eyebrow="Sponsors"
        title="Sponsors & Partners"
        description={
          <>
            Interested in powering the hackathon or running your own track?
            <br />
            Reach out at sponsors@tum-blockchain.com.
          </>
        }
        action={
          <Link
            href={siteConfig.sponsorFormUrl}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: "outline" })}
          >
            Sponsor inquiries
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        }
      >
        <RollingSponsors sponsors={allSponsors} />
      </SectionShell>

      <SectionShell title="This Year's Sponsors">
        <CurrentYearSponsors sponsors={currentYearSponsors} />
      </SectionShell>

      <SectionShell
        eyebrow="Prizes"
        title="Prize pool announced soon and growing."
        description="Tracks and prize details are being finalized with our partners."
      >
        <div className="space-y-6">
          <PrizeMainPool
            compact
            constrained={false}
            showFaqLink={false}
            tracks={prizeTracks}
          />
          <div className="flex justify-center">
            <Link
              href="/prizes"
              className={buttonVariants({ variant: "flow" })}
            >
              View Prize Tracks
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="People"
        title="Speakers & Judges"
        description="here are our past speakers in our conference"
      >
        <SpeakersJudges
          people={publicPeople}
          fallback={peopleContent.fallback}
          limit={8}
          showCta
        />
      </SectionShell>

      <SectionShell
        eyebrow="Timeline"
        title="Two-day build window"
        description="The full schedule will be updated as sessions are confirmed."
        action={
          <Link
            href="/schedule"
            className={buttonVariants({ variant: "outline" })}
          >
            Full agenda
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        }
      >
        {scheduleDays.some((day) => day.sessions.length > 0) ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {scheduleDays.map((day) => (
              <article
                key={day.date}
                className="overflow-hidden border border-white/10 bg-[#151515]"
              >
                <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-black px-4 py-3">
                  <p className="font-display text-lg font-semibold text-white">
                    {day.label}
                  </p>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    8 AM - 6 PM
                  </p>
                </div>
                <div className="grid grid-cols-[86px_1fr]">
                  {day.sessions.slice(0, 6).map((session) => {
                    const typeStyle = compactScheduleTypeStyles[session.type];

                    return (
                      <div
                        key={`${day.date}-${session.time}-${session.title}`}
                        className="contents"
                      >
                        <div className="border-t border-white/10 bg-black px-3 py-3 text-right">
                          <p className="font-mono text-[11px] font-semibold leading-tight text-white/45">
                            {session.startTime ?? session.time}
                          </p>
                        </div>
                        <div className="border-t border-white/[0.08] p-2">
                          <div
                            className={cn(
                              "flex min-h-14 gap-3 border border-white/10 border-l-4 px-3 py-2",
                              typeStyle.card,
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={cn(
                                "mt-1 h-7 w-1 shrink-0",
                                typeStyle.accent,
                              )}
                            />
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                <p
                                  className={cn(
                                    "font-mono text-[10px] font-semibold uppercase tracking-[0.14em]",
                                    typeStyle.badge,
                                  )}
                                >
                                  {session.type}
                                </p>
                                <p className="font-mono text-[10px] text-white/40">
                                  {session.location}
                                </p>
                              </div>
                              <p className="mt-1 truncate font-display text-sm font-semibold leading-tight text-white">
                                {session.title}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center border border-white/10 rounded-xl bg-[#151515] backdrop-blur-md">
            <Calendar className="size-10 text-white/30 mb-3" />
            <p className="text-base font-semibold text-white">
              Schedule coming soon
            </p>
            <p className="text-sm text-white/50 mt-1 max-w-sm px-4">
              Confirmed session times, workshops, and speaker tracks are being
              finalized.
            </p>
          </div>
        )}
      </SectionShell>

      <SectionShell>
        <div className="flex justify-center">
          <DevfolioApplyButton
            applicationUrl={siteConfig.applicationUrl}
            hackathonSlug={siteConfig.devfolioHackathonSlug}
          />
        </div>
      </SectionShell>
    </>
  );
}

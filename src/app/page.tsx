import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

import { SectionShell } from "@/components/primitives/section-shell";
import { CurrentYearSponsors } from "@/components/sections/current-year-sponsors";
import { CountdownBanner } from "@/components/sections/countdown-banner";
import { PrizeMainPool } from "@/components/sections/prize-main-pool";
import { SpeakersJudges } from "@/components/sections/speakers-judges";
import { RollingSponsors } from "@/components/sections/rolling-sponsors";
import { HeroAsciiOne } from "@/components/ui/hero-ascii-one";
import { buttonVariants } from "@/components/ui/button";
import { homeContent } from "@/content/home";
import { people, peopleContent } from "@/content/people";
import { prizeTracks } from "@/content/prizes";
import { scheduleDays } from "@/content/schedule";
import {
  allSponsors,
  generalTrackSponsors,
  platformPartners,
  premiumTrackSponsors,
} from "@/content/sponsors";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";
import type { ScheduleSession } from "@/types/content";

const compactScheduleTypeStyles: Record<
  ScheduleSession["type"],
  {
    card: string;
    badge: string;
  }
> = {
  Milestone: {
    card: "border-white/10 bg-gradient-to-r from-[rgba(244,67,54,0.07)] via-[rgba(244,67,54,0.02)] to-transparent hover:border-white/20",
    badge: "text-rose-200/70",
  },
  Ceremony: {
    card: "border-white/10 bg-gradient-to-r from-[rgba(244,67,54,0.07)] via-[rgba(244,67,54,0.02)] to-transparent hover:border-white/20",
    badge: "text-rose-200/70",
  },
  Workshop: {
    card: "border-white/10 bg-gradient-to-r from-[rgba(111,61,226,0.06)] via-[rgba(111,61,226,0.015)] to-transparent hover:border-white/20",
    badge: "text-purple-200/60",
  },
  Meal: {
    card: "border-white/10 bg-gradient-to-r from-[rgba(255,193,16,0.05)] via-[rgba(255,193,16,0.015)] to-transparent hover:border-white/20",
    badge: "text-amber-200/60",
  },
  Mentoring: {
    card: "border-white/10 bg-gradient-to-r from-[rgba(111,61,226,0.05)] via-[rgba(111,61,226,0.015)] to-transparent hover:border-white/20",
    badge: "text-purple-200/60",
  },
  Registration: {
    card: "border-white/10 bg-gradient-to-r from-[rgba(111,61,226,0.05)] via-[rgba(111,61,226,0.015)] to-transparent hover:border-white/20",
    badge: "text-purple-200/60",
  },
  Talk: {
    card: "border-white/10 bg-gradient-to-r from-[rgba(255,193,16,0.05)] via-[rgba(255,193,16,0.015)] to-transparent hover:border-white/20",
    badge: "text-amber-200/60",
  },
  Keynote: {
    card: "border-white/10 bg-gradient-to-r from-[rgba(244,67,54,0.055)] via-[rgba(244,67,54,0.015)] to-transparent hover:border-white/20",
    badge: "text-rose-200/60",
  },
  Networking: {
    card: "border-white/10 bg-gradient-to-r from-[rgba(111,61,226,0.05)] via-[rgba(111,61,226,0.015)] to-transparent hover:border-white/20",
    badge: "text-purple-200/60",
  },
  Deadline: {
    card: "border-white/10 bg-gradient-to-r from-[rgba(244,67,54,0.055)] via-[rgba(244,67,54,0.015)] to-transparent hover:border-white/20",
    badge: "text-rose-200/60",
  },
  Judging: {
    card: "border-white/10 bg-gradient-to-r from-[rgba(111,61,226,0.06)] via-[rgba(111,61,226,0.015)] to-transparent hover:border-white/20",
    badge: "text-purple-200/60",
  },
  Pitch: {
    card: "border-white/10 bg-gradient-to-r from-[rgba(255,193,16,0.05)] via-[rgba(255,193,16,0.015)] to-transparent hover:border-white/20",
    badge: "text-amber-200/60",
  },
  Other: {
    card: "border-white/10 bg-white/[0.02] hover:border-white/20",
    badge: "text-white/40",
  },
};

export default function HomePage() {
  const publicPeople = people.filter((person) => person.publicCleared);

  return (
    <>
      <HeroAsciiOne
        date={homeContent.date}
        location={homeContent.location}
        partnerInquiry={homeContent.partnerInquiry}
        headline={homeContent.headline}
        subhead={homeContent.subhead}
        primaryCta={homeContent.primaryCta}
        secondaryCta={homeContent.secondaryCta}
      />
      <CountdownBanner />
      {/* 1. Prize Pool */}
      <SectionShell>
        <PrizeMainPool tracks={prizeTracks} showDetailsLink />
      </SectionShell>

      {/* 2. 2026 Sponsors */}
      <SectionShell
        eyebrow="Sponsors"
        title="2026 Sponsors"
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
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          <CurrentYearSponsors
            sponsors={premiumTrackSponsors}
            label="PREMIUM"
            labelColor="white"
            size="large"
          />
          <CurrentYearSponsors
            sponsors={generalTrackSponsors}
            label="STANDARD"
            labelColor="yellow"
            size="default"
          />
          <CurrentYearSponsors
            sponsors={platformPartners}
            label="PLATFORM PARTNER"
            labelColor="muted"
            size="compact"
          />
        </div>
      </SectionShell>

      {/* 3. Timeline / Agenda */}
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
                <div className="grid grid-cols-[96px_1fr]">
                  {day.sessions.slice(0, 6).map((session) => {
                    const typeStyle = compactScheduleTypeStyles[session.type];

                    return (
                      <div
                        key={`${day.date}-${session.startTime}-${session.title}`}
                        className="contents"
                      >
                        <div className="flex items-center justify-center border-t border-white/10 bg-black/60 px-3 py-3">
                          <span className="font-mono text-lg font-bold tracking-tight text-white tabular-nums drop-shadow-[0_1px_4px_rgba(255,255,255,0.2)] sm:text-xl">
                            {session.timeTba ? "TBA" : session.startTime}
                          </span>
                        </div>
                        <div className="border-t border-white/[0.08] p-2">
                          <div
                            className={cn(
                              "flex min-h-14 items-center gap-3 border px-3.5 py-2.5 transition-colors",
                              typeStyle.card,
                            )}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                <p
                                  className={cn(
                                    "font-mono text-[10px] font-semibold uppercase tracking-[0.14em]",
                                    typeStyle.badge,
                                  )}
                                >
                                  {session.type}
                                </p>
                                {session.location ? (
                                  <p className="font-mono text-[10px] text-white/40">
                                    {session.location}
                                  </p>
                                ) : null}
                              </div>
                              <p className="mt-1 truncate font-display text-sm font-semibold leading-tight text-white">
                                {session.title}
                                {session.titleSuffix ? (
                                  <span className="ml-1.5 text-xs font-medium text-white/45">
                                    {session.titleSuffix}
                                  </span>
                                ) : null}
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

      {/* 4. Speakers & Judges */}
      {siteConfig.showSpeakersAndJudges ? (
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
      ) : null}

      {/* 5. Past Sponsors */}
      <SectionShell
        eyebrow="Last year"
        title="Past Sponsors & Partners"
        description="A look back at the teams that powered previous editions of the hackathon."
      >
        <RollingSponsors sponsors={allSponsors} variant="compact" />
      </SectionShell>
    </>
  );
}

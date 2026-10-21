"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { Calendar, Clock, MapPin, Search, UserRound, X } from "lucide-react";
import { PageHeader } from "@/components/primitives/page-header";
import { scheduleContent, scheduleDays } from "@/content/schedule";
import { cn } from "@/lib/utils";
import type {
  ScheduleSession,
  ScheduleSessionType,
  ScheduleSpeaker,
} from "@/types/content";

// Key moments (start, opening, end, closing) get red so they stand out.
const SESSION_ACCENTS: Record<ScheduleSessionType, string> = {
  Milestone: "var(--tbc-red)",
  Ceremony: "var(--tbc-red)",
  Workshop: "var(--tbc-purple)",
  Mentoring: "var(--tbc-purple)",
  Registration: "var(--tbc-purple)",
  Networking: "var(--tbc-purple)",
  Judging: "var(--tbc-purple)",
  Meal: "var(--tbc-yellow)",
  Talk: "var(--tbc-yellow)",
  Pitch: "var(--tbc-yellow)",
  Keynote: "var(--tbc-red)",
  Deadline: "var(--tbc-red)",
  Other: "rgba(255, 255, 255, 0.7)",
};

// Point-in-time sessions (no endTime, nothing after them) stay "live" this long.
const DEFAULT_SESSION_MINUTES = 30;

type SessionStatus = "upcoming" | "live" | "done";

function toTimestamp(date: string, time: string) {
  return Date.parse(`${date}T${time}:00${scheduleContent.utcOffset}`);
}

const KICKOFF_TIMESTAMP = toTimestamp(
  scheduleContent.kickoff.date,
  scheduleContent.kickoff.time,
);

/** Offset from kickoff as a mission clock, e.g. "T+00:30" or "T+30:00". */
function missionClock(date: string, time: string) {
  const minutes = Math.round(
    (toTimestamp(date, time) - KICKOFF_TIMESTAMP) / 60000,
  );
  const abs = Math.abs(minutes);
  const hours = String(Math.floor(abs / 60)).padStart(2, "0");
  const mins = String(abs % 60).padStart(2, "0");
  return `T${minutes < 0 ? "-" : "+"}${hours}:${mins}`;
}

function weekdayLabel(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "short",
    timeZone: "UTC",
  });
}

function longDateLabel(date: string) {
  return new Date(`${date}T12:00:00Z`)
    .toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    })
    .replace(",", "");
}

function getSessionStatus(
  now: number,
  date: string,
  session: ScheduleSession,
  nextStartTime?: string,
): SessionStatus {
  const start = toTimestamp(date, session.startTime);
  const end = session.endTime
    ? toTimestamp(date, session.endTime)
    : nextStartTime
      ? toTimestamp(date, nextStartTime)
      : start + DEFAULT_SESSION_MINUTES * 60000;

  if (now < start) return "upcoming";
  return now < end ? "live" : "done";
}

function subscribeToMinuteTick(onTick: () => void) {
  const id = window.setInterval(onTick, 30_000);
  return () => window.clearInterval(id);
}

/** Current time floored to the minute; null during SSR so markup hydrates cleanly. */
function useMinuteNow() {
  return useSyncExternalStore(
    subscribeToMinuteTick,
    () => Math.floor(Date.now() / 60000) * 60000,
    () => null,
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function SpeakerTile({ speaker }: { speaker: ScheduleSpeaker }) {
  return (
    <div className="flex min-w-0 items-center gap-4">
      <div
        className="schedule-avatar relative size-11 shrink-0 overflow-hidden sm:size-12"
        // Partner logos need a light tile; dark marks vanish on the default avatar.
        style={speaker.logo ? { background: "#fff" } : undefined}
      >
        {speaker.imageSrc ? (
          <Image
            src={speaker.imageSrc}
            alt={speaker.name}
            fill
            sizes="48px"
            className={
              speaker.logo
                ? "object-contain p-2"
                : "object-cover grayscale-[0.6] contrast-125"
            }
          />
        ) : speaker.placeholder ? (
          <span className="flex size-full items-center justify-center text-white/60">
            <UserRound className="size-5" aria-hidden="true" />
          </span>
        ) : (
          <span className="flex size-full items-center justify-center font-mono text-sm font-bold tracking-wider text-white">
            {initials(speaker.name)}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="font-display text-sm font-semibold leading-tight text-white sm:text-base">
          {speaker.name}
        </p>
        {speaker.role && (
          <p className="mt-0.5 text-xs leading-snug text-white/55 sm:text-sm">
            {speaker.role}
          </p>
        )}
      </div>
    </div>
  );
}

function SessionCard({
  session,
  date,
  index,
  status,
}: {
  session: ScheduleSession;
  date: string;
  index: number;
  status: SessionStatus | null;
}) {
  const timeRange = session.timeTba
    ? "time to be announced"
    : session.endTime
      ? `${session.startTime} – ${session.endTime} ${scheduleContent.timezone}`
      : `${session.startTime} ${scheduleContent.timezone}`;
  const speakers = session.speakers ?? [];

  return (
    <li
      className="schedule-row"
      data-status={status ?? undefined}
      style={
        {
          "--session-accent": SESSION_ACCENTS[session.type],
          "--row-delay": `${index * 70}ms`,
        } as CSSProperties
      }
    >
      {/* Desktop time rail */}
      <div className="schedule-rail" aria-hidden="true">
        <span className="schedule-rail__time font-mono text-xl font-semibold tabular-nums lg:text-2xl">
          {session.timeTba ? "TBA" : session.startTime}
        </span>
        {!session.timeTba && (
          <span className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
            {scheduleContent.timezone}
          </span>
        )}
      </div>
      <span className="schedule-node" aria-hidden="true" />

      <article className="schedule-card">
        <span className="schedule-card__corners" aria-hidden="true" />

        {session.sponsorLogoSrc && (
          // Partner mark tinted purple, bleeding off the right edge. The mask
          // keeps the logo's shape; the grayscale copy blended on top keeps its
          // own shading (e.g. BSV's gradient) visible through the tint.
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 top-1/2 -z-10 size-64 -translate-y-1/2 bg-tbc-purple opacity-40 sm:-right-24 sm:size-80"
            style={{
              maskImage: `url(${session.sponsorLogoSrc})`,
              maskPosition: "center",
              maskRepeat: "no-repeat",
              maskSize: "contain",
            }}
          >
            <Image
              src={session.sponsorLogoSrc}
              alt=""
              fill
              sizes="320px"
              className="object-contain mix-blend-overlay grayscale"
            />
          </div>
        )}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="schedule-eyebrow font-mono text-[11px] font-semibold uppercase tracking-[0.2em]">
              <span>{String(index + 1).padStart(2, "0")}</span>
              {!session.timeTba && (
                <>
                  <span className="text-white/25">{"//"}</span>
                  <span>{missionClock(date, session.startTime)}</span>
                </>
              )}
            </p>
            <h3 className="mt-1.5 font-display text-xl font-semibold leading-[1.15] text-white sm:text-2xl">
              {session.title}
              {session.titleSuffix && (
                <span className="ml-2 text-base font-medium text-white/45 sm:text-lg">
                  {session.titleSuffix}
                </span>
              )}
            </h3>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {status === "live" && (
              <span className="schedule-chip schedule-chip--live">
                <span className="schedule-live-dot" aria-hidden="true" />
                Live
              </span>
            )}
            {status === "done" && (
              <span className="schedule-chip schedule-chip--muted">Done</span>
            )}
          </div>
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-x-6 gap-y-1.5 text-sm text-white/80 sm:text-base">
          {session.location && (
            <span className="inline-flex items-center gap-2">
              <MapPin
                className="schedule-icon size-[1.1em]"
                aria-hidden="true"
              />
              {session.location}
            </span>
          )}
          <span className="inline-flex items-center gap-2 tabular-nums">
            <Clock className="schedule-icon size-[1.1em]" aria-hidden="true" />
            {weekdayLabel(date)}, {timeRange}
          </span>
        </div>

        {session.note && (
          <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-white/65">
            {session.note}
          </p>
        )}

        {speakers.length > 0 && (
          <div className="mt-4 border-t border-white/10 pt-3.5">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
              {speakers.length === 1 ? "Speaker" : "Speakers"}
            </p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {speakers.map((speaker) => (
                <SpeakerTile key={speaker.name} speaker={speaker} />
              ))}
            </div>
          </div>
        )}
      </article>
    </li>
  );
}

export function ScheduleClient({
  hideHeader = false,
}: { hideHeader?: boolean } = {}) {
  const [activeDayIdx, setActiveDayIdx] = useState(0); // Default to Day 1
  const [searchQuery, setSearchQuery] = useState("");
  const now = useMinuteNow();

  const activeDay = scheduleDays[activeDayIdx];

  const sortedSessions = useMemo(
    () =>
      [...activeDay.sessions].sort((a, b) =>
        a.startTime.localeCompare(b.startTime),
      ),
    [activeDay],
  );

  const filteredSessions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return sortedSessions;

    return sortedSessions.filter((session) =>
      [
        session.title,
        session.titleSuffix,
        session.note,
        session.type,
        session.location,
        ...(session.speakers ?? []).flatMap((speaker) => [
          speaker.name,
          speaker.role,
        ]),
      ].some((field) => field?.toLowerCase().includes(query)),
    );
  }, [sortedSessions, searchQuery]);

  const statusFor = (session: ScheduleSession) => {
    if (now === null || session.timeTba) return null;
    const next = sortedSessions.find((s) => s.startTime > session.startTime);
    return getSessionStatus(now, activeDay.date, session, next?.startTime);
  };

  return (
    <>
      {!hideHeader && <PageHeader title={scheduleContent.title} compact />}

      <section
        className={cn(
          "site-container pb-24 max-w-5xl mx-auto",
          hideHeader && "pt-6",
        )}
      >
        {/* Controls Container */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-white/10 pb-6">
          {/* Search bar */}
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/40" />
            <input
              type="text"
              inputMode="search"
              placeholder="Search by session title, speaker..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-white/[0.04] border border-white/10 rounded-lg text-base md:text-sm text-white placeholder-white/40 focus:outline-none focus:border-tbc-yellow/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex size-8 items-center justify-center rounded-full text-white/40 hover:text-white/80 transition-colors"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Day Selector Tabs */}
          <div className="flex items-center gap-1.5 bg-white/[0.04] p-1 rounded-full border border-white/10 w-full md:w-fit">
            {scheduleDays.map((day, idx) => {
              const isActive = activeDayIdx === idx;
              return (
                <button
                  key={day.date}
                  onClick={() => {
                    setActiveDayIdx(idx);
                    setSearchQuery(""); // Clear search when changing day
                  }}
                  className={cn(
                    "flex-1 md:flex-none min-h-11 md:min-h-0 px-3 md:px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors select-none whitespace-nowrap cursor-pointer",
                    isActive
                      ? "bg-tbc-yellow text-black shadow-lg shadow-tbc-yellow/15"
                      : "text-white/60 hover:text-white hover:bg-white/5",
                  )}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Schedule View */}
        {activeDay.sessions.length === 0 ? (
          /* General Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center border border-white/10 rounded-xl mt-8 bg-[#151515] backdrop-blur-md">
            <div className="size-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 mb-4">
              <Calendar size={20} />
            </div>
            <p className="text-base font-semibold text-white">
              Schedule coming soon
            </p>
            <p className="text-xs text-white/50 mt-1 max-w-xs px-4">
              Confirmed session times, workshops, and speaker tracks are being
              finalized with our partners.
            </p>
          </div>
        ) : filteredSessions.length > 0 ? (
          <div className="mt-8">
            {/* Day readout strip */}
            <div className="mb-6 flex items-center gap-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
              <span className="text-tbc-yellow">
                Day {String(activeDayIdx + 1).padStart(2, "0")}
              </span>
              <span>{longDateLabel(activeDay.date)}</span>
              <span
                className="schedule-strip-rule h-px flex-1"
                aria-hidden="true"
              />
              <span>
                {filteredSessions.length}{" "}
                {filteredSessions.length === 1 ? "session" : "sessions"}
              </span>
            </div>

            <ol className="schedule-timeline">
              {filteredSessions.map((session) => (
                <SessionCard
                  key={`${session.startTime}-${session.title}`}
                  session={session}
                  date={activeDay.date}
                  // Keep the day's sequence number stable while searching.
                  index={sortedSessions.indexOf(session)}
                  status={statusFor(session)}
                />
              ))}
            </ol>
          </div>
        ) : (
          /* Search Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center surface-panel border border-white/10 rounded-xl mt-8 bg-black/20 backdrop-blur-md">
            <div className="size-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 mb-4">
              <Search size={20} />
            </div>
            <p className="text-base font-semibold text-white">
              No sessions found
            </p>
            <p className="text-xs text-white/50 mt-1 max-w-xs px-4">
              No sessions match &ldquo;{searchQuery}&rdquo;. Try adjusting your
              filters or search terms.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-xs font-semibold px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>
    </>
  );
}

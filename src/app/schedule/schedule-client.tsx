"use client";

import { useMemo, useState } from "react";
import { Search, Clock, MapPin, X, Calendar, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/primitives/page-header";
import { scheduleContent, scheduleDays } from "@/content/schedule";
import { cn } from "@/lib/utils";
import type { ScheduleSession } from "@/types/content";

const ROOMS = ["Main Stage", "Workshop Room"];

const SCHEDULE_GRID_STYLE = {
  gridTemplateColumns: "75px repeat(2, minmax(0, 1fr))",
  // Header (50px) + 20 slots (each 75px, 8 AM to 6 PM)
  gridTemplateRows: "50px repeat(20, 75px)",
} as const;

function getRoomColIndex(location?: string) {
  // Default to Main Stage (col 2); Workshop Room sits in col 3.
  return location === "Workshop Room" ? 3 : 2;
}

const TIME_LABELS = [
  { label: "8:00 AM", rowStart: 2 },
  { label: "9:00 AM", rowStart: 4 },
  { label: "10:00 AM", rowStart: 6 },
  { label: "11:00 AM", rowStart: 8 },
  { label: "12:00 PM", rowStart: 10 },
  { label: "1:00 PM", rowStart: 12 },
  { label: "2:00 PM", rowStart: 14 },
  { label: "3:00 PM", rowStart: 16 },
  { label: "4:00 PM", rowStart: 18 },
  { label: "5:00 PM", rowStart: 20 },
  { label: "6:00 PM", rowStart: 22 },
];

const SESSION_TYPE_STYLES: Record<
  ScheduleSession["type"],
  {
    card: string;
    badge: string;
    hoverTitle: string;
  }
> = {
  Ceremony: {
    card:
      "border-l-4 border-l-[var(--tbc-red)] bg-[rgba(244,67,54,0.085)] hover:bg-[rgba(244,67,54,0.13)]",
    badge:
      "border-[rgba(244,67,54,0.32)] bg-[rgba(244,67,54,0.12)] text-[var(--tbc-red)]",
    hoverTitle: "group-hover:text-[var(--tbc-red)]",
  },
  Workshop: {
    card:
      "border-l-4 border-l-[var(--tbc-purple)] bg-[rgba(111,61,226,0.095)] hover:bg-[rgba(111,61,226,0.14)]",
    badge:
      "border-[rgba(111,61,226,0.34)] bg-[rgba(111,61,226,0.13)] text-[var(--tbc-purple)]",
    hoverTitle: "group-hover:text-[var(--tbc-purple)]",
  },
  Meal: {
    card:
      "border-l-4 border-l-[var(--tbc-yellow)] bg-[rgba(255,193,16,0.105)] hover:bg-[rgba(255,193,16,0.15)]",
    badge:
      "border-[rgba(255,193,16,0.36)] bg-[rgba(255,193,16,0.13)] text-[var(--tbc-yellow)]",
    hoverTitle: "group-hover:text-[var(--tbc-yellow)]",
  },
  Mentoring: {
    card:
      "border-l-4 border-l-[var(--tbc-purple)] bg-[rgba(111,61,226,0.095)] hover:bg-[rgba(111,61,226,0.14)]",
    badge:
      "border-[rgba(111,61,226,0.34)] bg-[rgba(111,61,226,0.13)] text-[var(--tbc-purple)]",
    hoverTitle: "group-hover:text-[var(--tbc-purple)]",
  },
  Registration: {
    card:
      "border-l-4 border-l-[var(--tbc-purple)] bg-[rgba(111,61,226,0.095)] hover:bg-[rgba(111,61,226,0.14)]",
    badge:
      "border-[rgba(111,61,226,0.34)] bg-[rgba(111,61,226,0.13)] text-[var(--tbc-purple)]",
    hoverTitle: "group-hover:text-[var(--tbc-purple)]",
  },
  Talk: {
    card:
      "border-l-4 border-l-[var(--tbc-yellow)] bg-[rgba(255,193,16,0.105)] hover:bg-[rgba(255,193,16,0.15)]",
    badge:
      "border-[rgba(255,193,16,0.36)] bg-[rgba(255,193,16,0.13)] text-[var(--tbc-yellow)]",
    hoverTitle: "group-hover:text-[var(--tbc-yellow)]",
  },
  Keynote: {
    card:
      "border-l-4 border-l-[var(--tbc-red)] bg-[rgba(244,67,54,0.085)] hover:bg-[rgba(244,67,54,0.13)]",
    badge:
      "border-[rgba(244,67,54,0.32)] bg-[rgba(244,67,54,0.12)] text-[var(--tbc-red)]",
    hoverTitle: "group-hover:text-[var(--tbc-red)]",
  },
  Networking: {
    card:
      "border-l-4 border-l-[var(--tbc-purple)] bg-[rgba(111,61,226,0.095)] hover:bg-[rgba(111,61,226,0.14)]",
    badge:
      "border-[rgba(111,61,226,0.34)] bg-[rgba(111,61,226,0.13)] text-[var(--tbc-purple)]",
    hoverTitle: "group-hover:text-[var(--tbc-purple)]",
  },
  Deadline: {
    card:
      "border-l-4 border-l-[var(--tbc-red)] bg-[rgba(244,67,54,0.085)] hover:bg-[rgba(244,67,54,0.13)]",
    badge:
      "border-[rgba(244,67,54,0.32)] bg-[rgba(244,67,54,0.12)] text-[var(--tbc-red)]",
    hoverTitle: "group-hover:text-[var(--tbc-red)]",
  },
  Judging: {
    card:
      "border-l-4 border-l-[var(--tbc-purple)] bg-[rgba(111,61,226,0.095)] hover:bg-[rgba(111,61,226,0.14)]",
    badge:
      "border-[rgba(111,61,226,0.34)] bg-[rgba(111,61,226,0.13)] text-[var(--tbc-purple)]",
    hoverTitle: "group-hover:text-[var(--tbc-purple)]",
  },
  Pitch: {
    card:
      "border-l-4 border-l-[var(--tbc-yellow)] bg-[rgba(255,193,16,0.105)] hover:bg-[rgba(255,193,16,0.15)]",
    badge:
      "border-[rgba(255,193,16,0.36)] bg-[rgba(255,193,16,0.13)] text-tbc-yellow",
    hoverTitle: "group-hover:text-tbc-yellow",
  },
  Other: {
    card:
      "border-l-4 border-l-white/30 bg-white/[0.06] hover:bg-white/[0.1]",
    badge: "border-white/15 bg-white/10 text-white/70",
    hoverTitle: "group-hover:text-white",
  },
};

export function ScheduleClient({ hideHeader = false }: { hideHeader?: boolean } = {}) {
  const [activeDayIdx, setActiveDayIdx] = useState(0); // Default to Day 1
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSession, setSelectedSession] = useState<ScheduleSession | null>(null);

  const activeDay = scheduleDays[activeDayIdx];

  // Filter sessions based on search query. Memoized so opening the detail
  // modal (which only updates selectedSession) doesn't re-filter every render.
  const filteredSessions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return activeDay.sessions;

    return activeDay.sessions.filter(
      (session) =>
        session.title.toLowerCase().includes(query) ||
        session.note.toLowerCase().includes(query) ||
        (session.location && session.location.toLowerCase().includes(query)) ||
        (session.speaker && session.speaker.toLowerCase().includes(query)) ||
        session.type.toLowerCase().includes(query),
    );
  }, [activeDay, searchQuery]);

  return (
    <>
      {!hideHeader && (
        <PageHeader
          eyebrow="Run of show"
          title={scheduleContent.title}
          description={scheduleContent.description}
        />
      )}

      <section className={cn("site-container pb-24 max-w-4xl mx-auto", hideHeader && "pt-6")}>
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
                      : "text-white/60 hover:text-white hover:bg-white/5"
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
            <p className="text-base font-semibold text-white">Schedule coming soon</p>
            <p className="text-xs text-white/50 mt-1 max-w-xs px-4">
              Confirmed session times, workshops, and speaker tracks are being finalized with our partners.
            </p>
          </div>
        ) : filteredSessions.length > 0 ? (
          <div className="mt-8 border border-white/10 rounded-xl bg-[#151515] backdrop-blur-md w-full overflow-hidden">
            <div className="w-full overflow-x-auto select-none -webkit-overflow-scrolling-touch">
              <div className="relative min-w-[640px] lg:min-w-0 w-full">
                <div
                  className="grid relative w-full bg-[#151515]"
                  style={SCHEDULE_GRID_STYLE}
                >
                  {/* --- Grid Header Row --- */}
                  <div className="bg-black border-b border-r border-white/10 flex items-center justify-end pr-4 pointer-events-none sticky left-0 z-20">
                    <span className="font-mono text-[10px] font-bold text-white/30 uppercase tracking-widest bg-black">
                      Time
                    </span>
                  </div>

                  {ROOMS.map((room, idx) => (
                    <div
                      key={room}
                      style={{ gridColumn: idx + 2, gridRow: 1 }}
                      className="bg-black border-b border-white/10 flex items-center pl-4 py-3 pointer-events-none"
                    >
                      <span className="font-mono text-[10px] font-bold text-white/50 uppercase tracking-widest">
                        {room}
                      </span>
                    </div>
                  ))}

                  {/* --- Background Column Divider Lines --- */}
                  {ROOMS.map((_, idx) => (
                    <div
                      key={`col-line-${idx}`}
                      style={{
                        gridColumn: idx + 2,
                        gridRow: "1 / span 22",
                      }}
                      className="border-r border-white/[0.06] pointer-events-none last:border-r-0"
                    />
                  ))}

                  {/* --- Background Horizontal Hourly Grid Lines --- */}
                  {Array.from({ length: 21 }).map((_, idx) => (
                    <div
                      key={`row-line-${idx}`}
                      style={{
                        gridColumn: "1 / -1",
                        gridRow: idx + 2,
                      }}
                      className={cn(
                        "border-t pointer-events-none w-full h-full",
                        idx % 2 === 0 ? "border-white/[0.1]" : "border-dashed border-white/[0.055]"
                      )}
                    />
                  ))}

                  {/* --- Time Column Labels --- */}
                  {TIME_LABELS.map((label) => {
                    const isFirst = label.rowStart === 2;
                    return (
                      <div
                        key={`time-label-${label.label}`}
                        style={{
                          gridColumn: 1,
                          gridRowStart: label.rowStart,
                          gridRowEnd: label.rowStart + 2,
                        }}
                        className="bg-[#151515] border-r border-white/10 pr-4 flex justify-end items-start pointer-events-none sticky left-0 z-10"
                      >
                        <span
                          className={cn(
                            "font-mono text-[10px] font-semibold text-white/40 bg-[#151515] px-1 select-none whitespace-nowrap",
                            isFirst ? "mt-1.5" : "-mt-2"
                          )}
                        >
                          {label.label}
                        </span>
                      </div>
                    );
                  })}

                  {/* --- Active Session Cards --- */}
                  {filteredSessions.map((session) => {
                    const colIdx = getRoomColIndex(session.location);
                    const startRow = (session.gridStart ?? 0) + 2;
                    const endRow = (session.gridEnd ?? 1) + 2;
                    const typeStyle = SESSION_TYPE_STYLES[session.type];

                    return (
                      <div
                        key={`${session.time}-${session.location ?? ""}-${session.title}`}
                        style={{
                          gridColumn: colIdx,
                          gridRowStart: startRow,
                          gridRowEnd: endRow,
                        }}
                        className="p-1 h-full w-full"
                      >
                        <button
                          onClick={() => setSelectedSession(session)}
                          className={cn(
                            "w-full h-full p-2.5 rounded-lg border border-white/10 hover:border-white/20 active:border-white/30 text-left flex flex-col justify-between transition-all duration-200 group overflow-hidden cursor-pointer select-none",
                            typeStyle.card,
                          )}
                        >
                          <div className="w-full">
                            {/* Time range pill */}
                            <div className="flex flex-wrap items-center gap-1.5 mb-1">
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-medium bg-white/10 text-white/80">
                                <Clock size={8} />
                                {session.startTime && session.endTime 
                                  ? `${session.startTime} - ${session.endTime}` 
                                  : session.time}
                              </span>
                              {/* Session Type Badge */}
                              <span
                                className={cn(
                                  "inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-medium border",
                                  typeStyle.badge,
                                )}
                              >
                                {session.type}
                              </span>
                            </div>

                            {/* Session Title */}
                            <h3
                              className={cn(
                                "font-display text-xs font-semibold text-white transition-colors leading-tight line-clamp-2",
                                typeStyle.hoverTitle,
                              )}
                            >
                              {session.title}
                            </h3>
                          </div>

                          {/* Speaker or Description Snippet */}
                          {session.note && (
                            <p className="text-[10px] text-white/50 mt-1 line-clamp-1 group-hover:text-white/70 transition-colors">
                              {session.note}
                            </p>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Search Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center surface-panel border border-white/10 rounded-xl mt-8 bg-black/20 backdrop-blur-md">
            <div className="size-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 mb-4">
              <Search size={20} />
            </div>
            <p className="text-base font-semibold text-white">No sessions found</p>
            <p className="text-xs text-white/50 mt-1 max-w-xs px-4">
              No sessions match &ldquo;{searchQuery}&rdquo;. Try adjusting your filters or search terms.
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

      {/* --- Detail Modal Dialog --- */}
      {selectedSession && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-250"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedSession(null)}
        >
          {/* Modal Card container */}
          <div
            className="w-full max-w-md sm:max-w-lg max-h-[85svh] overflow-y-auto bg-[#0e0e0e] border border-white/10 rounded-xl shadow-2xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedSession(null)}
              className="absolute right-3 top-3 inline-flex size-9 items-center justify-center text-white/50 hover:text-white bg-white/5 hover:bg-white/10 transition-colors rounded-full"
              aria-label="Close details"
            >
              <X size={16} />
            </button>

            {/* Header info */}
            <div className="flex flex-wrap items-center gap-2 mb-3 pr-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-white">
                <Calendar size={12} className="text-tbc-yellow" />
                {activeDay.label}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-tbc-yellow/10 text-tbc-yellow border border-tbc-yellow/20">
                <Clock size={12} />
                {selectedSession.time}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-display text-xl font-bold text-white leading-snug mt-2">
              {selectedSession.title}
            </h2>

            {/* Room / Location Details */}
            {selectedSession.location && (
              <div className="flex items-center gap-2 mt-4 text-sm text-white/70">
                <MapPin size={14} className="text-tbc-yellow" />
                <span className="font-semibold">{selectedSession.location}</span>
                <span className="text-white/30">•</span>
                <span className="text-white/50">{selectedSession.type}</span>
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-white/10 my-4" />

            {/* Notes/Description */}
            <div className="mt-4">
              <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                <Sparkles size={12} className="text-tbc-yellow" />
                Session Details
              </h4>
              <p className="text-sm text-white/80 leading-relaxed font-sans">
                {selectedSession.note}
              </p>
            </div>

            {/* Speaker Info (if any) */}
            {selectedSession.speaker && (
              <div className="mt-5 bg-white/[0.03] border border-white/5 rounded-lg p-3">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-0.5">
                  Host / Speaker
                </span>
                <span className="text-sm font-semibold text-white">{selectedSession.speaker}</span>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedSession(null)}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

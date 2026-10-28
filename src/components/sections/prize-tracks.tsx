"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Bot,
  CalendarClock,
  Check,
  ChevronDown,
  Clock,
  Globe,
  Info,
  LifeBuoy,
  Trophy,
  UserRound,
} from "lucide-react";

import { prizeContent } from "@/content/prizes";
import { useHasStarted, useNow } from "@/lib/use-now";
import { cn } from "@/lib/utils";
import { CopyText } from "@/components/ui/copy-text";
import type {
  PrizeTrack,
  SubmissionGuide,
  TrackCompany,
  TrackLink,
} from "@/types/content";

type PrizeTracksProps = {
  tracks: PrizeTrack[];
  submission?: SubmissionGuide;
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

function paragraphs(text: string) {
  return text.split(/\n\s*\n/).filter(Boolean);
}

const placeTone: Record<string, string> = {
  "1st": "text-tbc-yellow",
  "2nd": "text-white/80",
  "3rd": "text-[#e0a370]",
};

function SectionTitle({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h3
      id={id}
      className="font-display text-base font-bold text-white sm:text-lg"
    >
      {children}
    </h3>
  );
}

function SubTitle({
  icon,
  children,
}: {
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <h4 className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
      {icon}
      {children}
    </h4>
  );
}

function DotList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-white/80 sm:text-sm">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span
            aria-hidden="true"
            className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-tbc-yellow"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-white/80 sm:text-sm">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <Check
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-tbc-yellow"
            size={14}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function LinkRow({ link }: { link: TrackLink }) {
  return (
    <li className="py-2.5">
      {link.href ? (
        <a
          href={link.href}
          target={link.href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noreferrer"
          className="group inline-flex items-baseline gap-1.5 text-sm font-medium text-white transition-colors hover:text-tbc-yellow"
        >
          <span>{link.label}</span>
          <ArrowUpRight
            aria-hidden="true"
            size={13}
            className="shrink-0 translate-y-0.5 text-white/40 transition-colors group-hover:text-tbc-yellow"
          />
        </a>
      ) : (
        <span className="text-sm font-medium text-white">
          {link.label}
          {link.pending ? (
            <span className="ml-2 rounded-[9999px] border border-white/15 px-2 py-0.5 text-[11px] font-normal text-white/50">
              Link coming soon
            </span>
          ) : null}
        </span>
      )}
      {link.note ? (
        <p className="mt-0.5 text-xs leading-relaxed text-white/50">
          {link.note}
        </p>
      ) : null}
    </li>
  );
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

function LogoTile({
  src,
  alt,
  fallback,
}: {
  src?: string;
  alt: string;
  fallback: string;
}) {
  return (
    <div className="relative shrink-0">
      <div
        aria-hidden="true"
        className="absolute -inset-1 rounded-[18px] bg-white/[0.04] opacity-50 blur-sm"
      />
      {src ? (
        <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-[16px] bg-white p-2 shadow-lg sm:size-20">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="80px"
            className="object-contain p-2"
          />
        </div>
      ) : (
        <div className="relative flex size-16 shrink-0 items-center justify-center rounded-[16px] bg-white font-mono text-xl font-bold text-black shadow-lg sm:size-20">
          {fallback}
        </div>
      )}
    </div>
  );
}

function Chip({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-[9999px] border border-white/20 bg-white/[0.08] px-3 py-0.5 text-xs font-medium text-white/90 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/15 hover:text-white"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

/** First paragraph, clamped; "Read more" reveals the full brief. */
function ReadMore({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const parts = paragraphs(text);
  // Short single paragraphs fit in three lines; no button needed.
  const hasMore = parts.length > 1 || parts[0].length > 280;

  return (
    <div className="text-sm leading-relaxed text-white/75">
      {open ? (
        <div className="space-y-2.5">
          {parts.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : (
        <p className={hasMore ? "line-clamp-3" : undefined}>{parts[0]}</p>
      )}
      {hasMore ? (
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="mt-1.5 text-sm font-semibold text-tbc-yellow transition-colors hover:text-white"
        >
          {open ? "Show less" : "Read more"}
        </button>
      ) : null}
    </div>
  );
}

/** Collapsed detail row, so secondary information stays one click away. */
function Disclosure({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <details className="group border-b border-white/10 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-3.5 text-sm font-semibold text-white transition-colors hover:text-tbc-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-tbc-yellow">
        <span>{title}</span>
        <ChevronDown
          aria-hidden="true"
          size={16}
          className="shrink-0 text-white/50 transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="pb-4">{children}</div>
    </details>
  );
}

function PersonAvatar({ name, imageSrc }: { name: string; imageSrc?: string }) {
  return (
    <span className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden border border-tbc-purple/40 bg-tbc-purple/15">
      {imageSrc ? (
        <>
          <Image
            src={imageSrc}
            alt={name}
            fill
            sizes="56px"
            className="photo-tinted object-cover"
          />
          <span className="photo-tint" aria-hidden="true" />
        </>
      ) : (
        <span className="font-mono text-sm font-bold tracking-wider text-white/80">
          {initials(name)}
        </span>
      )}
    </span>
  );
}

/** Date and time pushed to the right of the workshop block. */
function WorkshopWhen({ when }: { when: string }) {
  // "Fri 30 Oct, 11:00–11:30" → day on top, time below in bold.
  const [day, ...rest] = when.split(", ");
  const time = rest.join(", ");

  return (
    <div className="flex shrink-0 items-center gap-2.5 text-right">
      <CalendarClock
        aria-hidden="true"
        size={18}
        className="hidden text-tbc-yellow sm:block"
      />
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/50">
          {time ? day : "Workshop"}
        </p>
        <p className="font-display text-base font-bold tabular-nums text-tbc-yellow sm:text-lg">
          {time || day}
        </p>
      </div>
    </div>
  );
}

function TrackPanel({ track }: { track: PrizeTrack }) {
  const ideas = track.ideas ?? [];
  const howToWin = track.howToWin ?? [];
  const prizes = track.prizes ?? [];
  const companies = track.companies ?? [];
  const selectionCriteria = track.selectionCriteria ?? [];
  const requirements = track.requirements ?? [];
  const submission = track.submission ?? [];
  const resources = track.resources ?? [];
  const judges = track.judges ?? [];
  const support = track.support ?? [];
  // Only the track's own content counts: shared defaults would hide the
  // "coming soon" placeholder on tracks that have no brief yet.
  const hasDetailedContent =
    Boolean(track.description) ||
    ideas.length > 0 ||
    howToWin.length > 0 ||
    companies.length > 0 ||
    selectionCriteria.length > 0 ||
    requirements.length > 0;

  return (
    <div>
      {/* Header: logo, sponsor, total, website and X chips */}
      <div className="flex items-start gap-4 sm:gap-5">
        <LogoTile
          src={track.sponsorLogoSrc ?? track.sponsorMarkSrc}
          alt={`${track.sponsor} logo`}
          fallback={track.sponsor[0]}
        />
        <div className="min-w-0">
          <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl">
            {track.sponsor}
          </h2>
          <p className="mt-0.5 font-display text-lg font-bold text-tbc-yellow drop-shadow-[0_2px_12px_rgba(255,193,16,0.25)] sm:text-xl md:text-2xl">
            {track.amount ?? prizeContent.trackAmountFallback}
          </p>
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            {track.sponsorHref ? (
              <Chip
                href={track.sponsorHref}
                icon={<Globe size={12} className="text-white/70" />}
                label={hostLabel(track.sponsorHref)}
              />
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-10">
        {track.workshop ? (
          <section>
            <SectionTitle>Workshop</SectionTitle>
            <div className="mt-3 flex items-center justify-between gap-4 rounded-[16px] border border-white/10 bg-black p-4 sm:p-5">
              <div className="min-w-0">
                <p className="font-display text-base font-semibold text-white">
                  {track.workshop.title}
                </p>
                {track.workshop.speaker ? (
                  <p className="mt-1 text-sm text-white/60">
                    {track.workshop.speaker}
                  </p>
                ) : null}
              </div>
              <WorkshopWhen when={track.workshop.when} />
            </div>
          </section>
        ) : null}

        {track.about || track.description ? (
          <section>
            <SectionTitle>About</SectionTitle>
            <div className="mt-2 space-y-3">
              {track.about ? (
                <p className="text-sm leading-relaxed text-white/75">
                  {track.about}
                </p>
              ) : null}
              {track.description ? (
                <ReadMore key={track.slug} text={track.description} />
              ) : null}
            </div>
          </section>
        ) : null}

        {hasDetailedContent ? (
          <>
            {/* The prize first: amount and split, a short brief, then what qualifies */}
            <section className="space-y-5">
              <SectionTitle>Prize</SectionTitle>

              {companies.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {companies.map((company) => (
                    <PartnerCard key={company.name} company={company} />
                  ))}
                </div>
              ) : (
                <div className="rounded-[18px] border border-white/10 bg-black/30 p-4 sm:p-5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="font-display text-lg font-bold text-white sm:text-xl">
                      {track.trackName}
                    </p>
                    {track.amount ? (
                      <p className="font-display text-base font-semibold text-white/60">
                        ⸺ {track.amount}
                      </p>
                    ) : null}
                  </div>
                  {track.tagline ? (
                    <p className="mt-1 text-sm text-white/60">
                      {track.tagline}
                    </p>
                  ) : null}

                  {prizes.length > 0 ? (
                    <dl className="mt-4 grid max-w-md grid-cols-3 divide-x divide-white/10 overflow-hidden rounded-[12px] border border-white/10 bg-white/[0.03]">
                      {prizes.map((prize) => (
                        <div key={prize.title} className="px-3 py-2.5">
                          <dt
                            className={cn(
                              "flex items-center gap-1.5 text-xs font-semibold",
                              placeTone[prize.place ?? ""] ?? "text-white/70",
                            )}
                          >
                            <Trophy aria-hidden="true" size={12} />
                            {prize.title}
                          </dt>
                          <dd className="mt-0.5 font-display text-sm font-bold tabular-nums text-white sm:text-base">
                            {prize.amount}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                  {track.prizeNote ? (
                    <p className="mt-3 flex gap-2 text-xs leading-relaxed text-white/60">
                      <Info
                        aria-hidden="true"
                        size={14}
                        className="mt-px shrink-0 text-tbc-yellow"
                      />
                      <span>{track.prizeNote}</span>
                    </p>
                  ) : null}
                </div>
              )}

              {requirements.length > 0 || selectionCriteria.length > 0 ? (
                <div className="rounded-[16px] border border-tbc-yellow/20 bg-tbc-yellow/[0.04] p-4 sm:p-5">
                  <SubTitle>
                    {requirements.length > 0
                      ? "Qualification requirements"
                      : "How winners are chosen"}
                  </SubTitle>
                  <CheckList
                    items={
                      requirements.length > 0 ? requirements : selectionCriteria
                    }
                  />
                </div>
              ) : null}

              {submission.length > 0 ||
              track.judgingGuidance ||
              howToWin.length > 0 ||
              ideas.length > 0 ? (
                <div className="border-t border-white/10">
                  {submission.length > 0 ? (
                    <Disclosure title="What to submit">
                      <div className="space-y-4">
                        <div>
                          <SubTitle>Every team</SubTitle>
                          <CheckList items={prizeContent.defaultRequirements} />
                        </div>
                        <div>
                          <SubTitle>For this track</SubTitle>
                          <CheckList items={submission} />
                        </div>
                      </div>
                    </Disclosure>
                  ) : null}
                  {track.judgingGuidance ? (
                    <Disclosure title="What judges look for">
                      <p className="text-xs text-white/50">
                        Judges assess these qualities after checking the
                        qualification requirements.
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white/80">
                        {track.judgingGuidance}
                      </p>
                    </Disclosure>
                  ) : null}
                  {howToWin.length > 0 ? (
                    <Disclosure title="How to win">
                      <DotList items={howToWin} />
                    </Disclosure>
                  ) : null}
                  {ideas.length > 0 ? (
                    <Disclosure title="Example ideas">
                      <p className="text-xs text-white/50">
                        These are starting points. Your own idea is welcome if
                        it meets the qualification requirements.
                      </p>
                      <DotList items={ideas} />
                    </Disclosure>
                  ) : null}
                </div>
              ) : null}
            </section>

            {track.quickStart?.length ? (
              <section>
                <SectionTitle>Get started</SectionTitle>
                <ol className="mt-3 space-y-2.5">
                  {track.quickStart.map((step, idx) => (
                    <li
                      key={step}
                      className="flex gap-3 text-sm leading-relaxed text-white/80"
                    >
                      <span className="flex size-6 shrink-0 items-center justify-center border border-tbc-yellow/40 font-mono text-xs font-bold text-tbc-yellow">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            {resources.length > 0 ? (
              <section>
                <SectionTitle>Links and resources</SectionTitle>
                {track.agentContext ? (
                  <details className="group mt-3 rounded-[14px] border border-tbc-yellow/25 bg-tbc-yellow/[0.04] [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-tbc-yellow sm:px-5">
                      <span className="flex items-center gap-2.5">
                        <Bot
                          aria-hidden="true"
                          size={16}
                          className="shrink-0 text-tbc-yellow"
                        />
                        <span className="text-sm font-semibold text-white">
                          Context for your coding agent
                        </span>
                      </span>
                      <ChevronDown
                        aria-hidden="true"
                        size={16}
                        className="shrink-0 text-white/50 transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                      <p className="mb-3 text-xs leading-relaxed text-white/60">
                        Copy a short starting prompt with sponsor docs and links
                        to the current rules.
                      </p>
                      <CopyText text={track.agentContext} />
                    </div>
                  </details>
                ) : null}
                <div className="mt-6 grid gap-x-4 gap-y-6 sm:grid-cols-2">
                  {resources.map((group) => (
                    <div key={group.title} className="flex flex-col">
                      <h4 className="flex items-center gap-2 font-display text-base font-bold text-white">
                        <span
                          aria-hidden="true"
                          className="h-4 w-1 shrink-0 bg-tbc-yellow"
                        />
                        {group.title}
                      </h4>
                      <ul className="mt-2.5 flex-1 divide-y divide-white/[0.07] rounded-[14px] border border-white/10 bg-black/30 px-4">
                        {group.links.map((link) => (
                          <LinkRow key={link.label} link={link} />
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {judges.length > 0 ? (
              <section>
                <SectionTitle>Judges</SectionTitle>
                <ul className="mt-3 grid gap-4 sm:grid-cols-2">
                  {judges.map((judge) => (
                    <li key={judge.name} className="flex items-center gap-4">
                      <PersonAvatar
                        name={judge.name}
                        imageSrc={judge.imageSrc}
                      />
                      <div className="min-w-0">
                        <p className="font-display text-base font-semibold text-white">
                          {judge.name}
                        </p>
                        <p className="text-sm text-white/55">{judge.role}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {support.length > 0 ? (
              <section>
                <SectionTitle>Support</SectionTitle>
                <ul className="mt-2 divide-y divide-white/[0.07]">
                  {support.map((link) => {
                    const Icon = link.icon === "person" ? UserRound : LifeBuoy;
                    return (
                      <li key={link.label} className="flex gap-3">
                        <Icon
                          aria-hidden="true"
                          size={14}
                          className="mt-[0.85rem] shrink-0 text-white/40"
                        />
                        <ul className="min-w-0">
                          {/* Titles only: the labels say enough. */}
                          <LinkRow link={{ ...link, note: undefined }} />
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ) : null}
          </>
        ) : (
          /* Coming soon dashed placeholder with warm ambient trophy badge */
          <div className="flex flex-col items-center justify-center rounded-[16px] border border-dashed border-white/20 bg-gradient-to-b from-white/[0.04] to-transparent p-6 text-center backdrop-blur-sm sm:p-8">
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
  );
}

function formatRemaining(ms: number) {
  const total = Math.floor(ms / 1000);
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${pad(Math.floor(total / 3600))}:${pad(Math.floor((total % 3600) / 60))}:${pad(total % 60)}`;
}

/** Big countdown to the deadline, shown only once hacking has started. */
function SubmissionTimer({
  startIso,
  deadlineIso,
}: {
  startIso: string;
  deadlineIso: string;
}) {
  const now = useNow();
  if (now === null || now < Date.parse(startIso)) return null;
  const remaining = Date.parse(deadlineIso) - now;

  return (
    <div className="mt-6 rounded-[18px] border border-tbc-yellow/30 bg-tbc-yellow/[0.06] px-5 py-5 text-center sm:py-7">
      {remaining > 0 ? (
        <>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            Submissions close in
          </p>
          <p
            role="timer"
            className="mt-2 font-display text-5xl font-bold tabular-nums tracking-tight text-tbc-yellow drop-shadow-[0_2px_18px_rgba(255,193,16,0.3)] sm:text-6xl md:text-7xl"
          >
            {formatRemaining(remaining)}
          </p>
        </>
      ) : (
        <p className="font-display text-3xl font-bold text-white sm:text-4xl">
          Submissions are closed
        </p>
      )}
    </div>
  );
}

function SubmissionPanel({
  guide,
  tracks,
}: {
  guide: SubmissionGuide;
  tracks: PrizeTrack[];
}) {
  // Pooled tracks (like the TUM Blockchain Track) need no extra items.
  const partnerTracks = tracks.filter(
    (track) => (track.companies ?? []).length === 0,
  );

  return (
    <div>
      <div className="flex items-start gap-4 sm:gap-5">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-[16px] border border-tbc-yellow/30 bg-tbc-yellow/10 shadow-[0_0_24px_rgba(255,193,16,0.18)] sm:size-20">
          <Clock aria-hidden="true" className="size-7 text-tbc-yellow" />
        </div>
        <div className="min-w-0">
          <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl">
            {guide.title}
          </h2>
          <p className="mt-0.5 font-display text-lg font-bold text-tbc-yellow drop-shadow-[0_2px_12px_rgba(255,193,16,0.25)] sm:text-xl md:text-2xl">
            {guide.deadline}
          </p>
        </div>
      </div>

      <SubmissionTimer
        startIso={guide.hackingStartsIso}
        deadlineIso={guide.deadlineIso}
      />

      <div className="mt-7 space-y-9">
        <section>
          <p className="text-xs leading-relaxed text-white/80 sm:text-sm">
            {guide.intro}
          </p>
          <ol className="mt-5 space-y-3">
            {guide.steps.map((step, idx) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-[14px] border border-white/10 bg-black/30 p-4"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-tbc-yellow font-mono text-xs font-bold text-black">
                  {idx + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {step.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-white/65 sm:text-sm">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <SectionTitle>Every project needs</SectionTitle>
          <CheckList items={guide.requirements} />
        </section>

        <section>
          <SectionTitle>Extra items per track</SectionTitle>
          <div className="mt-3 divide-y divide-white/10 rounded-[16px] border border-white/10 bg-black">
            {partnerTracks.map((track) => {
              const markSrc = track.sponsorMarkSrc ?? track.sponsorLogoSrc;
              const items = track.submission ?? [];
              return (
                <div key={track.slug} className="p-4 sm:p-5">
                  <a
                    href={`#${track.slug}`}
                    className="inline-flex items-center gap-2.5 text-sm font-semibold text-white hover:text-tbc-yellow"
                  >
                    {markSrc ? (
                      <span className="relative flex size-6 shrink-0 overflow-hidden rounded-[9999px] bg-white">
                        <Image
                          src={markSrc}
                          alt=""
                          fill
                          sizes="24px"
                          className="object-contain p-1"
                        />
                      </span>
                    ) : null}
                    {track.sponsor}
                    <span className="font-normal text-white/50">
                      {track.trackName}
                    </span>
                  </a>
                  {items.length > 0 ? (
                    <CheckList items={items} />
                  ) : (
                    <p className="mt-2 text-xs text-white/50 sm:text-sm">
                      {prizeContent.trackRequirementsFallback}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <SectionTitle>Judging on Saturday</SectionTitle>
          <ol className="mt-3 divide-y divide-white/10 rounded-[16px] border border-white/10 bg-black">
            {guide.judging.map((slot) => (
              <li
                key={slot.title}
                className="flex flex-col gap-1 px-4 py-3.5 sm:flex-row sm:gap-5 sm:px-5"
              >
                <span className="w-28 shrink-0 font-mono text-sm font-semibold tabular-nums text-tbc-yellow">
                  {slot.time}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {slot.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-white/65 sm:text-sm">
                    {slot.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <SectionTitle>Prepare for judging</SectionTitle>
          <DotList
            items={[
              "Keep the demo and repository accessible to judges. Include setup steps and any demo limits in your README.",
              "Show the working flow and the transaction or verification evidence required by each track.",
              "Follow organizer instructions for team locations and judging queues. The schedule lists the judging window.",
            ]}
          />
          <details className="mt-4 border border-white/10 bg-black/30 p-4">
            <summary className="cursor-pointer text-sm font-semibold text-white">
              Copy your submission checklist
            </summary>
            <div className="mt-4">
              <CopyText
                label="Copy checklist"
                text={[
                  `Submission deadline: ${guide.deadline}`,
                  "Complete the global requirements and only the partner-track sections you enter. Ignore other track sections.",
                  ...guide.requirements.map((item) => `- [ ] ${item}`),
                  ...partnerTracks.flatMap((track) => [
                    `\n${track.sponsor}`,
                    ...(track.submission ?? []).map((item) => `- [ ] ${item}`),
                  ]),
                ].join("\n")}
              />
            </div>
          </details>
        </section>

        <section>
          <SectionTitle>Questions</SectionTitle>
          <ul className="mt-1 divide-y divide-white/[0.07]">
            {guide.help.map((link) => (
              <LinkRow key={link.label} link={link} />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export function PrizeTracks({
  tracks,
  submission = prizeContent.submission,
  className,
}: PrizeTracksProps) {
  const [activeSlug, setActiveSlug] = useState<string>(tracks[0]?.slug ?? "");
  // The submission guide unlocks when hacking starts (Fri 30 Oct, 09:00).
  const unlocked = useHasStarted(submission.hackingStartsIso);

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
        if (hash === "submit" || hash === "submission") {
          hash = submission.slug;
        }
        if (
          hash &&
          (hash === submission.slug || tracks.some((t) => t.slug === hash))
        ) {
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
  }, [tracks, submission.slug]);

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

  const showingSubmission = unlocked && activeSlug === submission.slug;
  const activeTrack = tracks.find((t) => t.slug === activeSlug) ?? tracks[0];

  const select = (slug: string) => {
    setActiveSlug(slug);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${slug}`);
    }
  };

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
            {/* Submission guide first, set apart from the prizes */}
            <button
              id={submission.slug}
              type="button"
              role="tab"
              aria-selected={showingSubmission}
              disabled={!unlocked}
              title={unlocked ? undefined : submission.lockedLabel}
              onClick={() => select(submission.slug)}
              className={cn(
                "flex shrink-0 items-center gap-3.5 rounded-[16px] border border-dashed px-4 py-3 text-left transition-all md:w-full",
                !unlocked
                  ? "cursor-not-allowed border-white/15 opacity-50 grayscale"
                  : showingSubmission
                    ? "border-tbc-yellow/60 bg-tbc-yellow/10 text-white shadow-md"
                    : "border-tbc-yellow/30 text-white/80 hover:border-tbc-yellow/60 hover:bg-tbc-yellow/[0.06] hover:text-white",
              )}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-[9999px] bg-tbc-yellow/15">
                <Clock
                  aria-hidden="true"
                  size={18}
                  className="text-tbc-yellow"
                />
              </span>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-bold tracking-tight text-white">
                  {submission.title}
                </span>
                <span className="text-xs font-semibold text-tbc-yellow/80">
                  {unlocked ? submission.label : submission.lockedLabel}
                </span>
              </div>
            </button>
            <div
              aria-hidden="true"
              className="hidden border-t border-white/10 md:my-2 md:block"
            />

            {tracks.map((track) => {
              const isSelected =
                !showingSubmission && track.slug === activeTrack.slug;
              const markSrc = track.sponsorMarkSrc ?? track.sponsorLogoSrc;

              return (
                <button
                  key={track.slug}
                  id={track.slug}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => select(track.slug)}
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
        <div
          role="tabpanel"
          className="flex flex-col bg-white/[0.02] p-5 sm:p-6 md:p-8"
        >
          {showingSubmission ? (
            <SubmissionPanel guide={submission} tracks={tracks} />
          ) : (
            <TrackPanel track={activeTrack} />
          )}
        </div>
      </div>
    </div>
  );
}

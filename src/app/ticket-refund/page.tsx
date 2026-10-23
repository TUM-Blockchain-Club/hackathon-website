import type { Metadata } from "next";
import Image from "next/image";
import { TriangleAlert } from "lucide-react";

import { PageHeader } from "@/components/primitives/page-header";
import {
  ticketRefundContent,
  ticketRefundNextSteps,
  ticketRefundPrep,
  ticketRefundSteps,
  type RefundTextPart,
} from "@/content/ticket-refund";
import { cn } from "@/lib/utils";

import { CopyMessage } from "./copy-message";

// Hidden page: linked only from hacker emails, so keep it out of search.
export const metadata: Metadata = {
  title: ticketRefundContent.title,
  description: ticketRefundContent.description,
  robots: { index: false, follow: false },
};

function RichText({ parts }: { parts: RefundTextPart[] }) {
  return parts.map((part, index) => {
    if (typeof part === "string") return part;
    if ("strong" in part) {
      return (
        <strong key={index} className="font-semibold text-white">
          {part.strong}
        </strong>
      );
    }
    if ("ui" in part) {
      return (
        <span
          key={index}
          className="whitespace-nowrap border border-white/14 bg-white/[0.08] px-1.5 py-0.5 text-[0.92em] font-semibold text-white"
        >
          {part.ui}
        </span>
      );
    }
    const isExternal = part.href.startsWith("http");
    return (
      <a
        key={index}
        href={part.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className="font-semibold text-tbc-yellow underline decoration-tbc-yellow/40 underline-offset-4 transition-colors hover:decoration-tbc-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {part.link}
      </a>
    );
  });
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-tbc-yellow">
      {children}
    </p>
  );
}

export default function TicketRefundPage() {
  return (
    <>
      <PageHeader
        eyebrow={ticketRefundContent.eyebrow}
        title={ticketRefundContent.title}
        description={ticketRefundContent.description}
        compact
      />

      <div className="site-container pb-24">
        <div className="mx-auto grid max-w-3xl gap-12 md:gap-16">
          <section
            aria-labelledby="refund-message"
            className="grid gap-4 border border-white/10 bg-[#151515] p-5 md:p-6"
          >
            <h2 id="refund-message">
              <SectionLabel>{ticketRefundContent.messageLabel}</SectionLabel>
            </h2>
            <CopyMessage text={ticketRefundContent.message} />
            <p className="text-sm text-muted-foreground">
              {ticketRefundContent.messageHint}
            </p>
          </section>

          <section className="grid gap-4">
            <h2 className="font-display text-2xl font-semibold leading-tight text-white md:text-3xl">
              Before you start
            </h2>
            <ul className="grid gap-2 text-base text-muted-foreground">
              {ticketRefundPrep.map((parts, index) => (
                <li key={index} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 bg-tbc-yellow"
                  />
                  <span>
                    <RichText parts={parts} />
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <ol className="grid gap-14 md:gap-16">
            {ticketRefundSteps.map((step, index) => (
              <li key={step.title} className="grid gap-5">
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center bg-tbc-yellow font-mono text-base font-bold text-black"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="grid min-w-0 gap-2 pt-1">
                    <h2 className="font-display text-xl font-semibold leading-tight text-white md:text-2xl">
                      <span className="sr-only">Step {index + 1}: </span>
                      {step.title}
                    </h2>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      <RichText parts={step.body} />
                    </p>
                  </div>
                </div>

                <figure className="grid gap-2">
                  <Image
                    src={step.image.src}
                    width={step.image.width}
                    height={step.image.height}
                    alt={step.image.alt}
                    className={cn(
                      "h-auto w-full border border-white/10 bg-[#1b1420]",
                      step.narrow && "max-w-[460px]",
                    )}
                  />
                  {step.caption ? (
                    <figcaption className="text-sm text-muted-foreground">
                      {step.caption}
                    </figcaption>
                  ) : null}
                </figure>

                {step.callout ? (
                  <div className="flex gap-3 border border-tbc-red/40 border-l-4 border-l-tbc-red bg-tbc-red/[0.08] px-4 py-3.5 text-base text-muted-foreground">
                    <TriangleAlert
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-tbc-red"
                    />
                    <p>
                      <RichText parts={step.callout} />
                    </p>
                  </div>
                ) : null}
              </li>
            ))}
          </ol>

          <section className="grid gap-4 border-t border-white/10 pt-10">
            <h2 className="font-display text-2xl font-semibold leading-tight text-white md:text-3xl">
              What happens next
            </h2>
            <ul className="grid gap-3 text-base text-muted-foreground">
              {ticketRefundNextSteps.map((parts, index) => (
                <li key={index} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 bg-tbc-yellow"
                  />
                  <span>
                    <RichText parts={parts} />
                  </span>
                </li>
              ))}
            </ul>
            <p className="pt-4 text-sm text-white/40">
              {ticketRefundContent.footnote}
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqGroup, ResourceLink } from "@/types/content";
import { cn } from "@/lib/utils";

type FaqsSectionProps = {
  groups: FaqGroup[];
  resources: ResourceLink[];
};

export function FaqsSection({ groups, resources }: FaqsSectionProps) {
  const [collapsedGroupSlugs, setCollapsedGroupSlugs] = useState<Set<string>>(
    () =>
      new Set(
        groups
          .filter((group) => group.slug !== "about")
          .map((group) => group.slug),
      ),
  );

  const toggleGroup = (slug: string) => {
    if (slug === "about") return;

    setCollapsedGroupSlugs((current) => {
      const next = new Set(current);

      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }

      return next;
    });
  };

  return (
    <section className="site-container pb-24 pt-28 md:pt-32">
      <div className="mx-auto max-w-4xl">
        <header className="pb-12 text-center md:pb-20">
          <h1 className="mx-auto max-w-5xl font-display text-4xl font-semibold leading-[1.02] text-foreground md:text-6xl">
            FAQ
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base text-muted-foreground md:text-lg">
            Grouped answers for applying, teams, building, submissions, judging,
            logistics, and more.
          </p>

          <div className="mx-auto mt-8 grid max-w-3xl gap-2 sm:grid-cols-2 md:grid-cols-4">
            {resources.map((resource) => {
              const isExternal =
                resource.external ?? resource.href.startsWith("http");

              if (resource.disabled) {
                return (
                  <span
                    key={resource.href}
                    className="group inline-flex min-h-11 items-center justify-between gap-3 border border-white/6 bg-white/[0.02] px-4 py-2 text-left text-sm font-semibold text-white/30 cursor-not-allowed"
                  >
                    <span>{resource.label}</span>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-white/20"
                    />
                  </span>
                );
              }

              return (
                <Link
                  key={resource.href}
                  href={resource.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="group inline-flex min-h-11 cursor-pointer items-center justify-between gap-3 border border-white/10 bg-white/[0.04] px-4 py-2 text-left text-sm font-semibold text-white/78 transition-colors hover:border-white/18 hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span>{resource.label}</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-white/70"
                  />
                </Link>
              );
            })}
          </div>
        </header>

        <div className="overflow-hidden border border-white/10 bg-[#151515] backdrop-blur-md">
          <div className="divide-y divide-white/10">
            {groups.map((group) => (
              <FaqTopic
                key={group.slug}
                group={group}
                collapsed={collapsedGroupSlugs.has(group.slug)}
                onToggle={() => toggleGroup(group.slug)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqTopic({
  group,
  collapsed,
  onToggle,
}: {
  group: FaqGroup;
  collapsed: boolean;
  onToggle: () => void;
}) {
  const isAboutTopic = group.slug === "about";
  const headerContent = (
    <>
      <div>
        <h2 className="font-display text-2xl font-semibold leading-tight text-white md:text-4xl">
          {group.title}
        </h2>
      </div>
      <span className="flex shrink-0 items-center gap-2">
        {!isAboutTopic ? (
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "size-4 text-white/42 transition-transform duration-200",
              collapsed ? "-rotate-90" : "rotate-0",
            )}
          />
        ) : null}
      </span>
    </>
  );

  return (
    <section id={group.slug} className="scroll-mt-32">
      {isAboutTopic ? (
        <div className="flex items-end justify-between gap-4 border-b border-white/[0.07] bg-black/35 px-4 py-5 md:px-5 md:py-6">
          {headerContent}
        </div>
      ) : (
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={!collapsed}
          aria-controls={`${group.slug}-questions`}
          className="group flex w-full cursor-pointer items-end justify-between gap-4 border-b border-white/[0.07] bg-black/35 px-4 py-5 text-left transition-colors hover:border-[rgba(45,212,191,0.28)] hover:bg-[rgba(45,212,191,0.075)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:px-5 md:py-6"
        >
          {headerContent}
        </button>
      )}

      {!collapsed ? (
        <Accordion
          id={`${group.slug}-questions`}
          type="single"
          collapsible
          className="bg-[#151515]"
        >
          {group.items.map((item, index) => {
            return (
              <AccordionItem
                key={`${group.slug}-${item.question}`}
                value={`${group.slug}-${index}`}
                className="border-b border-white/[0.07] bg-white/[0.035] last:border-b-0 data-[state=open]:bg-white/[0.06]"
              >
                <AccordionTrigger className="cursor-pointer gap-4 px-4 py-4 text-left hover:no-underline [&>svg]:size-4 [&>svg]:text-white/42 md:px-5">
                  <span className="min-w-0 flex-1 pr-2 text-sm font-semibold leading-6 text-white md:text-[15px]">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="border-t border-white/[0.07] pb-5 pl-4 pr-4 pt-4 md:pl-5 md:pr-5">
                  <p className="max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : null}
    </section>
  );
}

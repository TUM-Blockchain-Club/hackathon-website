import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/primitives/page-header";
import { SectionShell } from "@/components/primitives/section-shell";
import { SpeakersJudges } from "@/components/sections/speakers-judges";
import { buttonVariants } from "@/components/ui/button";
import { peopleContent, people } from "@/content/people";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: peopleContent.title,
  description: peopleContent.description,
};

export default function SpeakersAndJudgesPage() {
  const publicPeople = people.filter((person) => person.publicCleared);

  return (
    <>
      <PageHeader
        eyebrow="People"
        title={peopleContent.title}
        description={peopleContent.description}
      />
      <SectionShell
        title="Roster Preview"
        description="Prior-event portraits are wired as temporary preview data while the confirmed 2026 roster is approved for public listing."
      >
        <SpeakersJudges
          people={publicPeople}
          fallback={peopleContent.fallback}
        />
        <div className="mt-8">
          <Link
            href={siteConfig.applicationUrl}
            className={buttonVariants({ variant: "outline" })}
          >
            Apply
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </SectionShell>
    </>
  );
}

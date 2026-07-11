"use client";

import { useEffect, useRef } from "react";

type DevfolioButtonTheme = "light" | "dark" | "dark-inverted";

type DevfolioApplyButtonProps = {
  applicationUrl: string;
  hackathonSlug: string;
  /**
   * The production hostname where this site's URL is registered on Devfolio.
   * The official SDK button only renders there; on any other host (localhost,
   * preview deploys) it loads a blank white box, so we keep the marker in the
   * DOM but reveal it only on the production host.
   */
  productionHost: string;
  theme?: DevfolioButtonTheme;
};

export function DevfolioApplyButton({
  applicationUrl,
  hackathonSlug,
  productionHost,
  theme = "light",
}: DevfolioApplyButtonProps) {
  const slotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal the official button only on the verified production domain.
    // Mutating the style imperatively (rather than via React state) keeps
    // React from re-reconciling the subtree after the SDK has swapped the
    // marker out for its <iframe>.
    if (window.location.hostname === productionHost) {
      slotRef.current?.style.removeProperty("display");
    }
  }, [productionHost]);

  return (
    <div className="flex flex-col items-center gap-3">
      {/*
        Official Devfolio "Apply with Devfolio" button. The SDK (loaded in
        app/page.tsx) replaces this marker with an <iframe>. That iframe only
        renders the real button on the verified production domain; elsewhere it
        loads blank (a white box). We keep the marker in the DOM for Devfolio's
        verification but hide the slot until we know we're on production.
      */}
      <div ref={slotRef} style={{ display: "none" }}>
        <div
          className="apply-button"
          data-hackathon-slug={hackathonSlug}
          data-button-theme={theme}
          style={{ height: 44, width: 312 }}
        />
      </div>
      {/*
        Plain secondary fallback so applicants can always reach Devfolio while
        the official button is blank (pre-verification) or hidden (non-prod).
        Kept as a text link, not a recreation of the official button.
      */}
      <a
        href={applicationUrl}
        target="_blank"
        rel="noreferrer"
        className="text-sm font-medium text-white/60 underline underline-offset-4 transition-colors duration-100 hover:text-white focus-visible:text-white focus-visible:outline-none"
      >
        Apply on Devfolio
      </a>
    </div>
  );
}

type DevfolioButtonTheme = "light" | "dark" | "dark-inverted";

type DevfolioApplyButtonProps = {
  applicationUrl: string;
  hackathonSlug: string;
  theme?: DevfolioButtonTheme;
};

export function DevfolioApplyButton({
  applicationUrl,
  hackathonSlug,
  theme = "light",
}: DevfolioApplyButtonProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      {/*
        Official Devfolio "Apply with Devfolio" button. The SDK
        (loaded in app/page.tsx) replaces this marker with the real button.
        It renders as empty space until the hackathon is verified on Devfolio
        and only on the configured production URL — that is expected.
      */}
      <div
        className="apply-button"
        data-hackathon-slug={hackathonSlug}
        data-button-theme={theme}
        style={{ height: 44, width: 312 }}
      />
      {/*
        Plain secondary fallback so applicants can always reach Devfolio while
        the official button is blank (pre-verification / non-production).
        Kept deliberately as a text link, not a recreation of the button.
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

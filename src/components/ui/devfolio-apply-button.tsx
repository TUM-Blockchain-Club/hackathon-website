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
    <div className="relative h-11 w-[calc(100vw-32px)] max-w-[312px] shrink-0 sm:w-[312px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-0"
      >
        <div
          className="apply-button"
          data-hackathon-slug={hackathonSlug}
          data-button-theme={theme}
          style={{ height: 44, width: 312 }}
        />
      </div>
      <a
        href={applicationUrl}
        className="relative z-10 inline-flex h-11 w-full items-center justify-center border-2 border-transparent bg-[#3770ff] px-8 text-[20px] font-semibold leading-none text-white transition-colors duration-100 hover:bg-[#2f62df] focus-visible:border-[#85a7ff] focus-visible:outline-none"
        style={{
          borderRadius: 4,
          fontFamily: '"Nunito Sans", sans-serif',
        }}
      >
        <svg
          aria-hidden="true"
          className="mr-2 size-6 shrink-0"
          viewBox="0 0 115.46 123.46"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M115.46 68a55.43 55.43 0 0 1-50.85 55.11S28.12 124 16 123a12.6 12.6 0 0 1-10.09-7.5 15.85 15.85 0 0 0 5.36 1.5c4 .34 10.72.51 20.13.51 13.82 0 28.84-.38 29-.38h.26a60.14 60.14 0 0 0 54.72-52.47c.05 1.05.08 2.18.08 3.34z" />
          <path d="M110.93 55.87A55.43 55.43 0 0 1 60.08 111s-36.48.92-48.58-.12C5 110.29.15 104.22 0 97.52l.2-83.84C.38 7 5.26.94 11.76.41c12.11-1 48.59.12 48.59.12a55.41 55.41 0 0 1 50.58 55.34z" />
        </svg>
        Apply with Devfolio
      </a>
    </div>
  );
}

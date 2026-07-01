type DevfolioButtonTheme = "light" | "dark" | "dark-inverted";

type DevfolioApplyButtonProps = {
  hackathonSlug: string;
  theme?: DevfolioButtonTheme;
};

export function DevfolioApplyButton({
  hackathonSlug,
  theme = "light",
}: DevfolioApplyButtonProps) {
  return (
    <div
      className="apply-button"
      data-hackathon-slug={hackathonSlug}
      data-button-theme={theme}
      style={{ height: 44, width: 312 }}
    />
  );
}

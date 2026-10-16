import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Less space below the title, for pages whose content should start high. */
  compact?: boolean;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  align = "center",
  compact = false,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "site-container",
        compact
          ? "pb-8 pt-28 md:pb-10 md:pt-32"
          : "pb-12 pt-28 md:pb-20 md:pt-36",
        align === "center" ? "text-center" : "text-left",
      )}
    >
      {eyebrow ? (
        <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-tbc-yellow">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mx-auto max-w-5xl font-display text-4xl font-semibold leading-[1.02] text-foreground md:text-6xl">
        {title}
      </h1>
      {description ? (
        <p
          className={cn(
            "mt-5 max-w-3xl text-base text-muted-foreground md:text-lg",
            align === "center" ? "mx-auto" : "mx-0",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}

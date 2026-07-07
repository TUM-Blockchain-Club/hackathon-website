"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import { buttonVariants } from "@/components/ui/button";
import type {
  HeroLogoShaderSettings,
  ShaderPalette,
} from "@/components/ui/hero-logo-shader";
import { cn } from "@/lib/utils";

type ShaderCtaLinkProps = ComponentProps<typeof Link> & {
  shaderColors?: ShaderPalette;
  hoverShaderSettings?: HeroLogoShaderSettings;
  shaderSettings?: HeroLogoShaderSettings;
  size?: "default" | "sm" | "lg";
};

export function ShaderCtaLink({
  children,
  className,
  size = "default",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  shaderColors,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hoverShaderSettings,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  shaderSettings,
  ...props
}: ShaderCtaLinkProps) {
  return (
    <Link
      {...props}
      className={cn(buttonVariants({ variant: "default", size }), className)}
    >
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </Link>
  );
}

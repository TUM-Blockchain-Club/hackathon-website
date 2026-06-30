"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Menu, X } from "lucide-react";
import { useState } from "react";

import { navItems, siteConfig } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import tbcLogo from "../../../assets/logos/tbc-logo-header.png";

type AnimatedNavLinkProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  active?: boolean;
  onNavigate?: () => void;
  noMove?: boolean;
};

function AnimatedNavLink({
  href,
  children,
  external = false,
  active = false,
  onNavigate,
  noMove = false,
}: AnimatedNavLinkProps) {
  if (noMove) {
    return (
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        onClick={onNavigate}
        className={cn(
          "inline-flex h-6 items-center gap-1 whitespace-nowrap rounded-sm text-sm transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
          active ? "text-white" : "text-muted-foreground hover:text-white",
        )}
      >
        {children}
        {external ? <ExternalLink aria-hidden="true" size={13} /> : null}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      onClick={onNavigate}
      className={cn(
        "group relative inline-flex h-6 items-start overflow-hidden whitespace-nowrap rounded-sm text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        active ? "text-white" : "text-muted-foreground",
      )}
    >
      <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
        <span className="flex h-6 items-center gap-1">
          {children}
          {external ? <ExternalLink aria-hidden="true" size={13} /> : null}
        </span>
        <span
          className="flex h-6 items-center gap-1 text-white"
          aria-hidden="true"
        >
          {children}
          {external ? <ExternalLink aria-hidden="true" size={13} /> : null}
        </span>
      </span>
    </Link>
  );
}

export function MiniNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed left-1/2 top-4 z-50 flex w-[calc(100%-1.5rem)] max-w-[calc(100%-1.5rem)] -translate-x-1/2 flex-col items-center border border-white/15 bg-black/70 px-4 py-3 shadow-[0_18px_80px_rgba(0,0,0,0.38)] backdrop-blur-md transition-[border-radius,background-color] duration-300 sm:top-5 sm:bg-black/58 sm:px-5 sm:backdrop-blur-xl lg:w-[860px] lg:max-w-[860px]",
        isOpen ? "rounded-2xl" : "rounded-full",
      )}
    >
      <div className="flex w-full items-center justify-between gap-x-5 sm:gap-x-7">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          aria-label="TUM Blockchain Hackathon home"
        >
          <Image
            src={tbcLogo}
            alt="TUM Blockchain Logo"
            width={28}
            height={28}
            priority
            className="size-7 shrink-0 object-contain rounded-full"
          />
        </Link>

        <nav className="hidden items-center gap-x-4 text-sm lg:flex">
          {navItems.map((item) => (
            <AnimatedNavLink
              key={item.href}
              href={item.href}
              external={item.external}
              active={!item.external && pathname === item.href}
              noMove={item.label === "Conference"}
            >
              {item.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={siteConfig.applicationUrl}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Apply
          </Link>
        </div>

        <button
          className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-muted-foreground transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          type="button"
        >
          {isOpen ? (
            <X aria-hidden="true" size={18} />
          ) : (
            <Menu aria-hidden="true" size={18} />
          )}
        </button>
      </div>

      <div
        className={cn(
          "flex w-full flex-col items-center overflow-hidden transition-all duration-300 ease-in-out lg:hidden",
          isOpen
            ? "max-h-[620px] pt-5 opacity-100"
            : "max-h-0 pt-0 opacity-0 pointer-events-none",
        )}
      >
        <nav className="flex w-full flex-col items-stretch gap-2 text-base">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-muted-foreground transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                !item.external && pathname === item.href ? "text-white" : "",
              )}
            >
              {item.label}
              {item.external ? (
                <ExternalLink aria-hidden="true" size={15} />
              ) : null}
            </Link>
          ))}
        </nav>
        <Link
          href={siteConfig.applicationUrl}
          onClick={() => setIsOpen(false)}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "mt-4 w-full",
          )}
        >
          Apply
        </Link>
      </div>
    </header>
  );
}

export const Navbar = MiniNavbar;

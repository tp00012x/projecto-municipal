"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

import { runViewTransition } from "~/lib/view-transition";

type TransitionLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  replace?: boolean;
  onNavigate?: () => void;
};

/**
 * Next Link that prefers the View Transitions API for in-app navigations.
 */
export default function TransitionLink({
  href,
  children,
  className,
  replace,
  onNavigate,
}: TransitionLinkProps) {
  const router = useRouter();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    if (
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("#")
    ) {
      return;
    }

    event.preventDefault();
    onNavigate?.();
    runViewTransition(() => {
      if (replace) router.replace(href);
      else router.push(href);
    });
  }

  return (
    <Link className={className} href={href} onClick={handleClick} replace={replace}>
      {children}
    </Link>
  );
}

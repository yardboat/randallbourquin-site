import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

/** One link for both destinations: internal routes go through next/link, off-site ones open in a new tab. */
export default function Out({
  href,
  external,
  children,
  ...rest
}: { href: string; external?: boolean; children: ReactNode } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

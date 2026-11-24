import type { ReactNode } from "react";
import { Icon } from "./icon";

type ArrowLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export function ArrowLink({ href, className = "", children }: ArrowLinkProps) {
  return (
    <a className={`btn ${className}`.trim()} href={href}>
      {children}
      <span className="ico" aria-hidden="true">
        <Icon name="arr" />
      </span>
    </a>
  );
}

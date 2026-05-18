import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "./utils";
import { Button, buttonVariants } from "./button";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="Странициране"
      data-slot="pagination"
      className={cn("mx-auto my-8 flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn(
        "flex flex-row flex-wrap items-center justify-center gap-2",
        className,
      )}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  disabled,
  size = "icon",
  href,
  onClick,
  tabIndex,
  "aria-disabled": ariaDisabled,
  ...props
}: PaginationLinkProps) {
  const isDisabled =
    disabled || ariaDisabled === true || ariaDisabled === "true";

  return (
    <a
      aria-current={isActive ? "page" : undefined}
      aria-disabled={isDisabled ? "true" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      href={isDisabled ? undefined : href}
      tabIndex={isDisabled ? -1 : tabIndex}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        "min-h-11 min-w-11 rounded-full border border-transparent px-3 text-sm font-extrabold transition-all hover:-translate-y-0.5 focus-visible:ring-[3px] active:translate-y-0 active:scale-[0.98]",
        "data-[active=true]:border-primary data-[active=true]:bg-primary data-[active=true]:text-primary-foreground",
        "aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-45",
        className,
      )}
      onClick={(event) => {
        if (isDisabled) {
          event.preventDefault();
          return;
        }

        onClick?.(event);
      }}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Към предишната страница"
      size="default"
      className={cn("gap-1 px-3 sm:pl-3", className)}
      {...props}
    >
      <ChevronLeftIcon aria-hidden="true" />
      <span className="hidden sm:block">Предишна</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Към следващата страница"
      size="default"
      className={cn("gap-1 px-3 sm:pr-3", className)}
      {...props}
    >
      <span className="hidden sm:block">Следваща</span>
      <ChevronRightIcon aria-hidden="true" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-11 items-center justify-center text-muted-foreground",
        className,
      )}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" aria-hidden="true" />
      <span className="sr-only">Още страници</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};

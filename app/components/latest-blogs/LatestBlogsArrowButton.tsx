"use client";

import { ReactNode } from "react";

/** Generic navigation arrow button for blog carousel */
export default function LatestBlogsArrowButton({
  onClick,
  icon,
  ariaLabel,
}: {
  onClick: () => void;
  icon: ReactNode;
  ariaLabel: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="p-2 rounded-full bg-gray-100 text-hoboc-dark hover:bg-gray-200 transition"
    >
      {icon}
    </button>
  );
}

/** Skeleton version for arrow button during loading */
export function LatestBlogsSkeletonArrowButton() {
  return (
    <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse">
      <div className="w-6 h-6" />
    </div>
  );
}

"use client";

import { Skeleton } from "@heroui/react";

/**
 * A grid of loading skeleton cards.
 * @param {number} count - Number of skeleton cards to render
 */
export function ProductCardSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border p-5 flex flex-col gap-4"
          style={{
            background: "oklch(0.21 0.006 286)",
            borderColor: "oklch(0.28 0.006 286)",
          }}
        >
          {/* Title */}
          <Skeleton className="h-5 w-3/4 rounded-lg" />
          {/* Description */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-full rounded" />
            <Skeleton className="h-3 w-2/3 rounded" />
          </div>
          {/* Tags row */}
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          {/* Button row */}
          <div className="flex gap-2 mt-auto pt-2">
            <Skeleton className="h-9 flex-1 rounded-xl" />
            <Skeleton className="h-9 flex-1 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * A table rows skeleton for the Orders page.
 * @param {number} rows
 */
export function TableRowSkeleton({ rows = 5 }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-4 py-3 rounded-xl border"
          style={{
            background: "oklch(0.21 0.006 286)",
            borderColor: "oklch(0.28 0.006 286)",
          }}
        >
          <Skeleton className="h-4 flex-1 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-8 w-24 rounded-xl" />
        </div>
      ))}
    </div>
  );
}

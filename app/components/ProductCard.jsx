"use client";

import { Button, Chip } from "@heroui/react";
import { authClient } from "../lib/auth-client";
import Link from "next/link";

/**
 * Product card used on both the Products page and the Manage Products page.
 *
 * Props:
 *  product       — Product data object
 *  onOrder       — () => void  — show order modal (Products page)
 *  onEdit        — () => void  — show edit modal (Manage page)
 *  onDelete      — () => void  — delete with confirmation (Manage page)
 *  isOwn         — boolean — true when shown on Manage page
 *  animationIdx  — 0-5 for stagger delay
 */
export function ProductCard({
  product,
  onOrder,
  onEdit,
  onDelete,
  isOwn = false,
  animationIdx = 0,
}) {
  const staggerClass = `stagger-${Math.min(animationIdx + 1, 6)}`;
  const inStock = product.stock > 0;
  const lowStock = product.stock > 0 && product.stock <= 5;

  const { data: session, isPending } = authClient.useSession();
  const user=session?.user;

  return (
    <article
      className={`rounded-2xl border flex flex-col gap-0 overflow-hidden transition-all duration-300 animate-fade-in ${staggerClass}`}
      style={{
        background: "oklch(0.21 0.006 286)",
        borderColor: "oklch(0.28 0.006 286)",
      }}
    >
      {/* ── Product image ──────────────────────────────────────── */}
      <div
        className="w-full aspect-[16/10] overflow-hidden relative"
        style={{ background: "oklch(0.24 0.006 286)" }}
      >
        {product.imageUrl ? (
          <img
            src={product?.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling?.style.setProperty("display", "flex");
            }}
          />
        ) : null}
        <div
          className="w-full h-full items-center justify-center absolute inset-0"
          style={{
            display: product.imageUrl ? "none" : "flex",
            color: "oklch(0.45 0.005 286)",
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>

        {/* Header accent strip overlaid at bottom of image */}
        <div
          className="h-1.5 w-full absolute bottom-0 left-0"
          style={{
            background: inStock
              ? "linear-gradient(90deg, oklch(0.585 0.233 293.2), oklch(0.52 0.26 270))"
              : "oklch(0.35 0.005 286)",
          }}
        />
      </div>

      {/* ── Card body ──────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <h3
            className="text-base font-semibold leading-snug flex-1"
            style={{ color: "oklch(0.94 0.005 286)" }}
          >
            {product.title}
          </h3>
          {isOwn && (
            <Chip
              size="sm"
              className="shrink-0"
              style={{
                background: "oklch(0.585 0.233 293.2 / 0.15)",
                color: "oklch(0.72 0.18 293)",
                fontSize: 10,
                fontWeight: 600,
                borderRadius: "99px",
                padding: "2px 8px",
              }}
            >
              Yours
            </Chip>
          )}
        </div>

        {/* Description */}
        {product.description && (
          <p
            className="text-xs leading-relaxed line-clamp-2"
            style={{ color: "oklch(0.58 0.005 286)" }}
          >
            {product.description}
          </p>
        )}

        {/* Price + Stock badges */}
        <div className="flex items-center gap-2 flex-wrap mt-auto">
          <span
            className="px-3 py-1 rounded-full text-sm font-bold"
            style={{
              background: "oklch(0.585 0.233 293.2 / 0.15)",
              color: "oklch(0.72 0.18 293)",
            }}
          >
            ${Number(product.price).toFixed(2)}
          </span>

          <span
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: inStock
                ? lowStock
                  ? "oklch(0.82 0.14 76 / 0.12)"
                  : "oklch(0.65 0.18 155 / 0.12)"
                : "oklch(0.594 0.1967 24.63 / 0.12)",
              color: inStock
                ? lowStock
                  ? "oklch(0.75 0.14 76)"
                  : "oklch(0.65 0.18 155)"
                : "oklch(0.7 0.12 24)",
            }}
          >
            {inStock ? `${product.stock} in stock` : "Out of stock"}
          </span>

          {lowStock && (
            <span
              className="px-2 py-1 rounded-full text-[10px] font-semibold"
              style={{
                background: "oklch(0.82 0.14 76 / 0.15)",
                color: "oklch(0.75 0.14 76)",
              }}
            >
              ⚠ Low
            </span>
          )}
        </div>
      </div>

      {/* ── Card footer actions ────────────────────────────────── */}
      <div
        className="flex gap-2 px-5 py-4 border-t"
        style={{ borderColor: "oklch(0.26 0.006 286)" }}
      >
        {/* Products page: Order button */}
  {
    user ?
    <div className="w-full">
          {onOrder && (
         <Button
            id={`order-btn-${product.id}`}
            size="sm"
            className="w-full font-semibold"
            isDisabled={!inStock}
            onPress={onOrder}
            style={{
              background: inStock
                ? "linear-gradient(135deg, oklch(0.585 0.233 293.2), oklch(0.52 0.26 270))"
                : "oklch(0.28 0.006 286)",
              color: inStock ? "white" : "oklch(0.5 0.005 286)",
              borderRadius: "12px",
            }}
          >
            {inStock ? "Order Now" : "Unavailable"}
          
          </Button>
        )}
        </div>
        :
              <div className="text-center animate-pulse bg-purple-500 py-1.5 rounded-2xl w-full">    <Link href={'/login'}>Login to order product</Link> </div>

  }

        {/* Manage page: Edit + Delete */}
        {onEdit && (
          <Button
            id={`edit-btn-${product.id}`}
            size="sm"
            className="flex-1 font-medium"
            onPress={onEdit}
            style={{
              background: "oklch(0.585 0.233 293.2 / 0.12)",
              color: "oklch(0.72 0.18 293)",
              border: "1px solid oklch(0.585 0.233 293.2 / 0.25)",
              borderRadius: "12px",
            }}
          >
            Edit
          </Button>
        )}
        {onDelete && (
          <Button
            id={`delete-product-btn-${product.id}`}
            size="sm"
            className="flex-1 font-medium"
            onPress={onDelete}
            style={{
              background: "oklch(0.594 0.1967 24.63 / 0.1)",
              color: "oklch(0.7 0.12 24)",
              border: "1px solid oklch(0.594 0.1967 24.63 / 0.25)",
              borderRadius: "12px",
            }}
          >
            Delete
          </Button>
        )}
      </div>
    </article>
  );
}
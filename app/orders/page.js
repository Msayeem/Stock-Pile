"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@heroui/react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { getUserOrders, deleteOrder } from "@/lib/api";
import { TableRowSkeleton } from "@/components/LoadingSkeleton";
import { EmptyState, ErrorBanner } from "@/components/EmptyState";

export default function OrdersPage() {
  const { data: session } = authClient.useSession();
  const currentUser = session?.user;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async () => {
    if (!currentUser?.id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getUserOrders(currentUser.id);
      setOrders(data);
    } catch (err) {
      setError(err.message || "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(order) {
    if (!window.confirm(`Cancel order for "${order.product?.title ?? "this product"}"?`)) return;
    setDeletingId(order.id);
    try {
      await deleteOrder(order.id);
      toast.success("Order cancelled successfully.");
      setOrders((prev) => prev.filter((o) => o.id !== order.id));
    } catch (err) {
      toast.error(err.message || "Failed to cancel order.");
    } finally {
      setDeletingId(null);
    }
  }

  const totalSpend = orders.reduce(
    (sum, o) => sum + Number(o.product?.price ?? 0) * o.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* ── Page header ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1
            className="text-3xl font-extrabold"
            style={{ color: "oklch(0.96 0.005 286)" }}
          >
            My Orders
          </h1>
          <p className="text-sm mt-1" style={{ color: "oklch(0.58 0.005 286)" }}>
            {currentUser
              ? `Showing orders for ${currentUser.name}`
              : "Sign in to view your orders"}
          </p>
        </div>

        {orders.length > 0 && (
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border"
            style={{
              background: "oklch(0.585 0.233 293.2 / 0.08)",
              borderColor: "oklch(0.585 0.233 293.2 / 0.25)",
            }}
          >
            <span className="text-xs font-medium" style={{ color: "oklch(0.65 0.005 286)" }}>
              Total Spend
            </span>
            <span className="text-lg font-bold" style={{ color: "oklch(0.72 0.18 293)" }}>
              ${totalSpend.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* ── Not signed in ───────────────────────────────────────────── */}
      {!currentUser && !loading && (
        <EmptyState
          icon={
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          }
          title="Not signed in"
          description="Sign in to your account to see your orders."
        />
      )}

      {/* ── Error ───────────────────────────────────────────────────── */}
      {error && <ErrorBanner message={error} onRetry={load} />}

      {/* ── Loading skeletons ────────────────────────────────────────── */}
      {loading && <TableRowSkeleton rows={5} />}

      {/* ── Orders table ─────────────────────────────────────────────── */}
      {!loading && !error && currentUser && orders.length > 0 && (
        <div className="flex flex-col gap-3 animate-fade-in">
          {/* Desktop table header */}
          <div
            className="hidden sm:grid grid-cols-[1fr_120px_80px_110px_130px] gap-4 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl"
            style={{
              background: "oklch(0.19 0.006 286)",
              color: "oklch(0.55 0.005 286)",
            }}
          >
            <span>Product</span>
            <span className="text-right">Price</span>
            <span className="text-right">Qty</span>
            <span className="text-right">Total</span>
            <span className="text-right">Action</span>
          </div>

          {/* Order rows */}
          {orders.map((order) => {
            const product = order.product;
            const total = Number(product?.price ?? 0) * order.quantity;

            return (
              <div
                key={order.id}
                className="rounded-2xl border transition-all duration-200 hover:border-[oklch(0.585_0.233_293.2/0.3)]"
                style={{
                  background: "oklch(0.21 0.006 286)",
                  borderColor: "oklch(0.28 0.006 286)",
                }}
              >
                {/* Desktop layout */}
                <div className="hidden sm:grid grid-cols-[1fr_120px_80px_110px_130px] gap-4 items-center px-4 py-4">
                  {/* Product info */}
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-sm" style={{ color: "oklch(0.92 0.005 286)" }}>
                      {product?.title ?? "Unknown product"}
                    </span>
                    {product?.description && (
                      <span className="text-xs line-clamp-1" style={{ color: "oklch(0.55 0.005 286)" }}>
                        {product.description}
                      </span>
                    )}
                  </div>

                  {/* Unit price */}
                  <span
                    className="text-sm font-medium text-right"
                    style={{ color: "oklch(0.72 0.005 286)" }}
                  >
                    ${Number(product?.price ?? 0).toFixed(2)}
                  </span>

                  {/* Quantity */}
                  <span
                    className="text-sm font-bold text-right px-2 py-0.5 rounded-lg"
                    style={{
                      background: "oklch(0.585 0.233 293.2 / 0.1)",
                      color: "oklch(0.72 0.18 293)",
                    }}
                  >
                    ×{order.quantity}
                  </span>

                  {/* Total */}
                  <span className="text-sm font-bold text-right" style={{ color: "oklch(0.85 0.18 293)" }}>
                    ${total.toFixed(2)}
                  </span>

                  {/* Delete */}
                  <div className="flex justify-end">
                    <Button
                      id={`cancel-order-${order.id}`}
                      size="sm"
                      isLoading={deletingId === order.id}
                      onPress={() => handleDelete(order)}
                      style={{
                        background: "oklch(0.594 0.1967 24.63 / 0.1)",
                        color: "oklch(0.7 0.12 24)",
                        border: "1px solid oklch(0.594 0.1967 24.63 / 0.25)",
                        borderRadius: "10px",
                      }}
                    >
                      Cancel Order
                    </Button>
                  </div>
                </div>

                {/* Mobile layout */}
                <div className="sm:hidden flex flex-col gap-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "oklch(0.92 0.005 286)" }}>
                        {product?.title ?? "Unknown product"}
                      </p>
                      {product?.description && (
                        <p className="text-xs mt-0.5 line-clamp-1" style={{ color: "oklch(0.55 0.005 286)" }}>
                          {product.description}
                        </p>
                      )}
                    </div>
                    <span
                      className="px-2 py-0.5 rounded-lg text-xs font-bold shrink-0"
                      style={{
                        background: "oklch(0.585 0.233 293.2 / 0.12)",
                        color: "oklch(0.72 0.18 293)",
                      }}
                    >
                      ×{order.quantity}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs" style={{ color: "oklch(0.58 0.005 286)" }}>
                      ${Number(product?.price ?? 0).toFixed(2)} × {order.quantity} ={" "}
                      <span className="font-bold" style={{ color: "oklch(0.72 0.18 293)" }}>
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    <Button
                      id={`cancel-order-mobile-${order.id}`}
                      size="sm"
                      isLoading={deletingId === order.id}
                      onPress={() => handleDelete(order)}
                      style={{
                        background: "oklch(0.594 0.1967 24.63 / 0.1)",
                        color: "oklch(0.7 0.12 24)",
                        border: "1px solid oklch(0.594 0.1967 24.63 / 0.25)",
                        borderRadius: "10px",
                        fontSize: "12px",
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Summary footer */}
          <div
            className="flex items-center justify-between px-4 py-3 rounded-xl border mt-2"
            style={{
              background: "oklch(0.19 0.006 286)",
              borderColor: "oklch(0.27 0.006 286)",
            }}
          >
            <span className="text-sm" style={{ color: "oklch(0.6 0.005 286)" }}>
              {orders.length} order{orders.length !== 1 ? "s" : ""}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm" style={{ color: "oklch(0.6 0.005 286)" }}>Total:</span>
              <span className="text-lg font-bold" style={{ color: "oklch(0.72 0.18 293)" }}>
                ${totalSpend.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Empty state ──────────────────────────────────────────────── */}
      {!loading && !error && currentUser && orders.length === 0 && (
        <EmptyState
          icon={
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4"/>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
          }
          title="No orders yet"
          description={`${currentUser.name} hasn't placed any orders. Head over to Products to get started!`}
          action={
            <a
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm"
              style={{
                background: "linear-gradient(135deg, oklch(0.585 0.233 293.2), oklch(0.52 0.26 270))",
              }}
            >
              Browse Products
            </a>
          }
        />
      )}
    </div>
  );
}
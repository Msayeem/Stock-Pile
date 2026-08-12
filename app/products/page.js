"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@heroui/react";
import { toast } from "sonner";
import { getProducts } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { ProductCard } from "@/components/ProductCard";
import { OrderModal } from "@/components/OrderModal";
import { ProductFormModal } from "@/components/ProductFormModal";
import { ProductCardSkeleton } from "@/components/LoadingSkeleton";
import { EmptyState, ErrorBanner } from "@/components/EmptyState";
import Link from "next/link";

export default function ProductsPage() {
  const { data: session } = authClient.useSession();
  const currentUser = session?.user;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // Order modal state
  const [orderTarget, setOrderTarget] = useState(null); // Product | null

  // Add product modal state
  const [addOpen, setAddOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || "Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.description ?? "").toLowerCase().includes(search.toLowerCase())
  );

  function handleAddClick() {
    if (!currentUser) {
      toast.error("Please sign in to add a product.");
      return;
    }
    setAddOpen(true);
  }

  function handleOrderClick(product) {
    if (!currentUser) {
      toast.error("Please sign in to place an order.");
      return;
    }
    setOrderTarget(product);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* ── Page header ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1
            className="text-3xl font-extrabold"
            style={{ color: "oklch(0.96 0.005 286)" }}
          >
            Products
          </h1>
          <p className="text-sm mt-1" style={{ color: "oklch(0.58 0.005 286)" }}>
            {loading ? "Loading…" : `${products.length} product${products.length !== 1 ? "s" : ""} available`}
          </p>
        </div>

        <div className="flex gap-3">

            <Button
            id="add-product-btn"
            onPress={handleAddClick}
            style={{
              background: "linear-gradient(135deg, oklch(0.585 0.233 293.2), oklch(0.52 0.26 270))",
              color: "white",
              borderRadius: "12px",
              fontWeight: 600,
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
   Add product
          </Button>

        </div>
      </div>

      {/* ── Search bar ──────────────────────────────────────────────── */}
      <div className="mb-6">
        <div className="relative max-w-sm">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "oklch(0.5 0.005 286)", pointerEvents: "none" }}
          >
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            id="product-search"
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2"
            style={{
              background: "oklch(0.21 0.006 286)",
              borderColor: "oklch(0.3 0.006 286)",
              color: "oklch(0.92 0.005 286)",
            }}
          />
        </div>
      </div>

      {/* ── Error ───────────────────────────────────────────────────── */}
      {error && <ErrorBanner message={error} onRetry={load} />}

      {/* ── Loading skeletons ────────────────────────────────────────── */}
      {loading && <ProductCardSkeleton count={6} />}

      {/* ── Products grid ─────────────────────────────────────────── */}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              animationIdx={i % 6}
              onOrder={() => handleOrderClick(product)}
            />
          ))}
        </div>
      )}

      {/* ── Empty state ──────────────────────────────────────────────── */}
      {!loading && !error && filtered.length === 0 && (
        <EmptyState
          icon={
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          }
          title={search ? "No products match your search" : "No products yet"}
          description={
            search
              ? "Try a different search term."
              : "Be the first to add a product to StockPile."
          }
          action={
            !search && (
              <Button
                onPress={handleAddClick}
                style={{
                  background: "linear-gradient(135deg, oklch(0.585 0.233 293.2), oklch(0.52 0.26 270))",
                  color: "white",
                  borderRadius: "12px",
                  fontWeight: 600,
                }}
              >
                Add First Product
              </Button>
            )
          }
        />
      )}

      {/* ── Modals ───────────────────────────────────────────────────── */}
      <OrderModal
        product={orderTarget}
        userId={currentUser?.id}
        isOpen={Boolean(orderTarget)}
        onClose={() => setOrderTarget(null)}
        onSuccess={load}
      />

      <ProductFormModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onSuccess={load}
        userId={currentUser?.id}
        product={null}
      />
    </div>
  );
}
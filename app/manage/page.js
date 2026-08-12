"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@heroui/react";
import { toast } from "sonner";
import { getUserProducts, deleteProduct } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { ProductCard } from "@/components/ProductCard";
import { ProductFormModal } from "@/components/ProductFormModal";
import { ProductCardSkeleton } from "@/components/LoadingSkeleton";
import { EmptyState, ErrorBanner } from "@/components/EmptyState";

export default function ManagePage() {
  const { data: session } = authClient.useSession();
  const currentUser = session?.user;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Edit modal state
  const [editTarget, setEditTarget] = useState(null); // Product | null
  // Add modal
  const [addOpen, setAddOpen] = useState(false);
  // Tracking which product is being deleted
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async () => {
    if (!currentUser?.id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getUserProducts(currentUser.id);
      setProducts(data);
    } catch (err) {
      setError(err.message || "Failed to load your products.");
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(product) {
    if (!window.confirm(`Delete "${product.title}"? This cannot be undone.`)) return;
    setDeletingId(product.id);
    try {
      await deleteProduct(product.id, currentUser.id);
      toast.success(`"${product.title}" deleted.`);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    } catch (err) {
      toast.error(err.message || "Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  }

  // Stats
  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const avgPrice =
    products.length > 0
      ? products.reduce((s, p) => s + Number(p.price), 0) / products.length
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* ── Page header ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <h1
            className="text-3xl font-extrabold"
            style={{ color: "oklch(0.96 0.005 286)" }}
          >
            Manage Products
          </h1>
          <p className="text-sm mt-1" style={{ color: "oklch(0.58 0.005 286)" }}>
            {currentUser
              ? `Products owned by ${currentUser.name}`
              : "Sign in to manage your products"}
          </p>
        </div>

        <Button
          id="add-product-manage-btn"
          onPress={() => setAddOpen(true)}
          isDisabled={!currentUser}
          style={{
            background: "linear-gradient(135deg, oklch(0.585 0.233 293.2), oklch(0.52 0.26 270))",
            color: "white",
            borderRadius: "12px",
            fontWeight: 600,
            opacity: currentUser ? 1 : 0.5,
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Product
        </Button>
      </div>

      {/* ── Stats strip ──────────────────────────────────────────────── */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-8 animate-fade-in">
          {[
            { label: "My Products", value: products.length, suffix: "" },
            { label: "Total Stock", value: totalStock, suffix: " units" },
            { label: "Avg. Price", value: `$${avgPrice.toFixed(2)}`, suffix: "" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border px-4 py-3 flex flex-col gap-0.5"
              style={{
                background: "oklch(0.21 0.006 286)",
                borderColor: "oklch(0.28 0.006 286)",
              }}
            >
              <p className="text-xs" style={{ color: "oklch(0.58 0.005 286)" }}>
                {stat.label}
              </p>
              <p className="text-xl font-bold" style={{ color: "oklch(0.72 0.18 293)" }}>
                {stat.value}{stat.suffix}
              </p>
            </div>
          ))}
        </div>
      )}

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
          description="Sign in to your account to manage your products."
        />
      )}

      {/* ── Error ───────────────────────────────────────────────────── */}
      {error && <ErrorBanner message={error} onRetry={load} />}

      {/* ── Loading skeletons ────────────────────────────────────────── */}
      {loading && <ProductCardSkeleton count={6} />}

      {/* ── Products grid ─────────────────────────────────────────────── */}
      {!loading && !error && currentUser && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              animationIdx={i % 6}
              isOwn
              onEdit={() => setEditTarget(product)}
              onDelete={() => handleDelete(product)}
            />
          ))}
        </div>
      )}

      {/* ── Empty state ──────────────────────────────────────────────── */}
      {!loading && !error && currentUser && products.length === 0 && (
        <EmptyState
          icon={
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          }
          title="You have no products yet"
          description={`${currentUser.name} hasn't added any products. Create your first listing now!`}
          action={
            <Button
              onPress={() => setAddOpen(true)}
              style={{
                background: "linear-gradient(135deg, oklch(0.585 0.233 293.2), oklch(0.52 0.26 270))",
                color: "white",
                borderRadius: "12px",
                fontWeight: 600,
              }}
            >
              Create First Product
            </Button>
          }
        />
      )}

      {/* ── Modals ───────────────────────────────────────────────────── */}
      <ProductFormModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onSuccess={load}
        userId={currentUser?.id}
        product={null}
      />

      <ProductFormModal
        isOpen={Boolean(editTarget)}
        onClose={() => setEditTarget(null)}
        onSuccess={load}
        userId={currentUser?.id}
        product={editTarget}
      />
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { Modal, Button } from "@heroui/react";
import { toast } from "sonner";
import { createProduct, updateProduct } from "@/lib/api";

/**
 * Add / Edit product modal.
 *
 * Props:
 *  isOpen      — boolean
 *  onClose     — () => void
 *  onSuccess   — () => void  — refresh callback
 *  userId      — string  — current user ID (owner)
 *  product     — Product | null  — pass to pre-fill for Edit mode
 */
export function ProductFormModal({ isOpen, onClose, onSuccess, userId, product }) {
  const isEdit = Boolean(product);

  const emptyForm = { title: "", description: "", price: "", stock: "", imageUrl: "" };
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Pre-fill form when editing
  useEffect(() => {
    if (product) {
      setForm({
        title: product.title ?? "",
        description: product.description ?? "",
        price: String(product.price ?? ""),
        stock: String(product.stock ?? ""),
        imageUrl: product.imageUrl ?? "",
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [product, isOpen]);

  function field(name) {
    return {
      value: form[name],
      onChange: (e) => {
        setForm((f) => ({ ...f, [name]: e.target.value }));
        setErrors((err) => ({ ...err, [name]: undefined }));
      },
    };
  }

function validate() {
  const errs = {};
  if (!form.title.trim()) errs.title = "Title is required";
  if (!form.imageUrl.trim()) errs.imageUrl = "Image URL is required";  // NEW
  if (!form.price || isNaN(Number(form.price)) || Number(form.price) < 0)
    errs.price = "Enter a valid price";
  if (!form.stock || isNaN(Number(form.stock)) || Number(form.stock) < 0)
    errs.stock = "Enter a valid stock count";
  return errs;
}

  async function handleSubmit() {
    if (!userId) {
      toast.error("Please select an active user first.");
      return;
    }
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    const payload = {
      userId,
      title: form.title.trim(),
      description: form.description.trim() || null,
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10),
      imageUrl: form.imageUrl.trim(),
    };

    try {
      if (isEdit) {
        await updateProduct(product.id, payload);
        toast.success(`"${payload.title}" updated successfully! ✨`);
      } else {
        await createProduct(payload);
        toast.success(`"${payload.title}" added to your products! 🚀`);
      }
      onSuccess?.();
      handleClose();
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    if (!loading) {
      setForm(emptyForm);
      setErrors({});
      onClose();
    }
  }

  if (!isOpen) return null;

  return (
    <Modal.Root isOpen={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <Modal.Backdrop isDismissable={!loading}>
        <Modal.Container size="md">
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>{isEdit ? "Edit Product" : "Add New Product"}</Modal.Heading>
              <Modal.CloseTrigger />
            </Modal.Header>

            <Modal.Body className="flex flex-col gap-4 py-2">
              {/* Title */}
              <FormField
                id="product-title"
                label="Product Title"
                placeholder="e.g. Premium Wireless Headphones"
                required
                error={errors.title}
                {...field("title")}
              />

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="product-description"
                  className="text-sm font-medium"
                  style={{ color: "oklch(0.75 0.005 286)" }}
                >
                  Description <span style={{ color: "oklch(0.5 0.005 286)" }}>(optional)</span>
                </label>
                <textarea
                  id="product-description"
                  rows={3}
                  placeholder="Short description of your product..."
                  className="w-full px-3 py-2.5 rounded-xl border text-sm resize-none focus:outline-none focus:ring-2"
                  style={{
                    background: "oklch(0.19 0.006 286)",
                    borderColor: "oklch(0.3 0.006 286)",
                    color: "oklch(0.92 0.005 286)",
                  }}
                  {...field("description")}
                />
              </div>

              {/* Image URL */}
<FormField
  id="product-image-url"
  label="Image URL"
  placeholder="https://example.com/image.jpg"
  type="url"
  required
  error={errors.imageUrl}
  {...field("imageUrl")}
/>

              {/* Price + Stock row */}
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  id="product-price"
                  label="Price ($)"
                  placeholder="0.00"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  error={errors.price}
                  prefix="$"
                  {...field("price")}
                />
                <FormField
                  id="product-stock"
                  label="Stock Quantity"
                  placeholder="0"
                  type="number"
                  min="0"
                  step="1"
                  required
                  error={errors.stock}
                  {...field("stock")}
                />
              </div>
            </Modal.Body>

            <Modal.Footer className="gap-3">
              <Button
                id="cancel-product-btn"
                variant="ghost"
                onPress={handleClose}
                isDisabled={loading}
                style={{ borderRadius: "12px", color: "oklch(0.65 0.005 286)" }}
              >
                Cancel
              </Button>
              <Button
                id="submit-product-btn"
                onPress={handleSubmit}
                isLoading={loading}
                style={{
                  background: "linear-gradient(135deg, oklch(0.585 0.233 293.2), oklch(0.52 0.26 270))",
                  color: "white",
                  borderRadius: "12px",
                  fontWeight: 600,
                }}
              >
                {loading ? (isEdit ? "Saving…" : "Adding…") : isEdit ? "Save Changes" : "Add Product"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal.Root>
  );
}

/* ── Shared form field ─────────────────────────────────────────────────────── */
function FormField({ id, label, error, required, prefix, ...inputProps }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium"
        style={{ color: "oklch(0.75 0.005 286)" }}
      >
        {label}
        {required && <span style={{ color: "oklch(0.7 0.12 24)" }}> *</span>}
      </label>
      <div className="relative">
        {prefix && (
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
            style={{ color: "oklch(0.58 0.005 286)" }}
          >
            {prefix}
          </span>
        )}
        <input
          id={id}
          className="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2"
          style={{
            paddingLeft: prefix ? "1.75rem" : undefined,
            background: "oklch(0.19 0.006 286)",
            borderColor: error ? "oklch(0.594 0.1967 24.63 / 0.7)" : "oklch(0.3 0.006 286)",
            color: "oklch(0.92 0.005 286)",
          }}
          {...inputProps}
        />
      </div>
      {error && (
        <p className="text-xs" style={{ color: "oklch(0.7 0.12 24)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
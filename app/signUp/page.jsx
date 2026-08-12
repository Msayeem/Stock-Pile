"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { toast } from "sonner";
import { authClient } from "../lib/auth-client";
import Link from "next/link";


const SignUp = () => {
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.password || form.password.length < 8)
      errs.password = "Password must be at least 8 characters";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      if (error) {
        toast.error(error.message || "Sign up failed.");
        return;
      }

      toast.success("Account created! Welcome to StockPile 🚀");
      router.push("/products");
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "oklch(0.15 0.006 286)" }}
    >
      <div
        className="w-full max-w-md rounded-2xl border p-8 flex flex-col gap-6 animate-fade-in"
        style={{
          background: "oklch(0.21 0.006 286)",
          borderColor: "oklch(0.28 0.006 286)",
        }}
      >
        {/* Header */}
        <div className="flex flex-col gap-1.5 text-center">
          <h1
            className="text-2xl font-bold"
            style={{ color: "oklch(0.94 0.005 286)" }}
          >
            Create your account
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.58 0.005 286)" }}>
            Join StockPile to start managing products and orders
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField
            id="signup-name"
            label="Full Name"
            placeholder="John Doe"
            required
            error={errors.name}
            {...field("name")}
          />

          <FormField
            id="signup-email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            required
            error={errors.email}
            {...field("email")}
          />

          <FormField
            id="signup-password"
            label="Password"
            type="password"
            placeholder="At least 8 characters"
            required
            error={errors.password}
            {...field("password")}
          />

          <Button
            id="signup-submit-btn"
            type="submit"
            isLoading={loading}
            className="mt-2 font-semibold w-full"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.585 0.233 293.2), oklch(0.52 0.26 270))",
              color: "white",
              borderRadius: "12px",
              padding: "0.65rem 1rem",
            }}
          >
            {loading ? "Creating account…" : "Sign Up"}
          </Button>
        </form>

        {/* Footer link */}
        <p
          className="text-sm text-center text-gray-300"
      
        >
       Already have an account ? <Link className="text-blue-500 underline" href={'/login'}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

/* ── Shared form field ─────────────────────────────────────────────── */
function FormField({ id, label, error, required, ...inputProps }) {
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
      <input
        id={id}
        className="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2"
        style={{
          background: "oklch(0.19 0.006 286)",
          borderColor: error
            ? "oklch(0.594 0.1967 24.63 / 0.7)"
            : "oklch(0.3 0.006 286)",
          color: "oklch(0.92 0.005 286)",
        }}
        {...inputProps}
      />
      {error && (
        <p className="text-xs" style={{ color: "oklch(0.7 0.12 24)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default SignUp;
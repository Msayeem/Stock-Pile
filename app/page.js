import Link from "next/link";

export const metadata = {
  title: "Home",
  description: "StockPile — manage your products and orders in one beautiful, fast interface.",
};

const NAV_CARDS = [
  {
    href: "/products",
    label: "Products",
    description: "Browse all available products and place orders instantly.",
    gradient: "linear-gradient(135deg, oklch(0.585 0.233 293.2), oklch(0.52 0.26 270))",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
    stat: "All Products",
    cta: "Browse Products →",
  },
  {
    href: "/orders",
    label: "My Orders",
    description: "View, track, and manage all your placed orders in one place.",
    gradient: "linear-gradient(135deg, oklch(0.65 0.18 155), oklch(0.55 0.2 170))",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    stat: "Your Orders",
    cta: "View Orders →",
  },
  {
    href: "/manage",
    label: "Manage Products",
    description: "Add, edit, and delete the products you own. Full control over your inventory.",
    gradient: "linear-gradient(135deg, oklch(0.72 0.16 50), oklch(0.62 0.18 30))",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
    stat: "Your Products",
    cta: "Manage Products →",
  },
];

const FEATURES = [
  {
    title: "Real-time Inventory",
    desc: "Track stock levels live. Low-stock warnings keep you ahead of supply issues.",
    icon: "📦",
  },
  {
    title: "Instant Ordering",
    desc: "Place orders in two clicks with a clean quantity picker and instant confirmation.",
    icon: "⚡",
  },
  {
    title: "Full Product Control",
    desc: "Add, edit and delete your own products. Descriptions, pricing, and stock all in one form.",
    icon: "🎛️",
  },
  {
    title: "Order History",
    desc: "A clean order table shows what you bought, when, and how much you spent.",
    icon: "🗂️",
  },
];

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* ── Hero Section ──────────────────────────────────────────────── */}
      <section className="text-center mb-16 animate-fade-in">
        {/* Logo mark */}
        <div className="flex justify-center mb-6">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl"
            style={{
              background: "linear-gradient(135deg, oklch(0.585 0.233 293.2), oklch(0.52 0.26 270))",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="21 8 21 21 3 21 3 8"/>
              <rect x="1" y="3" width="22" height="5"/>
              <line x1="10" y1="12" x2="14" y2="12"/>
            </svg>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
          <span style={{ color: "oklch(0.96 0.005 286)" }}>Manage your</span>{" "}
          <span
            style={{
              background: "linear-gradient(135deg, oklch(0.72 0.18 293), oklch(0.65 0.22 260))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            inventory & orders
          </span>
        </h1>
        <p
          className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8"
          style={{ color: "oklch(0.62 0.005 286)" }}
        >
          StockPile is a clean, fast product and order management platform.
          Browse products, place orders, and manage your listings — all from one place.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:shadow-xl"
            style={{
              background: "linear-gradient(135deg, oklch(0.585 0.233 293.2), oklch(0.52 0.26 270))",
            }}
          >
            Browse Products
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
          <Link
            href="/manage"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-200 hover:scale-[1.02] border"
            style={{
              color: "oklch(0.72 0.18 293)",
              borderColor: "oklch(0.585 0.233 293.2 / 0.35)",
              background: "oklch(0.585 0.233 293.2 / 0.07)",
            }}
          >
            Manage My Products
          </Link>
        </div>
      </section>

      {/* ── Navigation Cards ─────────────────────────────────────────── */}
      <section className="mb-16">
        <h2
          className="text-xl font-bold mb-6"
          style={{ color: "oklch(0.94 0.005 286)" }}
        >
          Quick Access
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {NAV_CARDS.map((card, i) => (
            <Link
              key={card.href}
              href={card.href}
              id={`home-nav-${card.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={`group rounded-2xl border p-6 flex flex-col gap-4 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 animate-fade-in stagger-${i + 1}`}
              style={{
                background: "oklch(0.21 0.006 286)",
                borderColor: "oklch(0.28 0.006 286)",
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110"
                style={{ background: card.gradient }}
              >
                {card.icon}
              </div>

              {/* Text */}
              <div>
                <p className="font-bold text-base mb-1" style={{ color: "oklch(0.94 0.005 286)" }}>
                  {card.label}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(0.58 0.005 286)" }}>
                  {card.description}
                </p>
              </div>

              {/* CTA link text */}
              <p
                className="text-sm font-semibold mt-auto transition-all duration-200 group-hover:translate-x-1"
                style={{ color: "oklch(0.72 0.18 293)" }}
              >
                {card.cta}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Features Grid ─────────────────────────────────────────────── */}
      <section className="mb-8">
        <h2
          className="text-xl font-bold mb-6"
          style={{ color: "oklch(0.94 0.005 286)" }}
        >
          Everything you need
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`flex gap-4 p-5 rounded-2xl border animate-fade-in stagger-${i + 1}`}
              style={{
                background: "oklch(0.19 0.006 286 / 0.7)",
                borderColor: "oklch(0.27 0.006 286)",
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: "oklch(0.585 0.233 293.2 / 0.1)" }}
              >
                {f.icon}
              </div>
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: "oklch(0.92 0.005 286)" }}>
                  {f.title}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "oklch(0.58 0.005 286)" }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

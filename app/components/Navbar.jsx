"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownPopover,
  DropdownMenu,
  DropdownItem,
  Spinner,
  Button,
} from "@heroui/react";
import { authClient } from "../lib/auth-client";

const NAV_LINKS = [
  {
    href: "/",
    label: "Home",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    href: "/products",
    label: "Products",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
  },
  {
    href: "/orders",
    label: "My Orders",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
  {
    href: "/manage",
    label: "Manage",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
  },
];

function UserAvatar({ user }) {
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0"
      style={{
        background: "linear-gradient(135deg, oklch(0.585 0.233 293.2), oklch(0.52 0.26 270))",
      }}
    >
      {user?.avatar ? (
        <img src={user.avatar} alt={user?.name} className="w-full h-full object-cover rounded-full" />
      ) : (
        initials
      )}
    </div>
  );
}

export function AppNavbar() {

  const router=useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user=session?.user;

  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

   const handleSignout=()=>{
    authClient.signOut(); 
    router.push('/login');
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          background: "oklch(0.15 0.006 286 / 0.92)",
          borderColor: "oklch(0.28 0.006 286 / 0.7)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* ── Brand ──────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, oklch(0.585 0.233 293.2), oklch(0.52 0.26 270))",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="21 8 21 21 3 21 3 8"/>
                <rect x="1" y="3" width="22" height="5"/>
                <line x1="10" y1="12" x2="14" y2="12"/>
              </svg>
            </div>
            <span className="text-lg font-bold" style={{ color: "oklch(0.96 0.005 286)" }}>
              Stock<span style={{ color: "oklch(0.72 0.18 293)" }}>Pile</span>
            </span>
          </Link>

          {/* ── Desktop Nav Links ─────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  color: isActive(link.href)
                    ? "oklch(0.72 0.18 293)"
                    : "oklch(0.7 0.005 286)",
                  background: isActive(link.href)
                    ? "oklch(0.585 0.233 293.2 / 0.12)"
                    : "transparent",
                }}
              >
                <span style={{ opacity: isActive(link.href) ? 1 : 0.7 }}>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Right side ───────────────────────────────────────── */}
          <div className="flex items-center gap-3">
    
{
  user ? <div className="flex flex-col items-center"><p className="text-[13px]">{user?.name}</p>
  <button onClick={handleSignout} className="hover:animate-pulse cursor-pointer text-[14px] border border-purple-600 px-4 py-1 rounded-2xl">Log Out</button>
  </div>
  :
              <Link className="bg-purple-800 px-5 py-1.5 rounded-2xl hover:animate-pulse" href={'/login'}>Login</Link>

}
            {/* Mobile toggle */}
            <button
              id="mobile-menu-toggle"
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: "oklch(0.7 0.005 286)" }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile Nav Menu ─────────────────────────────────────────── */}
        {mobileOpen && (
          <div
            className="md:hidden border-t px-4 py-3 flex flex-col gap-1"
            style={{
              background: "oklch(0.15 0.006 286 / 0.98)",
              borderColor: "oklch(0.28 0.006 286 / 0.5)",
            }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  color: isActive(link.href) ? "oklch(0.72 0.18 293)" : "oklch(0.7 0.005 286)",
                  background: isActive(link.href) ? "oklch(0.585 0.233 293.2 / 0.12)" : "transparent",
                }}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  );
}

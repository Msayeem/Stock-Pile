"use client";

/**
 * Reusable empty-state display with icon, message, and optional CTA.
 */
export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-in">
      {/* Icon */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: "oklch(0.585 0.233 293.2 / 0.1)" }}
      >
        <span style={{ color: "oklch(0.72 0.18 293)", fontSize: 28 }}>{icon}</span>
      </div>

      {/* Text */}
      <h3
        className="text-lg font-semibold mb-2"
        style={{ color: "oklch(0.92 0.005 286)" }}
      >
        {title}
      </h3>
      {description && (
        <p
          className="text-sm max-w-xs leading-relaxed mb-6"
          style={{ color: "oklch(0.58 0.005 286)" }}
        >
          {description}
        </p>
      )}

      {/* CTA */}
      {action && action}
    </div>
  );
}

/**
 * Inline error banner.
 */
export function ErrorBanner({ message, onRetry }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl border mb-6"
      style={{
        background: "oklch(0.594 0.1967 24.63 / 0.1)",
        borderColor: "oklch(0.594 0.1967 24.63 / 0.3)",
        color: "oklch(0.78 0.12 24)",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <span className="text-sm flex-1">{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs font-medium underline underline-offset-2"
          style={{ color: "oklch(0.78 0.12 24)" }}
        >
          Retry
        </button>
      )}
    </div>
  );
}

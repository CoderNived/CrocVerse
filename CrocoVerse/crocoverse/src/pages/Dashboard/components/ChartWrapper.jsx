import PropTypes from "prop-types";
import { memo } from "react";

function ChartWrapper({
  title,
  subtitle,
  children,
  action,
  loading = false,
  empty = false,
  error = null,
  emptyMessage = "No data available",
  minHeight = 220,
  className = "",
}) {
  const showContent = !loading && !empty && !error;

  return (
    <section
      className={`bg-white border border-gray-100 rounded-2xl p-4 w-full shadow-sm transition ${className}`}
      role="region"
      aria-label={title}
      aria-busy={loading}
    >
      {/* ================= HEADER ================= */}
      <header className="flex items-start justify-between mb-4 gap-4">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-gray-900 truncate">
            {title}
          </h2>

          {subtitle && (
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              {subtitle}
            </p>
          )}
        </div>

        {action && (
          <div className="shrink-0 flex items-center">
            {action}
          </div>
        )}
      </header>

      {/* ================= CONTENT ================= */}
      <div
        className="relative flex items-center justify-center"
        style={{ minHeight }}
      >
        {/* Loading */}
        {loading && <LoadingSkeleton />}

        {/* Error */}
        {!loading && error && (
          <ErrorState message={error} />
        )}

        {/* Empty */}
        {!loading && !error && empty && (
          <EmptyState message={emptyMessage} />
        )}

        {/* Actual Content */}
        {showContent && (
          <div className="w-full h-full animate-fadeIn">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}


// ==============================
// 🔄 Loading Skeleton (Improved)
// ==============================

const LoadingSkeleton = memo(function LoadingSkeleton() {
  return (
    <div
      className="w-full h-full flex flex-col justify-center gap-3 px-2"
      aria-label="Loading chart"
    >
      {/* Simulated bars/lines */}
      <div className="flex items-end gap-2 h-28">
        {[40, 70, 55, 80, 60].map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-gray-100 rounded animate-pulse"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>

      {/* axis lines */}
      <div className="h-2 bg-gray-100 rounded w-full animate-pulse" />
      <div className="h-2 bg-gray-100 rounded w-2/3 animate-pulse" />
    </div>
  );
});


// ==============================
// 📭 Empty State (Improved)
// ==============================

function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-400 text-center px-4">
      <ChartIcon />

      <p className="text-sm">{message}</p>
    </div>
  );
}


// ==============================
// ❌ Error State (NEW)
// ==============================

function ErrorState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-red-400 text-center px-4">
      <ErrorIcon />

      <p className="text-sm font-medium">
        {message || "Something went wrong"}
      </p>
    </div>
  );
}


// ==============================
// 🎨 Icons (Reusable)
// ==============================

function ChartIcon() {
  return (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}


// ==============================
// ✅ PropTypes
// ==============================

ChartWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  action: PropTypes.node,

  loading: PropTypes.bool,
  empty: PropTypes.bool,
  error: PropTypes.string,

  emptyMessage: PropTypes.string,
  minHeight: PropTypes.number,
  className: PropTypes.string,
};

export default memo(ChartWrapper);
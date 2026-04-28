import PropTypes from "prop-types";
import { memo } from "react";


// ==============================
// 📈 TREND CONFIG
// ==============================

const TREND_CONFIG = {
  up: {
    arrow: "↑",
    className: "text-green-600 bg-green-50",
    ariaLabel: "increased",
  },
  down: {
    arrow: "↓",
    className: "text-red-500 bg-red-50",
    ariaLabel: "decreased",
  },
  neutral: {
    arrow: "→",
    className: "text-gray-500 bg-gray-100",
    ariaLabel: "no change",
  },
};


// ==============================
// 🔢 VALUE FORMATTER
// ==============================

function formatValue(value) {
  if (value === null || value === undefined) return null;

  if (typeof value === "number") {
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";
    if (value >= 1_000) return (value / 1_000).toFixed(1) + "K";
    return value.toString();
  }

  return value;
}


// ==============================
// 🧩 COMPONENT
// ==============================

function KPICard({
  icon,
  label,
  value,
  unit,
  trend,
  trendDirection,
  loading = false,
  className = "",
}) {

  const trendConfig = TREND_CONFIG[trendDirection];
  const formattedValue = formatValue(value);

  // Accessible summary
  const ariaLabel = [
    label,
    formattedValue ? `${formattedValue}${unit ? ` ${unit}` : ""}` : "No data",
    trendConfig && trend
      ? `Trend ${trendConfig.ariaLabel} by ${trend}`
      : null,
  ]
    .filter(Boolean)
    .join(". ");


  return (
    <article
      className={`bg-white border border-gray-100 rounded-2xl p-4 w-full flex flex-col justify-between shadow-sm transition hover:shadow-md ${className}`}
      aria-label={ariaLabel}
    >

      {/* ================= HEADER ================= */}
      <div className="flex items-start justify-between gap-2">

        {/* Icon */}
        <div
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 shrink-0"
          aria-hidden="true"
        >
          {icon || <DefaultIcon />}
        </div>

        {/* Trend Badge */}
        {trendConfig && trend && !loading ? (
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full shrink-0 ${trendConfig.className}`}
            aria-hidden="true"
          >
            <span>{trendConfig.arrow}</span>
            <span>{trend}</span>
          </span>
        ) : (
          <span className="h-6" aria-hidden="true" />
        )}
      </div>


      {/* ================= VALUE ================= */}
      <div className="mt-4">

        {loading ? (
          <div className="h-7 w-20 bg-gray-100 rounded animate-pulse" />
        ) : formattedValue ? (
          <p
            className="text-2xl font-semibold text-gray-900 leading-none"
            aria-hidden="true"
          >
            {formattedValue}
            {unit && (
              <span className="text-sm font-normal text-gray-400 ml-1">
                {unit}
              </span>
            )}
          </p>
        ) : (
          <p
            className="text-2xl font-semibold text-gray-300 leading-none"
            aria-hidden="true"
          >
            —
          </p>
        )}

      </div>


      {/* ================= LABEL ================= */}
      <p
        className="text-xs text-gray-400 mt-1.5 truncate"
        title={label}
        aria-hidden="true"
      >
        {label}
      </p>

    </article>
  );
}


// ==============================
// 🎨 DEFAULT ICON
// ==============================

function DefaultIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="M4 19V5M4 19h16M4 19l5-6 4 4 5-8" />
    </svg>
  );
}


// ==============================
// ✅ PROPTYPES
// ==============================

KPICard.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,

  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),

  unit: PropTypes.string,

  trend: PropTypes.string,
  trendDirection: PropTypes.oneOf(["up", "down", "neutral"]),

  loading: PropTypes.bool,
  className: PropTypes.string,
};


export default memo(KPICard);
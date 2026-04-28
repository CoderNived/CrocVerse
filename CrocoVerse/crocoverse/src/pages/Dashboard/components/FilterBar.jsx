import PropTypes from "prop-types";
import { memo } from "react";

function FilterBar({
  filters,
  onChange,
  onReset,
  options = {},
  className = "",
}) {

  const {
    continents = [],
    conservationStatuses = [],
    habitats = [],
  } = options;

  const handleChange = (key) => (e) => {
    onChange(key, e.target.value);
  };

  return (
    <div
      className={`flex flex-wrap items-center gap-3 ${className}`}
      role="group"
      aria-label="Dashboard filters"
    >

      {/* ================= CONTINENT ================= */}
      <Select
        label="Continent"
        value={filters.continent}
        onChange={handleChange("continent")}
        options={["All", ...continents]}
      />

      {/* ================= CONSERVATION ================= */}
      <Select
        label="Status"
        value={filters.conservation}
        onChange={handleChange("conservation")}
        options={["All", ...conservationStatuses]}
      />

      {/* ================= HABITAT ================= */}
      <Select
        label="Habitat"
        value={filters.habitat}
        onChange={handleChange("habitat")}
        options={["All", ...habitats]}
      />

      {/* ================= RESET ================= */}
      <button
        onClick={onReset}
        className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-100 transition"
      >
        Reset
      </button>

    </div>
  );
}


// ==============================
// 🔽 Reusable Select Component
// ==============================

function Select({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col text-xs text-gray-500">
      {label}
      <select
        value={value}
        onChange={onChange}
        className="mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}


// ==============================
// ✅ PropTypes
// ==============================

FilterBar.propTypes = {
  filters: PropTypes.shape({
    continent: PropTypes.string,
    conservation: PropTypes.string,
    habitat: PropTypes.string,
  }).isRequired,

  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,

  options: PropTypes.shape({
    continents: PropTypes.arrayOf(PropTypes.string),
    conservationStatuses: PropTypes.arrayOf(PropTypes.string),
    habitats: PropTypes.arrayOf(PropTypes.string),
  }),

  className: PropTypes.string,
};

export default memo(FilterBar);
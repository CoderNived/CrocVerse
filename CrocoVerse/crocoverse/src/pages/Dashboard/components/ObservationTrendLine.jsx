import { useState, useMemo, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import PropTypes from "prop-types";

import ChartWrapper from "./ChartWrapper";


// ==============================
// 🎨 COLOR SYSTEM (STABLE)
// ==============================

const COLORS = [
  "#16a34a",
  "#2563eb",
  "#dc2626",
  "#d97706",
  "#7c3aed",
];

const OVERALL_COLOR = "#94a3b8";


// ==============================
// 🧠 DATA TRANSFORM
// ==============================

function buildTrendData(data = [], selected = []) {
  const yearMap = {};

  data.forEach((species) => {
    species.observationsByYear?.forEach(({ year, count }) => {
      if (!yearMap[year]) yearMap[year] = { year };

      if (selected.includes(species.commonName)) {
        yearMap[year][species.commonName] = count;
      }

      // overall aggregation
      if (!yearMap[year].overall) yearMap[year].overall = 0;
      yearMap[year].overall += count;
    });
  });

  return Object.values(yearMap).sort((a, b) => a.year - b.year);
}


// ==============================
// 💬 TOOLTIP
// ==============================

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-sm text-sm">
      <p className="font-medium text-gray-900">{label}</p>

      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex justify-between gap-4 text-gray-500">
          <span>{entry.name}</span>
          <span className="font-medium text-gray-900">
            {entry.value ?? "—"}
          </span>
        </div>
      ))}
    </div>
  );
}


// ==============================
// 🧩 COMPONENT
// ==============================

export default function ObservationTrendChart({
  data = [],
  loading = false,
  error = null,
}) {

  // ==============================
  // 🎯 STATE (START SIMPLE)
  // ==============================

  const speciesList = useMemo(
    () => data.map((s) => s.commonName),
    [data]
  );

  const [selected, setSelected] = useState(
    speciesList.slice(0, 1) // 🔥 start with ONE species
  );


  // ==============================
  // 🔁 TOGGLE
  // ==============================

  const toggleSpecies = useCallback((name) => {
    setSelected((prev) =>
      prev.includes(name)
        ? prev.length > 1
          ? prev.filter((s) => s !== name)
          : prev
        : [...prev, name]
    );
  }, []);


  // ==============================
  // 📊 DATA
  // ==============================

  const chartData = useMemo(
    () => buildTrendData(data, selected),
    [data, selected]
  );

  const isEmpty = !chartData.length;


  // ==============================
  // 🎨 COLOR MAP (STABLE)
  // ==============================

  const colorMap = useMemo(() => {
    const map = {};
    speciesList.forEach((name, i) => {
      map[name] = COLORS[i % COLORS.length];
    });
    return map;
  }, [speciesList]);


  // ==============================
  // 🎨 UI
  // ==============================

  return (
    <ChartWrapper
      title="Observation Trends"
      subtitle="Species observations over time"
      loading={loading}
      error={error}
      empty={isEmpty}
      minHeight={340}
    >
      <div className="w-full">

        {/* ================= FILTERS ================= */}
        <div className="flex flex-wrap gap-2 mb-4">
          {speciesList.slice(0, 5).map((name) => {
            const active = selected.includes(name);

            return (
              <button
                key={name}
                onClick={() => toggleSpecies(name)}
                className={`px-3 py-1 text-xs rounded-full border transition ${
                  active
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {name.split(" ").slice(0, 2).join(" ")}
              </button>
            );
          })}
        </div>


        {/* ================= CHART ================= */}
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="year" />
              <YAxis />

              <Tooltip content={<CustomTooltip />} />

              {/* Species Lines */}
              {selected.map((name) => (
                <Line
                  key={name}
                  type="monotone"
                  dataKey={name}
                  stroke={colorMap[name]}
                  strokeWidth={2}
                  dot={false}
                />
              ))}

              {/* Overall Trend */}
              <Line
                type="monotone"
                dataKey="overall"
                stroke={OVERALL_COLOR}
                strokeDasharray="5 5"
                strokeWidth={1.5}
                dot={false}
              />

            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </ChartWrapper>
  );
}


// ==============================
// ✅ PROPTYPES
// ==============================

ObservationTrendChart.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

// Done building the ObservationTrendChart component, which displays the trends of species observations over time. The component includes a custom tooltip for better data presentation and allows users to toggle the visibility of individual species lines. An overall trend line is also included for context. The component handles loading, error, and empty states gracefully using the ChartWrapper.
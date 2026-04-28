import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";

import ChartWrapper from "./ChartWrapper";


// ==============================
// 🎨 COLOR SYSTEM (IUCN)
// ==============================

const IUCN_COLORS = {
  "Least Concern": "#16a34a",
  "Near Threatened": "#65a30d",
  "Vulnerable": "#ca8a04",
  "Endangered": "#ea580c",
  "Critically Endangered": "#dc2626",
  "Data Deficient": "#6b7280",
};

const FALLBACK_COLORS = [
  "#22c55e",
  "#eab308",
  "#f97316",
  "#ef4444",
  "#6b7280",
];

const getColor = (name, index) =>
  IUCN_COLORS[name] ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length];


// ==============================
// 🧠 DATA TRANSFORM
// ==============================

function buildConservationData(data = []) {
  const map = {};

  data.forEach((s) => {
    if (!map[s.conservation]) map[s.conservation] = 0;
    map[s.conservation]++;
  });

  return Object.entries(map).map(([status, count]) => ({
    name: status,
    value: count,
  }));
}


// ==============================
// 🎯 CENTER LABEL
// ==============================

const CenterLabel = ({ cx, cy, total }) => (
  <>
    <text
      x={cx}
      y={cy - 6}
      textAnchor="middle"
      dominantBaseline="middle"
      className="fill-gray-900"
      style={{ fontSize: 24, fontWeight: 600 }}
    >
      {total}
    </text>
    <text
      x={cx}
      y={cy + 14}
      textAnchor="middle"
      dominantBaseline="middle"
      className="fill-gray-400"
      style={{ fontSize: 12 }}
    >
      species
    </text>
  </>
);


// ==============================
// 💬 TOOLTIP
// ==============================

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const { name, value, percent } = payload[0];

  return (
    <div className="bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-sm text-sm">
      <p className="font-medium text-gray-900">{name}</p>
      <p className="text-gray-500">
        {value} species{" "}
        <span className="text-gray-400">
          ({(percent * 100).toFixed(1)}%)
        </span>
      </p>
    </div>
  );
}


// ==============================
// 🧩 COMPONENT
// ==============================

export default function ConservationDonutChart({
  data = [],
  loading = false,
  error = null,
}) {

  // Transform → chart format
  const chartData = useMemo(() => buildConservationData(data), [data]);

  const total = useMemo(
    () => chartData.reduce((sum, d) => sum + d.value, 0),
    [chartData]
  );

  const isEmpty = !chartData.length;


  return (
    <ChartWrapper
      title="Conservation Status"
      subtitle="Species distribution by IUCN category"
      loading={loading}
      error={error}
      empty={isEmpty}
      minHeight={320}
    >
      <div
        className="w-full h-[260px]"
        role="img"
        aria-label={`Donut chart showing ${total} species across conservation categories`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={2}
            >
              {chartData.map((entry, i) => (
                <Cell
                  key={entry.name}
                  fill={getColor(entry.name, i)}
                />
              ))}

              {/* ✅ Correct Center Label */}
              <CenterLabel total={total} />

            </Pie>

            <Tooltip content={<CustomTooltip />} />

          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartWrapper>
  );
}


// ==============================
// ✅ PROPTYPES
// ==============================

ConservationDonutChart.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
};
import { useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  CartesianGrid,
} from "recharts";
import PropTypes from "prop-types";

import ChartWrapper from "./ChartWrapper";


// ==============================
// 🎨 STATUS COLOR MAP
// ==============================

const STATUS_COLOR = {
  "Least Concern": "#22c55e",
  "Vulnerable": "#eab308",
  "Endangered": "#f97316",
  "Critically Endangered": "#ef4444",
  "Data Deficient": "#94a3b8",
};


// ==============================
// 🧠 DATA TRANSFORM
// ==============================

function buildScatterData(data = []) {
  return data.map((s) => ({
    x: s.avgLength,              // meters
    y: s.avgWeight,              // kg
    z: Math.max(10, Math.sqrt(s.population || 0)), // better scaling
    name: s.commonName,
    status: s.conservation,
    population: s.population,
  }));
}


// ==============================
// 💬 TOOLTIP (IMPROVED)
// ==============================

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const d = payload[0].payload;

  return (
    <div className="bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-sm text-sm">
      <p className="font-medium text-gray-900">{d.name}</p>

      <div className="text-gray-500 mt-1 space-y-0.5">
        <p>Length: {d.x.toFixed(2)} m</p>
        <p>Weight: {d.y.toLocaleString()} kg</p>
        <p>Population: {d.population?.toLocaleString() ?? "—"}</p>
        <p>Status: {d.status}</p>
      </div>
    </div>
  );
}


// ==============================
// 🎯 CUSTOM DOT
// ==============================

function CustomDot({ cx, cy, payload }) {
  const color = STATUS_COLOR[payload.status] || "#94a3b8";

  return (
    <circle
      cx={cx}
      cy={cy}
      r={6}
      fill={color}
      fillOpacity={0.85}
      stroke="#fff"
      strokeWidth={1}
    />
  );
}


// ==============================
// 🧩 COMPONENT
// ==============================

export default function WeightLengthScatter({
  data = [],
  loading = false,
  error = null,
}) {

  const chartData = useMemo(() => buildScatterData(data), [data]);

  const isEmpty = !chartData.length;


  return (
    <ChartWrapper
      title="Weight vs Length"
      subtitle="Bubble size = population, color = conservation status"
      loading={loading}
      error={error}
      empty={isEmpty}
      minHeight={340}
    >
      <div
        className="w-full h-[300px]"
        role="img"
        aria-label="Scatter plot comparing species length and weight"
      >
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 10 }}>

            {/* Grid */}
            <CartesianGrid strokeDasharray="3 3" />

            {/* X Axis */}
            <XAxis
              type="number"
              dataKey="x"
              name="Length"
              unit=" m"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={["dataMin - 0.5", "dataMax + 0.5"]}
            />

            {/* Y Axis */}
            <YAxis
              type="number"
              dataKey="y"
              name="Weight"
              unit=" kg"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={["dataMin - 20", "dataMax + 20"]}
            />

            {/* Bubble Size */}
            <ZAxis
              type="number"
              dataKey="z"
              range={[60, 400]} // smoother visual scaling
            />

            {/* Tooltip */}
            <Tooltip content={<CustomTooltip />} />

            {/* Scatter */}
            <Scatter
              data={chartData}
              shape={(props) => <CustomDot {...props} />}
            />

          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </ChartWrapper>
  );
}


// ==============================
// ✅ PROPTYPES
// ==============================

WeightLengthScatter.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
};
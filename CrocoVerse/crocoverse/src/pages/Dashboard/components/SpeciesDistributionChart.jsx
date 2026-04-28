import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";
import PropTypes from "prop-types";

import ChartWrapper from "./ChartWrapper";


// ==============================
// 🎨 RISK COLOR SCALE
// ==============================

const getRiskColor = (score) => {
  if (score < 40) return "#22c55e";   // low
  if (score < 65) return "#eab308";   // medium
  return "#ef4444";                   // high
};


// ==============================
// 🧠 DATA TRANSFORM
// ==============================

function buildDistribution(data = []) {
  const map = {};

  data.forEach((s) => {
    if (!map[s.continent]) {
      map[s.continent] = {
        continent: s.continent,
        speciesCount: 0,
        totalRisk: 0,
      };
    }

    map[s.continent].speciesCount += 1;
    map[s.continent].totalRisk += s.riskScore;
  });

  return Object.values(map)
    .map((c) => ({
      continent: c.continent,
      speciesCount: c.speciesCount,
      avgRiskScore: Math.round(c.totalRisk / c.speciesCount),
    }))
    .sort((a, b) => b.speciesCount - a.speciesCount); // 🔥 sort descending
}


// ==============================
// 💬 TOOLTIP
// ==============================

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-sm text-sm">
      <p className="font-medium text-gray-900">
        {data.continent}
      </p>
      <p className="text-gray-500">
        {data.speciesCount} species
      </p>
      <p className="text-gray-400">
        Avg Risk: {data.avgRiskScore}
      </p>
    </div>
  );
}


// ==============================
// 🧩 COMPONENT
// ==============================

export default function SpeciesDistributionChart({
  data = [],
  loading = false,
  error = null,
}) {

  const chartData = useMemo(() => buildDistribution(data), [data]);

  const isEmpty = !chartData.length;


  return (
    <ChartWrapper
      title="Species Distribution by Continent"
      subtitle="Bar color indicates average conservation risk"
      loading={loading}
      error={error}
      empty={isEmpty}
      minHeight={340}
    >
      <div
        className="w-full h-[300px]"
        role="img"
        aria-label="Horizontal bar chart showing species distribution across continents"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"   // 🔥 horizontal bars
            margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
          >

            {/* Grid */}
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
            />

            {/* Y Axis → categories */}
            <YAxis
              type="category"
              dataKey="continent"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={100}
            />

            {/* X Axis → values */}
            <XAxis
              type="number"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            {/* Tooltip */}
            <Tooltip content={<CustomTooltip />} />

            {/* Bars */}
            <Bar
              dataKey="speciesCount"
              radius={[0, 8, 8, 0]} // rounded right side
              barSize={18}
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.continent} // ✅ stable key
                  fill={getRiskColor(entry.avgRiskScore)}
                />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartWrapper>
  );
}


// ==============================
// ✅ PROPTYPES
// ==============================

SpeciesDistributionChart.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

//  Done building the SpeciesDistributionChart component, which displays the distribution of species across continents using a horizontal bar chart. The color of each bar indicates the average conservation risk score for that continent, providing an immediate visual cue about the relative risk levels. The component includes a custom tooltip for detailed information on hover and handles loading, error, and empty states gracefully using the ChartWrapper. This chart helps users quickly understand where species are most concentrated and how risk levels vary by continent.
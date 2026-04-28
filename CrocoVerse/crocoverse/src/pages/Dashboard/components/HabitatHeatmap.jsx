import { useMemo } from "react";
import PropTypes from "prop-types";

import ChartWrapper from "./ChartWrapper";


// ==============================
// 🧠 CONFIG
// ==============================

const CONTINENTS = ["Americas", "Africa", "Asia", "Oceania"];
const HABITATS = ["Rivers", "Swamps", "Estuaries", "Forest Swamps"];


// ==============================
// 🎨 COLOR TIERS
// ==============================

const TIERS = [
  { min: 70, bg: "bg-green-600", text: "text-white", label: "Excellent" },
  { min: 50, bg: "bg-green-200", text: "text-green-900", label: "Good" },
  { min: 30, bg: "bg-yellow-200", text: "text-yellow-900", label: "Moderate" },
  { min: 0, bg: "bg-red-200", text: "text-red-900", label: "Poor" },
];

const getTier = (score) => {
  if (score === null) return null;
  return TIERS.find((t) => score >= t.min);
};


// ==============================
// 🧠 DATA TRANSFORM
// ==============================

function buildMatrix(data = []) {
  const matrix = {};

  CONTINENTS.forEach((continent) => {
    matrix[continent] = {};

    HABITATS.forEach((habitat) => {
      const matches = data.filter(
        (s) =>
          s.continent === continent &&
          s.habitat?.toLowerCase().includes(habitat.toLowerCase().split(" ")[0])
      );

      if (!matches.length) {
        matrix[continent][habitat] = { score: null, count: 0 };
        return;
      }

      const avg =
        matches.reduce((sum, s) => sum + (s.habitatScore || 0), 0) /
        matches.length;

      matrix[continent][habitat] = {
        score: Math.round(avg),
        count: matches.length,
      };
    });
  });

  return matrix;
}


// ==============================
// 🧩 CELL COMPONENT
// ==============================

function HeatCell({ score, count }) {
  const tier = getTier(score);

  if (score === null) {
    return (
      <div className="bg-gray-100 text-gray-400 rounded-lg flex items-center justify-center text-sm h-14">
        —
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg flex flex-col items-center justify-center h-14 text-sm font-medium ${tier.bg} ${tier.text}`}
      title={`Score: ${score} • ${count} species`}
    >
      {score}
    </div>
  );
}


// ==============================
// 🧩 MAIN COMPONENT
// ==============================

export default function HabitatHeatmap({
  data = [],
  loading = false,
  error = null,
}) {

  const matrix = useMemo(() => buildMatrix(data), [data]);

  const isEmpty = !data.length;


  return (
    <ChartWrapper
      title="Habitat Heatmap"
      subtitle="Habitat suitability across continents"
      loading={loading}
      error={error}
      empty={isEmpty}
      minHeight={340}
    >
      <div className="w-full">

        {/* ================= GRID ================= */}
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `100px repeat(${HABITATS.length}, 1fr)`,
          }}
        >

          {/* Top-left empty */}
          <div />

          {/* Column headers */}
          {HABITATS.map((habitat) => (
            <div
              key={habitat}
              className="text-xs text-gray-500 text-center font-medium"
            >
              {habitat}
            </div>
          ))}

          {/* Rows */}
          {CONTINENTS.map((continent) => (
            <>
              {/* Row header */}
              <div
                key={continent}
                className="text-xs text-gray-500 font-medium flex items-center"
              >
                {continent}
              </div>

              {/* Cells */}
              {HABITATS.map((habitat) => {
                const { score, count } = matrix[continent][habitat];

                return (
                  <HeatCell
                    key={`${continent}-${habitat}`}
                    score={score}
                    count={count}
                  />
                );
              })}
            </>
          ))}

        </div>

        {/* ================= LEGEND ================= */}
        <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
          {TIERS.map((t) => (
            <div key={t.label} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded ${t.bg}`} />
              {t.label}
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-gray-100 border" />
            No data
          </div>
        </div>

      </div>
    </ChartWrapper>
  );
}


// ==============================
// ✅ PROPTYPES
// ==============================

HabitatHeatmap.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

// Done building the HabitatHeatmap component, which displays habitat suitability scores across different continents and habitats. The heatmap uses color coding to indicate the suitability levels, and includes a legend for easy interpretation. The component also handles loading, error, and empty states gracefully using the ChartWrapper.
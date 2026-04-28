import { useState, useMemo } from "react";
import PropTypes from "prop-types";

import ChartWrapper from "./ChartWrapper";


// ==============================
// 🎨 CONSERVATION BADGE
// ==============================

function ConservationBadge({ status }) {
  const COLORS = {
    "Least Concern": "bg-green-100 text-green-700",
    "Vulnerable": "bg-yellow-100 text-yellow-700",
    "Endangered": "bg-orange-100 text-orange-700",
    "Critically Endangered": "bg-red-100 text-red-700",
    "Data Deficient": "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${COLORS[status] || "bg-gray-100 text-gray-600"}`}
    >
      {status}
    </span>
  );
}


// ==============================
// 📊 PROGRESS BAR (ANIMATED)
// ==============================

function Bar({ value, max, color }) {
  const percentage = max ? (value / max) * 100 : 0;

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{
          width: `${percentage}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
}


// ==============================
// 📊 STAT ROW
// ==============================

function StatRow({ label, a, b, max, unit = "", color }) {
  return (
    <div className="grid grid-cols-[1fr_80px_1fr] items-center gap-2">

      {/* Values */}
      <div className="text-right text-sm font-medium">
        {formatValue(a)}{unit}
      </div>

      <div className="text-xs text-gray-500 text-center">
        {label}
      </div>

      <div className="text-left text-sm font-medium">
        {formatValue(b)}{unit}
      </div>

      {/* Bars */}
      <Bar value={a} max={max} color={color} />
      <div />
      <Bar value={b} max={max} color={color} />

    </div>
  );
}


// ==============================
// 🔢 FORMATTER
// ==============================

function formatValue(v) {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + "M";
  if (v >= 1_000) return (v / 1_000).toFixed(1) + "K";
  return v;
}


// ==============================
// 🧩 COMPONENT
// ==============================

export default function SpeciesComparisonPanel({
  data = [],
  loading = false,
  error = null,
}) {

  // Default selection (first 2 species)
  const [idA, setIdA] = useState(data[0]?.id);
  const [idB, setIdB] = useState(data[1]?.id);


  // ==============================
  // 🧠 SELECTED SPECIES
  // ==============================

  const spA = useMemo(
    () => data.find((s) => s.id === Number(idA)),
    [data, idA]
  );

  const spB = useMemo(
    () => data.find((s) => s.id === Number(idB)),
    [data, idB]
  );

  const isEmpty = !spA || !spB;


  // ==============================
  // 🎨 UI
  // ==============================

  return (
    <ChartWrapper
      title="Species Comparison"
      subtitle="Compare biological and conservation metrics"
      loading={loading}
      error={error}
      empty={isEmpty}
      minHeight={360}
    >

      {/* ================= DROPDOWNS ================= */}
      <div className="flex gap-4 mb-4">

        {[{ val: idA, setter: setIdA }, { val: idB, setter: setIdB }].map(
          ({ val, setter }, i) => (
            <select
              key={i}
              value={val}
              onChange={(e) => setter(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              {data.map((s) => (
                <option
                  key={s.id}
                  value={s.id}
                  disabled={s.id === (i === 0 ? idB : idA)} // 🚫 prevent same selection
                >
                  {s.commonName}
                </option>
              ))}
            </select>
          )
        )}

      </div>


      {/* ================= CARDS ================= */}
      {spA && spB && (
        <>
          <div className="grid grid-cols-2 gap-4 mb-6">

            {[spA, spB].map((sp) => (
              <div
                key={sp.id}
                className="bg-gray-50 rounded-xl p-3 text-center"
              >
                <h3 className="font-semibold text-sm">
                  {sp.commonName}
                </h3>

                <p className="text-xs text-gray-500 italic">
                  {sp.scientificName}
                </p>

                <ConservationBadge status={sp.conservation} />
              </div>
            ))}

          </div>


          {/* ================= STATS ================= */}
          <div className="space-y-4">

            <StatRow
              label="Length"
              a={spA.avgLength}
              b={spB.avgLength}
              max={Math.max(spA.avgLength, spB.avgLength)}
              unit="m"
              color="#16a34a"
            />

            <StatRow
              label="Weight"
              a={spA.avgWeight}
              b={spB.avgWeight}
              max={Math.max(spA.avgWeight, spB.avgWeight)}
              unit="kg"
              color="#2563eb"
            />

            <StatRow
              label="Population"
              a={spA.population}
              b={spB.population}
              max={Math.max(spA.population, spB.population)}
              color="#7c3aed"
            />

            <StatRow
              label="Risk Score"
              a={spA.riskScore}
              b={spB.riskScore}
              max={100}
              color="#dc2626"
            />

          </div>
        </>
      )}

    </ChartWrapper>
  );
}


// ==============================
// ✅ PROPTYPES
// ==============================

SpeciesComparisonPanel.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
};
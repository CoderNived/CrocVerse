import { useMemo } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts"
import PropTypes from "prop-types"

import ChartWrapper from "./ChartWrapper"
import { SPECIES_DATASET } from "../../../constants/mockDashboardData"

// ─── Bin definitions ──────────────────────────────────────────────────────────
// Colors convey risk severity: green → red.
// Defined outside the component — never recreated on render.

const BINS = [
  { range: "0–20",   min: 0,  max: 20,  color: "#16a34a", label: "Very Low"  },
  { range: "21–40",  min: 21, max: 40,  color: "#65a30d", label: "Low"       },
  { range: "41–60",  min: 41, max: 60,  color: "#ca8a04", label: "Moderate"  },
  { range: "61–80",  min: 61, max: 80,  color: "#ea580c", label: "High"      },
  { range: "81–100", min: 81, max: 100, color: "#dc2626", label: "Very High" },
]

// ─── Data builder ─────────────────────────────────────────────────────────────

function buildHistogramData(dataset) {
  if (!dataset?.length) return []

  // Single pass over the dataset — O(n) instead of O(n × bins)
  const counts = Object.fromEntries(BINS.map((b) => [b.range, 0]))

  for (const species of dataset) {
    const score = species.riskScore
    // Skip records with missing or out-of-range scores
    if (score == null || score < 0 || score > 100) continue

    // BINS are mutually exclusive and exhaustive for [0, 100];
    // find the correct bin and increment its counter.
    const bin = BINS.find(
      (b) => score >= b.min && score <= b.max
    )
    if (bin) counts[bin.range] += 1
  }

  return BINS.map((bin) => ({
    range:  bin.range,
    label:  bin.label,
    color:  bin.color,
    count:  counts[bin.range],
  }))
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null

  const { range, label, count, color } = payload[0].payload

  return (
    <div
      style={{
        background:   "var(--color-background-primary)",
        border:       "0.5px solid var(--color-border-tertiary)",
        borderRadius: 10,
        padding:      "10px 14px",
        fontSize:     13,
        minWidth:     150,
      }}
    >
      {/* Colour swatch + risk range */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span
          aria-hidden="true"
          style={{
            display:      "inline-block",
            width:        10,
            height:       10,
            borderRadius: 2,
            background:   color,
            flexShrink:   0,
          }}
        />
        <span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>
          {label}
        </span>
        <span style={{ color: "var(--color-text-secondary)", fontSize: 11 }}>
          ({range})
        </span>
      </div>

      <div
        style={{
          display:        "flex",
          justifyContent: "space-between",
          gap:            20,
          color:          "var(--color-text-secondary)",
        }}
      >
        <span>Species count</span>
        <span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>
          {count.toLocaleString()}
        </span>
      </div>
    </div>
  )
}

CustomTooltip.propTypes = {
  active:  PropTypes.bool,
  payload: PropTypes.array,
}

// ─── Custom legend ────────────────────────────────────────────────────────────

function HistogramLegend({ data }) {
  const total = data.reduce((sum, d) => sum + d.count, 0)

  return (
    <div
      role="list"
      aria-label="Risk score legend"
      style={{
        display:   "flex",
        flexWrap:  "wrap",
        gap:       "8px 20px",
        marginTop: 12,
        fontSize:  12,
      }}
    >
      {data.map((entry) => {
        const pct = total > 0
          ? ((entry.count / total) * 100).toFixed(1)
          : "0.0"

        return (
          <div
            key={entry.range}
            role="listitem"
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <span
              aria-hidden="true"
              style={{
                display:      "inline-block",
                width:        10,
                height:       10,
                borderRadius: 2,
                background:   entry.color,
                flexShrink:   0,
              }}
            />
            <span style={{ color: "var(--color-text-secondary)" }}>
              {entry.label}
            </span>
            <span style={{ color: "var(--color-text-secondary)", opacity: 0.6 }}>
              {pct}%
            </span>
          </div>
        )
      })}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function RiskScoreHistogram() {
  const data = useMemo(() => buildHistogramData(SPECIES_DATASET), [])

  // True empty: source dataset is absent or entirely empty.
  // All-zero bins (data exists but nothing matches) still renders
  // the chart so the user can see a valid "nothing is risky" result.
  const isEmpty = !SPECIES_DATASET?.length

  const total = useMemo(
    () => data.reduce((sum, d) => sum + d.count, 0),
    [data]
  )

  return (
    <ChartWrapper
      title="Risk Score Distribution"
      subtitle="Species count by conservation risk score"
      empty={isEmpty}
      emptyMessage="No species data available"
    >
      <div className="w-full">

        {/* Summary stat */}
        {total > 0 && (
          <p
            style={{
              fontSize:     12,
              color:        "var(--color-text-secondary)",
              marginBottom: 12,
            }}
          >
            {total.toLocaleString()} species across all risk tiers
          </p>
        )}

        <div
          style={{ width: "100%", height: 260 }}
          role="img"
          aria-label={`Histogram of ${total.toLocaleString()} species distributed across 5 risk score bins from 0 to 100`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 4, right: 8, bottom: 0, left: -16 }}
              barCategoryGap="28%"
            >
              <XAxis
                dataKey="range"
                tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }}
                axisLine={false}
                tickLine={false}
                tickMargin={4}
                allowDecimals={false}
                tickFormatter={(v) =>
                  v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)
                }
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "var(--color-border-tertiary)", opacity: 0.5 }}
                wrapperStyle={{ outline: "none" }}
              />

              <Bar
                dataKey="count"
                radius={[5, 5, 0, 0]}
                isAnimationActive={true}
                label={{
                  position: "top",
                  fontSize: 11,
                  fill:     "var(--color-text-secondary)",
                  // Hide label when bar is 0 — avoids "0" floating above empty bars
                  formatter: (v) => (v > 0 ? v.toLocaleString() : ""),
                }}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.range}       // stable key, not array index
                    fill={entry.color}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <HistogramLegend data={data} />

      </div>
    </ChartWrapper>
  )
}
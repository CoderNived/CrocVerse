import { useMemo } from "react";
import PropTypes from "prop-types";

import {
  TrendingUp,
  Users,
  Activity,
  Globe,
  Leaf,
  AlertTriangle,
} from "lucide-react";

import KPICard from "./KPICard";


// ==============================
// 🎨 ICON REGISTRY
// ==============================

const ICON_MAP = {
  totalSpecies: <Leaf size={20} aria-hidden="true" />,
  totalObservations: <Activity size={20} aria-hidden="true" />,
  avgRiskScore: <TrendingUp size={20} aria-hidden="true" />,
  endangeredCount: <AlertTriangle size={20} aria-hidden="true" />,
  continentsCovered: <Globe size={20} aria-hidden="true" />,
};

const FALLBACK_ICON = <Users size={20} aria-hidden="true" />;


// ==============================
// 🧠 KPI CONFIG (SCALABLE)
// ==============================

const KPI_CONFIG = [
  {
    key: "totalSpecies",
    label: "Total Species",
    unit: "",
  },
  {
    key: "endangeredCount",
    label: "Endangered Species",
    unit: "",
  },
  {
    key: "avgRiskScore",
    label: "Avg Risk Score",
    unit: "%",
  },
  {
    key: "totalObservations",
    label: "Total Observations",
    unit: "",
  },
];


// ==============================
// 📊 KPI CALCULATOR
// ==============================

function computeKPIs(data = []) {
  if (!data.length) {
    return {
      totalSpecies: 0,
      endangeredCount: 0,
      avgRiskScore: 0,
      totalObservations: 0,
      continentsCovered: 0,
    };
  }

  const totalSpecies = data.length;

  const endangeredCount = data.filter((s) =>
    ["Endangered", "Critically Endangered"].includes(s.conservation)
  ).length;

  const avgRiskScore = Math.round(
    data.reduce((acc, s) => acc + s.riskScore, 0) / totalSpecies
  );

  const totalObservations = data.reduce(
    (acc, s) => acc + s.observations,
    0
  );

  const continentsCovered = new Set(data.map((s) => s.continent)).size;

  return {
    totalSpecies,
    endangeredCount,
    avgRiskScore,
    totalObservations,
    continentsCovered,
  };
}


// ==============================
// 📈 TREND CALCULATOR
// ==============================

function computeTrend(current, previous) {
  if (previous === 0 || previous === undefined) return null;

  const diff = current - previous;
  const percent = ((diff / previous) * 100).toFixed(1);

  if (diff > 0) return { value: `${percent}%`, direction: "up" };
  if (diff < 0) return { value: `${Math.abs(percent)}%`, direction: "down" };

  return { value: "0%", direction: "neutral" };
}


// ==============================
// 🧩 COMPONENT
// ==============================

export default function KPIBar({
  data = [],
  previousData = null, // optional (for trends)
  loading = false,
}) {

  // ==============================
  // 🧠 COMPUTE KPIs
  // ==============================

  const currentKPIs = useMemo(() => computeKPIs(data), [data]);

  const previousKPIs = useMemo(
    () => (previousData ? computeKPIs(previousData) : null),
    [previousData]
  );


  // ==============================
  // 📊 BUILD CARDS
  // ==============================

  const cards = useMemo(() => {
    return KPI_CONFIG.map((config) => {
      const currentValue = currentKPIs[config.key];

      let trend = null;
      let trendDirection = null;

      if (previousKPIs) {
        const trendData = computeTrend(
          currentValue,
          previousKPIs[config.key]
        );

        trend = trendData?.value;
        trendDirection = trendData?.direction;
      }

      return {
        ...config,
        value: currentValue,
        trend,
        trendDirection,
      };
    });
  }, [currentKPIs, previousKPIs]);


  // ==============================
  // 🚫 EMPTY STATE
  // ==============================

  if (!loading && (!data || data.length === 0)) {
    return null;
  }


  // ==============================
  // 🎨 UI
  // ==============================

  return (
    <section
      aria-label="Key performance indicators"
      className="w-full"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {cards.map((item) => (
          <KPICard
            key={item.key}
            icon={ICON_MAP[item.key] ?? FALLBACK_ICON}
            label={item.label}
            value={item.value}
            unit={item.unit}
            trend={item.trend}
            trendDirection={item.trendDirection}
            loading={loading}
          />
        ))}

      </div>
    </section>
  );
}


// ==============================
// ✅ PROPTYPES
// ==============================

KPIBar.propTypes = {
  data: PropTypes.array,
  previousData: PropTypes.array,
  loading: PropTypes.bool,
};

// Done building the KPIBar component, which computes and displays key performance indicators based on the provided species data. The component is designed to be reusable and accepts optional previous data for trend calculations. Each KPI is displayed in a card format with an icon, label, value, unit, and trend indicator for easy visualization of changes over time.
import { useMemo, useState, useEffect } from "react";

import KPIBar from "./components/KPIBar";
import FilterBar from "./components/FilterBar";
import ConservationDonutChart from "./components/ConservationDonutChart";
import SpeciesDistributionChart from "./components/SpeciesDistributionChart";
import ObservationTrendChart from "./components/ObservationTrendLine";
import WeightLengthScatter from "./components/WeightLengthScatter";
import RiskScoreHistogram from "./components/RiskScoreHistogram";
import HabitatHeatmap from "./components/HabitatHeatmap";
import SpeciesComparisonPanel from "./components/SpeciesComparisionPanel";
import SpeciesDataTable from "./components/SpeciesDataTable";

import { ENRICHED_SPECIES } from "../../Constants/mockDashboardData";

export default function DashboardPage() {

  // ==============================
  // 🎛 FILTER STATE
  // ==============================

  const [filters, setFilters] = useState({
    continent: "All",
    conservation: "All",
    habitat: "All",
  });

  // ==============================
  // 🧠 FILTERED DATA (FIXED)
  // ==============================

  const filteredSpecies = useMemo(() => {
    return ENRICHED_SPECIES.filter((s) => {

      const continent = s.continent?.toLowerCase();
      const conservation = s.conservation?.toLowerCase();
      const habitat = s.habitat?.toLowerCase();

      const filterContinent = filters.continent.toLowerCase();
      const filterConservation = filters.conservation.toLowerCase();
      const filterHabitat = filters.habitat.toLowerCase();

      const matchContinent =
        filterContinent === "all" || continent === filterContinent;

      const matchStatus =
        filterConservation === "all" || conservation === filterConservation;

      const matchHabitat =
        filterHabitat === "all" || habitat.includes(filterHabitat);

      return matchContinent && matchStatus && matchHabitat;
    });
  }, [filters]);

  // ==============================
  // 🧪 DEBUG (OPTIONAL)
  // ==============================

  useEffect(() => {
    console.log("TOTAL:", ENRICHED_SPECIES.length);
    console.log("FILTERED:", filteredSpecies.length);
  }, [filteredSpecies]);

  // ==============================
  // 🎛 FILTER OPTIONS
  // ==============================

  const filterOptions = useMemo(() => {
    return {
      continents: [...new Set(ENRICHED_SPECIES.map((s) => s.continent))],
      conservationStatuses: [...new Set(ENRICHED_SPECIES.map((s) => s.conservation))],
      habitats: [...new Set(ENRICHED_SPECIES.map((s) => s.habitat))],
    };
  }, []);

  // ==============================
  // 🎛 HANDLERS
  // ==============================

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      continent: "All",
      conservation: "All",
      habitat: "All",
    });
  };

  // ==============================
  // 🎨 UI
  // ==============================

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">

        {/* HEADER */}
        <div className="mb-6 space-y-3">
          <div>
            <h1 className="text-2xl font-bold">
              Analytics Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Real-time insights from crocodilian dataset
            </p>
          </div>

          <FilterBar
            filters={filters}
            onChange={updateFilter}
            onReset={resetFilters}
            options={filterOptions}
          />
        </div>

        {/* KPI */}
        <div className="mb-6">
          <KPIBar data={filteredSpecies} />
        </div>

        {/* ROW 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ConservationDonutChart data={filteredSpecies} />
          <SpeciesDistributionChart data={filteredSpecies} />
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ObservationTrendChart data={filteredSpecies} />
          <WeightLengthScatter data={filteredSpecies} />
        </div>

        {/* ROW 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RiskScoreHistogram data={filteredSpecies} />
          <HabitatHeatmap data={filteredSpecies} />
        </div>

        {/* ROW 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SpeciesComparisonPanel data={filteredSpecies} />
          <div className="hidden lg:block" />
        </div>

        {/* TABLE */}
        <div className="mb-6">
          <SpeciesDataTable data={filteredSpecies} />
        </div>

      </div>
    </div>
  );
}
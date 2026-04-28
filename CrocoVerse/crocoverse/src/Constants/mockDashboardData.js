// src/constants/mockDashboardData.js
// ==============================
// 🧠 HELPER FUNCTIONS
// ==============================

const getRiskScore = (status) => {
  switch (status) {
    case "Least Concern":          return 20;
    case "Vulnerable":             return 55;
    case "Endangered":             return 70;
    case "Critically Endangered":  return 90;
    case "Data Deficient":         return 40;
    default:                       return 40;
  }
};

const getHabitatScore = (status) => {
  switch (status) {
    case "Least Concern":          return 80;
    case "Vulnerable":             return 60;
    case "Endangered":             return 50;
    case "Critically Endangered":  return 35;
    case "Data Deficient":         return 55;
    default:                       return 60;
  }
};

// ==============================
// 🐊 RAW SPECIES DATASET (18 Species — derived from uploaded CSV)
// ==============================

export const SPECIES_DATASET = [
  {
    id: 1,
    commonName: "Morelet's Crocodile",
    scientificName: "Crocodylus moreletii",
    continent: "Americas",
    conservation: "Least Concern",
    habitat: "Rivers",
    avgLength: 2.15,
    avgWeight: 85.0,
    population: 50000,
    riskScore: getRiskScore("Least Concern"),
    habitatScore: getHabitatScore("Least Concern"),
    observations: 64,
    observationsByYear: [
      { year: 2018, count: 7 },
      { year: 2019, count: 6 },
      { year: 2020, count: 5 },
      { year: 2021, count: 4 },
      { year: 2022, count: 3 },
    ],
  },
  {
    id: 2,
    commonName: "American Crocodile",
    scientificName: "Crocodylus acutus",
    continent: "Americas",
    conservation: "Vulnerable",
    habitat: "Mangroves",
    avgLength: 2.88,
    avgWeight: 189.0,
    population: 20000,
    riskScore: getRiskScore("Vulnerable"),
    habitatScore: getHabitatScore("Vulnerable"),
    observations: 66,
    observationsByYear: [
      { year: 2018, count: 5 },
      { year: 2019, count: 4 },
      { year: 2020, count: 6 },
      { year: 2021, count: 3 },
      { year: 2022, count: 2 },
    ],
  },
  {
    id: 3,
    commonName: "Orinoco Crocodile",
    scientificName: "Crocodylus intermedius",
    continent: "Americas",
    conservation: "Critically Endangered",
    habitat: "Flooded Savannas",
    avgLength: 3.02,
    avgWeight: 295.7,
    population: 1500,
    riskScore: getRiskScore("Critically Endangered"),
    habitatScore: getHabitatScore("Critically Endangered"),
    observations: 58,
    observationsByYear: [
      { year: 2018, count: 3 },
      { year: 2019, count: 2 },
      { year: 2020, count: 4 },
      { year: 2021, count: 2 },
      { year: 2022, count: 3 },
    ],
  },
  {
    id: 4,
    commonName: "Cuban Crocodile",
    scientificName: "Crocodylus rhombifer",
    continent: "Americas",
    conservation: "Critically Endangered",
    habitat: "Swamps",
    avgLength: 2.32,
    avgWeight: 99.4,
    population: 4000,
    riskScore: getRiskScore("Critically Endangered"),
    habitatScore: getHabitatScore("Critically Endangered"),
    observations: 59,
    observationsByYear: [
      { year: 2018, count: 2 },
      { year: 2019, count: 1 },
      { year: 2020, count: 4 },
      { year: 2021, count: 3 },
      { year: 2022, count: 2 },
    ],
  },
  {
    id: 5,
    commonName: "Mugger Crocodile (Marsh Crocodile)",
    scientificName: "Crocodylus palustris",
    continent: "Asia",
    conservation: "Vulnerable",
    habitat: "Reservoirs",
    avgLength: 2.82,
    avgWeight: 161.2,
    population: 8000,
    riskScore: getRiskScore("Vulnerable"),
    habitatScore: getHabitatScore("Vulnerable"),
    observations: 47,
    observationsByYear: [
      { year: 2018, count: 2 },
      { year: 2019, count: 3 },
      { year: 2020, count: 2 },
      { year: 2021, count: 1 },
      { year: 2022, count: 2 },
    ],
  },
  {
    id: 6,
    commonName: "Siamese Crocodile",
    scientificName: "Crocodylus siamensis",
    continent: "Asia",
    conservation: "Critically Endangered",
    habitat: "Slow Rivers",
    avgLength: 2.16,
    avgWeight: 104.3,
    population: 1000,
    riskScore: getRiskScore("Critically Endangered"),
    habitatScore: getHabitatScore("Critically Endangered"),
    observations: 45,
    observationsByYear: [
      { year: 2018, count: 2 },
      { year: 2019, count: 3 },
      { year: 2020, count: 3 },
      { year: 2021, count: 1 },
      { year: 2022, count: 2 },
    ],
  },
  {
    id: 7,
    commonName: "Philippine Crocodile",
    scientificName: "Crocodylus mindorensis",
    continent: "Asia",
    conservation: "Critically Endangered",
    habitat: "Freshwater Marshes",
    avgLength: 1.84,
    avgWeight: 58.7,
    population: 250,
    riskScore: getRiskScore("Critically Endangered"),
    habitatScore: getHabitatScore("Critically Endangered"),
    observations: 58,
    observationsByYear: [
      { year: 2018, count: 2 },
      { year: 2019, count: 4 },
      { year: 2020, count: 2 },
      { year: 2021, count: 3 },
      { year: 2022, count: 2 },
    ],
  },
  {
    id: 8,
    commonName: "Borneo Crocodile (disputed)",
    scientificName: "Crocodylus raninus",
    continent: "Asia",
    conservation: "Data Deficient",
    habitat: "Estuarine Systems",
    avgLength: 2.52,
    avgWeight: 118.0,
    population: 2000,
    riskScore: getRiskScore("Data Deficient"),
    habitatScore: getHabitatScore("Data Deficient"),
    observations: 67,
    observationsByYear: [
      { year: 2018, count: 4 },
      { year: 2019, count: 3 },
      { year: 2020, count: 3 },
      { year: 2021, count: 4 },
      { year: 2022, count: 4 },
    ],
  },
  {
    id: 9,
    commonName: "Saltwater Crocodile",
    scientificName: "Crocodylus porosus",
    continent: "Oceania",
    conservation: "Least Concern",
    habitat: "Estuaries",
    avgLength: 4.41,
    avgWeight: 634.6,
    population: 200000,
    riskScore: getRiskScore("Least Concern"),
    habitatScore: getHabitatScore("Least Concern"),
    observations: 58,
    observationsByYear: [
      { year: 2018, count: 4 },
      { year: 2019, count: 3 },
      { year: 2020, count: 5 },
      { year: 2021, count: 5 },
      { year: 2022, count: 3 },
    ],
  },
  {
    id: 10,
    commonName: "New Guinea Crocodile",
    scientificName: "Crocodylus novaeguineae",
    continent: "Oceania",
    conservation: "Least Concern",
    habitat: "Swamps",
    avgLength: 2.15,
    avgWeight: 80.4,
    population: 100000,
    riskScore: getRiskScore("Least Concern"),
    habitatScore: getHabitatScore("Least Concern"),
    observations: 68,
    observationsByYear: [
      { year: 2018, count: 4 },
      { year: 2019, count: 4 },
      { year: 2020, count: 3 },
      { year: 2021, count: 5 },
      { year: 2022, count: 6 },
    ],
  },
  {
    id: 11,
    commonName: "Hall's New Guinea Crocodile",
    scientificName: "Crocodylus halli",
    continent: "Oceania",
    conservation: "Least Concern",
    habitat: "Freshwater Wetlands",
    avgLength: 2.40,
    avgWeight: 96.5,
    population: 50000,
    riskScore: getRiskScore("Least Concern"),
    habitatScore: getHabitatScore("Least Concern"),
    observations: 49,
    observationsByYear: [
      { year: 2018, count: 3 },
      { year: 2019, count: 2 },
      { year: 2020, count: 4 },
      { year: 2021, count: 3 },
      { year: 2022, count: 2 },
    ],
  },
  {
    id: 12,
    commonName: "Freshwater Crocodile (Johnstone's)",
    scientificName: "Crocodylus johnstoni",
    continent: "Oceania",
    conservation: "Least Concern",
    habitat: "Billabongs",
    avgLength: 1.85,
    avgWeight: 54.5,
    population: 100000,
    riskScore: getRiskScore("Least Concern"),
    habitatScore: getHabitatScore("Least Concern"),
    observations: 45,
    observationsByYear: [
      { year: 2018, count: 2 },
      { year: 2019, count: 2 },
      { year: 2020, count: 3 },
      { year: 2021, count: 2 },
      { year: 2022, count: 2 },
    ],
  },
  {
    id: 13,
    commonName: "Nile Crocodile",
    scientificName: "Crocodylus niloticus",
    continent: "Africa",
    conservation: "Least Concern",
    habitat: "Lakes",
    avgLength: 3.67,
    avgWeight: 456.0,
    population: 300000,
    riskScore: getRiskScore("Least Concern"),
    habitatScore: getHabitatScore("Least Concern"),
    observations: 48,
    observationsByYear: [
      { year: 2018, count: 3 },
      { year: 2019, count: 2 },
      { year: 2020, count: 4 },
      { year: 2021, count: 2 },
      { year: 2022, count: 2 },
    ],
  },
  {
    id: 14,
    commonName: "West African Crocodile",
    scientificName: "Crocodylus suchus",
    continent: "Africa",
    conservation: "Least Concern",
    habitat: "Lakes",
    avgLength: 2.34,
    avgWeight: 112.6,
    population: 30000,
    riskScore: getRiskScore("Least Concern"),
    habitatScore: getHabitatScore("Least Concern"),
    observations: 52,
    observationsByYear: [
      { year: 2018, count: 3 },
      { year: 2019, count: 2 },
      { year: 2020, count: 3 },
      { year: 2021, count: 3 },
      { year: 2022, count: 2 },
    ],
  },
  {
    id: 15,
    commonName: "West African Dwarf Crocodile",
    scientificName: "Osteolaemus tetraspis",
    continent: "Africa",
    conservation: "Vulnerable",
    habitat: "Forest Swamps",
    avgLength: 1.12,
    avgWeight: 14.0,
    population: 25000,
    riskScore: getRiskScore("Vulnerable"),
    habitatScore: getHabitatScore("Vulnerable"),
    observations: 57,
    observationsByYear: [
      { year: 2018, count: 4 },
      { year: 2019, count: 3 },
      { year: 2020, count: 3 },
      { year: 2021, count: 4 },
      { year: 2022, count: 2 },
    ],
  },
  {
    id: 16,
    commonName: "West African Slender-snouted Crocodile",
    scientificName: "Mecistops cataphractus",
    continent: "Africa",
    conservation: "Critically Endangered",
    habitat: "Shaded Forest Rivers",
    avgLength: 2.47,
    avgWeight: 130.0,
    population: 500,
    riskScore: getRiskScore("Critically Endangered"),
    habitatScore: getHabitatScore("Critically Endangered"),
    observations: 55,
    observationsByYear: [
      { year: 2018, count: 3 },
      { year: 2019, count: 4 },
      { year: 2020, count: 3 },
      { year: 2021, count: 3 },
      { year: 2022, count: 2 },
    ],
  },
  {
    id: 17,
    commonName: "Central African Slender-snouted Crocodile",
    scientificName: "Mecistops leptorhynchus",
    continent: "Africa",
    conservation: "Endangered",
    habitat: "Forest Rivers",
    avgLength: 2.00,
    avgWeight: 92.1,
    population: 10000,
    riskScore: getRiskScore("Endangered"),
    habitatScore: getHabitatScore("Endangered"),
    observations: 56,
    observationsByYear: [
      { year: 2018, count: 3 },
      { year: 2019, count: 4 },
      { year: 2020, count: 5 },
      { year: 2021, count: 4 },
      { year: 2022, count: 3 },
    ],
  },
  {
    id: 18,
    commonName: "Congo Dwarf Crocodile",
    scientificName: "Osteolaemus osborni",
    continent: "Africa",
    conservation: "Data Deficient",
    habitat: "Forest Swamps",
    avgLength: 1.23,
    avgWeight: 19.8,
    population: 5000,
    riskScore: getRiskScore("Data Deficient"),
    habitatScore: getHabitatScore("Data Deficient"),
    observations: 48,
    observationsByYear: [
      { year: 2018, count: 3 },
      { year: 2019, count: 2 },
      { year: 2020, count: 4 },
      { year: 2021, count: 2 },
      { year: 2022, count: 3 },
    ],
  },
];


// ==============================
// 🧠 DERIVED HELPERS (CORE LOGIC)
// ==============================

const getConservationWeight = (status) => {
  const map = {
    "Least Concern": 1,
    "Vulnerable": 2,
    "Endangered": 3,
    "Critically Endangered": 4,
    "Data Deficient": 2.5,
  };
  return map[status] || 1;
};


// ==============================
// 📊 ENRICHED DATA
// ==============================

export const ENRICHED_SPECIES = SPECIES_DATASET.map((s) => ({
  ...s,

  threatIndex: Math.round(
    s.riskScore * 0.6 +
    (100 - s.habitatScore) * 0.3 +
    getConservationWeight(s.conservation) * 10
  ),

  growthTrend:
    s.observationsByYear[s.observationsByYear.length - 1].count -
    s.observationsByYear[0].count,

  density: Math.round(s.population / (s.avgLength * 1000)),

  observationConsistency:
    s.observationsByYear.reduce((acc, y) => acc + y.count, 0) /
    s.observationsByYear.length,
}));


// ==============================
// 📊 AGGREGATED STATS
// ==============================

export const AGGREGATED_STATS = (() => {
  const totalSpecies = ENRICHED_SPECIES.length;

  const totalObservations = ENRICHED_SPECIES.reduce(
    (acc, s) => acc + s.observations,
    0
  );

  const endangeredCount = ENRICHED_SPECIES.filter((s) =>
    ["Endangered", "Critically Endangered"].includes(s.conservation)
  ).length;

  const avgRiskScore = Math.round(
    ENRICHED_SPECIES.reduce((acc, s) => acc + s.riskScore, 0) / totalSpecies
  );

  const continents = [...new Set(ENRICHED_SPECIES.map((s) => s.continent))];

  const mostThreatenedRegion = (() => {
    const regionRisk = {};
    ENRICHED_SPECIES.forEach((s) => {
      if (!regionRisk[s.continent]) regionRisk[s.continent] = [];
      regionRisk[s.continent].push(s.threatIndex);
    });
    let maxRegion = null;
    let maxRisk = -1;
    Object.entries(regionRisk).forEach(([region, values]) => {
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      if (avg > maxRisk) { maxRisk = avg; maxRegion = region; }
    });
    return maxRegion;
  })();

  return {
    totalSpecies,
    totalObservations,
    endangeredCount,
    continentsCovered: continents.length,
    avgRiskScore,
    mostThreatenedRegion,
  };
})();


// ==============================
// 🌍 CONTINENT DISTRIBUTION
// ==============================

export const CONTINENT_DISTRIBUTION = (() => {
  const map = {};
  ENRICHED_SPECIES.forEach((s) => {
    if (!map[s.continent]) {
      map[s.continent] = { continent: s.continent, speciesCount: 0, totalRisk: 0, observations: 0 };
    }
    map[s.continent].speciesCount += 1;
    map[s.continent].totalRisk += s.riskScore;
    map[s.continent].observations += s.observations;
  });
  return Object.values(map).map((c) => ({
    continent: c.continent,
    speciesCount: c.speciesCount,
    avgRiskScore: Math.round(c.totalRisk / c.speciesCount),
    observations: c.observations,
  }));
})();


// ==============================
// 🧬 CONSERVATION BREAKDOWN
// ==============================

export const CONSERVATION_BREAKDOWN = (() => {
  const map = {};
  ENRICHED_SPECIES.forEach((s) => {
    if (!map[s.conservation]) map[s.conservation] = 0;
    map[s.conservation]++;
  });

  const COLORS = {
    "Least Concern": "#22c55e",
    "Vulnerable": "#eab308",
    "Endangered": "#f97316",
    "Critically Endangered": "#ef4444",
    "Data Deficient": "#94a3b8",
  };

  return Object.entries(map).map(([status, count]) => ({
    status,
    count,
    color: COLORS[status],
  }));
})();


// ==============================
// 📈 OVERALL TREND
// ==============================

export const OVERALL_TREND = (() => {
  const yearMap = {};
  ENRICHED_SPECIES.forEach((s) => {
    s.observationsByYear.forEach((y) => {
      if (!yearMap[y.year]) yearMap[y.year] = 0;
      yearMap[y.year] += y.count;
    });
  });
  return Object.entries(yearMap)
    .map(([year, count]) => ({ year: Number(year), count }))
    .sort((a, b) => a.year - b.year);
})();


// ==============================
// 🔍 FILTER / QUERY HELPERS
// ==============================

export const FILTERS = {
  byContinent: (continent) =>
    ENRICHED_SPECIES.filter((s) => s.continent === continent),

  byRiskLevel: (threshold) =>
    ENRICHED_SPECIES.filter((s) => s.riskScore >= threshold),

  topThreatened: (n = 5) =>
    [...ENRICHED_SPECIES]
      .sort((a, b) => b.threatIndex - a.threatIndex)
      .slice(0, n),

  searchByName: (query) =>
    ENRICHED_SPECIES.filter((s) =>
      s.commonName.toLowerCase().includes(query.toLowerCase())
    ),
};


// ==============================
// 🎯 KPI CONFIG (FOR UI CARDS)
// ==============================

export const KPI_CONFIG = [
  { key: "totalSpecies",      label: "Total Species",      unit: "" },
  { key: "endangeredCount",   label: "Endangered Species", unit: "" },
  { key: "avgRiskScore",      label: "Avg Risk Score",     unit: "%" },
  { key: "totalObservations", label: "Total Observations", unit: "" },
];
import { useState, useMemo } from "react";
import PropTypes from "prop-types";

import ChartWrapper from "./ChartWrapper";

const PAGE_SIZE = 8;


// ==============================
// 🎨 HELPERS
// ==============================

const statusColor = (s) =>
  ({
    "Least Concern": "bg-green-100 text-green-700",
    Vulnerable: "bg-yellow-100 text-yellow-700",
    Endangered: "bg-orange-100 text-orange-700",
    "Critically Endangered": "bg-red-100 text-red-700",
    "Data Deficient": "bg-gray-100 text-gray-600",
  }[s] || "bg-gray-100 text-gray-600");

const riskColor = (score) =>
  score >= 70
    ? "text-red-600"
    : score >= 40
    ? "text-yellow-600"
    : "text-green-600";

const formatNumber = (v) => {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + "M";
  if (v >= 1_000) return (v / 1_000).toFixed(1) + "K";
  return v;
};


// ==============================
// 🧩 COMPONENT
// ==============================

export default function SpeciesDataTable({
  data = [],
  loading = false,
  error = null,
}) {

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: "commonName",
    direction: "asc",
  });
  const [page, setPage] = useState(1);


  // ==============================
  // 🎛 FILTER OPTIONS
  // ==============================

  const statuses = useMemo(
    () => ["All", ...new Set(data.map((s) => s.conservation))],
    [data]
  );


  // ==============================
  // 🔍 FILTER
  // ==============================

  const filtered = useMemo(() => {
    return data.filter((s) => {
      const matchSearch =
        s.commonName.toLowerCase().includes(search.toLowerCase()) ||
        s.continent.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "All" || s.conservation === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [data, search, statusFilter]);


  // ==============================
  // 🔀 SORT
  // ==============================

  const sorted = useMemo(() => {
    const sortedData = [...filtered].sort((a, b) => {
      const av = a[sortConfig.key];
      const bv = b[sortConfig.key];

      if (av == null) return 1;
      if (bv == null) return -1;

      if (typeof av === "string") {
        return av.localeCompare(bv);
      }

      return av - bv;
    });

    return sortConfig.direction === "asc"
      ? sortedData
      : sortedData.reverse();
  }, [filtered, sortConfig]);


  // ==============================
  // 📄 PAGINATION
  // ==============================

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));

  const paged = useMemo(() => {
    return sorted.slice(
      (page - 1) * PAGE_SIZE,
      page * PAGE_SIZE
    );
  }, [sorted, page]);


  // ==============================
  // 🔁 HANDLERS
  // ==============================

  const sort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const arrow = (key) =>
    sortConfig.key === key
      ? sortConfig.direction === "asc"
        ? " ↑"
        : " ↓"
      : "";

  const isEmpty = !data.length;


  // ==============================
  // 🎨 UI
  // ==============================

  return (
    <ChartWrapper
      title="Species Data Table"
      subtitle="Search, filter, sort, and explore species data"
      loading={loading}
      error={error}
      empty={isEmpty}
      minHeight={400}
    >

      {/* ================= CONTROLS ================= */}
      <div className="flex flex-wrap gap-3 mb-4">

        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search species..."
          className="border rounded-lg px-3 py-2 text-sm flex-1 min-w-[200px]"
        />

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

      </div>


      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          <thead>
            <tr className="border-b">
              {[
                ["commonName", "Name"],
                ["continent", "Continent"],
                ["conservation", "Status"],
                ["avgLength", "Length"],
                ["avgWeight", "Weight"],
                ["riskScore", "Risk"],
              ].map(([key, label]) => (
                <th
                  key={key}
                  onClick={() => sort(key)}
                  className="text-left py-3 px-2 text-xs font-semibold text-gray-500 cursor-pointer hover:text-gray-800"
                >
                  {label}{arrow(key)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paged.map((s) => (
              <tr
                key={s.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-2 px-2 font-medium">
                  {s.commonName}
                </td>

                <td className="py-2 px-2">
                  {s.continent}
                </td>

                <td className="py-2 px-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${statusColor(s.conservation)}`}>
                    {s.conservation}
                  </span>
                </td>

                <td className="py-2 px-2">
                  {s.avgLength} m
                </td>

                <td className="py-2 px-2">
                  {formatNumber(s.avgWeight)} kg
                </td>

                <td className={`py-2 px-2 font-semibold ${riskColor(s.riskScore)}`}>
                  {s.riskScore}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>


      {/* ================= FOOTER ================= */}
      <div className="flex items-center justify-between mt-4 text-sm">

        <div className="text-gray-500">
          {sorted.length} species
        </div>

        <div className="flex items-center gap-2">

          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded-lg disabled:opacity-40"
          >
            ←
          </button>

          <span>
            {page} / {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded-lg disabled:opacity-40"
          >
            →
          </button>

        </div>
      </div>

    </ChartWrapper>
  );
}


// ==============================
// ✅ PROPTYPES
// ==============================

SpeciesDataTable.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
};
// =======================================
// 📊 DASHBOARD UTILS
// =======================================


/**
 * Builds histogram distribution for any numeric field
 * (default: riskScore)
 *
 * @param {Array} data - species dataset
 * @param {Object} options
 * @param {string} options.field - field to bucket (default: 'riskScore')
 * @param {number} options.bucketSize - size of each bucket (default: 20)
 * @param {number} options.min - minimum value (default: 0)
 * @param {number} options.max - maximum value (default: 100)
 *
 * @returns {Array} histogram buckets
 *
 * Example Output:
 * [
 *   { range: "0-20", count: 3 },
 *   { range: "20-40", count: 5 },
 *   ...
 * ]
 */
export function buildRiskHistogram(
  data,
  {
    field = "riskScore",
    bucketSize = 20,
    min = 0,
    max = 100,
  } = {}
) {
  if (!Array.isArray(data)) {
    throw new Error("buildRiskHistogram: data must be an array")
  }

  // ---------------------------------------
  // 🧱 Create buckets
  // ---------------------------------------
  const buckets = []

  for (let start = min; start < max; start += bucketSize) {
    const end = start + bucketSize

    buckets.push({
      range: `${start}-${end}`,
      min: start,
      max: end,
      count: 0,
    })
  }

  // ---------------------------------------
  // 📊 Fill buckets
  // ---------------------------------------
  data.forEach((item) => {
    const value = item[field]

    if (typeof value !== "number") return

    const index = Math.floor((value - min) / bucketSize)

    if (index >= 0 && index < buckets.length) {
      buckets[index].count += 1
    }

    // Edge case: max value (e.g., 100)
    if (value === max) {
      buckets[buckets.length - 1].count += 1
    }
  })

  // ---------------------------------------
  // 🎯 Clean output (chart friendly)
  // ---------------------------------------
  return buckets.map(({ range, count }) => ({
    range,
    count,
  }))
}
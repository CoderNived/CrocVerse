import { useNavigate } from 'react-router-dom'

const BADGE_COLORS = {
  blue: 'bg-blue-100 text-blue-800',
  green: 'bg-green-100 text-green-800',
  amber: 'bg-amber-100 text-amber-800',
  red: 'bg-red-100 text-red-800',
  purple: 'bg-purple-100 text-purple-800',
}

export default function ToolCard({ tool }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/ml-tools/${tool.id}`)
  }

  return (
    <div
      onClick={handleClick}
      className="bg-gray-900 border border-gray-700 rounded-xl p-6 cursor-pointer hover:border-green-500 hover:scale-105 transition-all group"
    >
      {/* Icon */}
      <div className="text-3xl mb-4">{tool.icon}</div>

      {/* Category Badge */}
      <span
        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${
          BADGE_COLORS[tool.color] || BADGE_COLORS.blue
        }`}
      >
        {tool.category}
      </span>

      {/* Tool Name */}
      <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-green-400 transition">
        {tool.name}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-4">
        {tool.description}
      </p>

      {/* CTA */}
      <div className="text-green-400 text-sm font-medium group-hover:underline">
        Launch Tool →
      </div>
    </div>
  )
}
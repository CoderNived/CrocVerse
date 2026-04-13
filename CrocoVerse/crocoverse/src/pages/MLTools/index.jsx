import { ML_TOOLS } from '../../Constants/mlToolsConfig'
import ToolCard from '../../components/shared/ToolCard'

export default function MLToolsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">
          ML Tools
        </h1>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Powered by machine learning models trained on real crocodilian research data.
          Select a tool to get started.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ML_TOOLS.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

    </div>
  )
}
import { useState } from 'react'

export default function ToolInputForm({ fields, onSubmit }) {
  const initialState = Object.fromEntries(
    fields.map(f => [f.id, f.defaultValue ?? ''])
  )

  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})

  const update = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }))
    setErrors(prev => ({ ...prev, [id]: false }))
  }

  const handleSubmit = () => {
    const newErrors = {}

    fields.forEach(f => {
      if (f.required && !formData[f.id] && formData[f.id] !== 0) {
        newErrors[f.id] = true
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(formData)
  }

  const renderField = (field) => {
    const base = `w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
      errors[field.id]
        ? 'border-red-400 bg-red-50'
        : 'border-gray-200'
    }`

    // 🔽 SELECT
    if (field.type === 'select') {
      return (
        <select
          value={formData[field.id]}
          onChange={(e) => update(field.id, e.target.value)}
          className={base}
        >
          <option value="">Select...</option>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )
    }

    // 🔽 NUMBER INPUT
    if (field.type === 'number') {
      return (
        <input
          type="number"
          value={formData[field.id]}
          onChange={(e) => update(field.id, Number(e.target.value))}
          placeholder={field.placeholder}
          min={field.min}
          max={field.max}
          className={base}
        />
      )
    }

    // 🔽 SLIDER
    if (field.type === 'slider') {
      return (
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={field.min}
            max={field.max}
            value={formData[field.id]}
            onChange={(e) => update(field.id, Number(e.target.value))}
            className="flex-1 accent-green-500"
          />
          <span className="text-sm text-gray-300">
            {formData[field.id] ?? field.min}
          </span>
        </div>
      )
    }

    // 🔽 TOGGLE
    if (field.type === 'toggle') {
      return (
        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={!!formData[field.id]}
              onChange={(e) => update(field.id, e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
          </label>
          <span className="text-sm text-gray-300">
            {formData[field.id] ? 'Yes' : 'No'}
          </span>
        </div>
      )
    }

    return null
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-6">
      
      {/* Title */}
      <h2 className="text-xl font-semibold text-white">
        Input Parameters
      </h2>

      {/* Fields */}
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.id}>
            
            {/* Label */}
            <label className="block text-sm text-gray-300 mb-1">
              {field.label}
              {field.required && (
                <span className="text-red-400 ml-1">*</span>
              )}
            </label>

            {/* Input */}
            {renderField(field)}

            {/* Error */}
            {errors[field.id] && (
              <p className="text-red-400 text-xs mt-1">
                This field is required
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-lg transition"
      >
        Run Model
      </button>
    </div>
  )
}
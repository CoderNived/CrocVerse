export default function ErrorAlert({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="border border-red-200 bg-red-50 rounded-xl p-6 text-center">
      <p className="text-red-700 font-medium mb-4">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-500 transition-colors">
          Try Again
        </button>
      )}
    </div>
  )
}
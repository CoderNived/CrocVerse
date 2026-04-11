import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-semibold mb-2">CrocoVerse</h3>
          <p className="text-sm">The world's crocodilian encyclopedia.</p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Explore</h3>
          <ul className="text-sm space-y-1">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/species" className="hover:text-white">Species</Link></li>
            <li><Link to="/ml-tools" className="hover:text-white">ML Tools</Link></li>
            <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">About</h3>
          <p className="text-sm">Built with React + Vite.</p>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-4 text-xs">
        © {new Date().getFullYear()} CrocoVerse. All rights reserved.
      </div>
    </footer>
  )
}
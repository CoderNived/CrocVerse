import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Species', to: '/species' },
  { label: 'ML Tools', to: '/ml-tools' },
  { label: 'Dashboard', to: '/dashboard' },
]
export default function Navbar() {
  const { pathname } = useLocation()
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold tracking-tight">CrocoVerse</Link>
      <div className="flex items-center gap-6">
        {navLinks.map(link => (
          <Link key={link.to} to={link.to}
            className={pathname === link.to
              ? 'text-green-400 font-medium'
              : 'text-gray-300 hover:text-white transition-colors'}
          >{link.label}</Link>
        ))}
        <div className="w-8" />
      </div>
    </nav>
  )
}
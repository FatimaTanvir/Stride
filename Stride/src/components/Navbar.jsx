import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext.jsx'
import DarkModeToggle from './DarkModeToggle.jsx'

const Navbar = () => {
  const { isDarkMode } = useTheme()
  
  return (
    <nav style={{
      width: '100%',
      backgroundColor: isDarkMode ? 'var(--card-dark)' : 'var(--card-light)',
      borderBottom: `2px solid ${isDarkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: isDarkMode ? 'var(--shadow-dark)' : 'var(--shadow-light)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '15px',
        paddingBottom: '15px'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Stride</span>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/feed" style={{ fontWeight: '600' }}>Home</Link>
          <Link to="/create" style={{ fontWeight: '600' }}>Create Post</Link>
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  )
}

export default Navbar

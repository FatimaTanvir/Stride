import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext.jsx'

const Landing = () => {
  const { isDarkMode } = useTheme()

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://cdn-3.expansion.mx/dims4/default/1471651/2147483647/strip/true/crop/1251x838+0+0/resize/1800x1206!/format/webp/quality/80/?url=https%3A%2F%2Fcdn-3.expansion.mx%2Fcd%2F24%2Faf3e503f467c8e3b16e097d39ed2%2Frunners-maraton.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: 'white'
    }}>
      <div style={{ maxWidth: '800px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', margin: 0 }}>Welcome to Stride</h1>
        </div>
        
        <p style={{ 
          fontSize: '24px', 
          marginBottom: '40px',
          lineHeight: '1.5',
          opacity: 0.9
        }}>
          Connect with fellow runners, share your experiences, and discover new routes. 
          Join our community of passionate runners from around the world.
        </p>
        
        <Link to="/feed">
          <button className="btn-primary" style={{ fontSize: '18px', padding: '16px 32px' }}>
            Start Running Together
          </button>
        </Link>
        
        <p style={{ 
          marginTop: '40px', 
          fontSize: '14px', 
          opacity: 0.7,
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          © 2025 Stride. Made by runners, for runners.
        </p>
      </div>
    </div>
  )
}

export default Landing

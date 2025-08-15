import { useTheme } from '../contexts/ThemeContext.jsx'

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      style={{
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '50%',
        transition: 'all 0.3s ease'
      }}
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  )
}

export default DarkModeToggle

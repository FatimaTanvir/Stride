import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext.jsx'

const CategoryFilter = ({ onFilterChange, sortBy, onSortChange }) => {
  const { isDarkMode } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  const categories = {
    nutrition: ['Nutrition', 'Hydration', 'Pre-Run', 'Post-Run'],
    runs: ['5K', '10K', 'Half Marathon', 'Marathon'],
    gear: ['Shoes', 'Clothing', 'Watches'],
    experience: ['Training', 'Race Day', 'Recovery'],
    community: ['Events', 'Groups', 'Challenges']
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    onFilterChange({ category, searchTerm })
  }

  const handleSearchChange = (term) => {
    setSearchTerm(term)
    onFilterChange({ category: selectedCategory, searchTerm: term })
  }

  return (
    <div style={{ 
      marginBottom: '20px',
      width: '100%',
      backgroundColor: isDarkMode ? 'var(--card-dark)' : 'var(--card-light)',
      borderBottom: `1px solid ${isDarkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
      padding: '15px 0'
    }}>
      <div style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            style={{ 
              width: '100%',
              padding: '12px 16px',
              fontSize: '16px',
              borderRadius: '8px',
              border: `2px solid ${isDarkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
              backgroundColor: isDarkMode ? 'var(--card-dark)' : 'var(--background-light)',
              color: isDarkMode ? 'var(--text-dark)' : 'var(--text-light)'
            }}
          />
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleCategoryChange('')}
              className={selectedCategory === '' ? 'btn-primary' : 'btn-outline'}
              style={{ padding: '8px 16px', fontSize: '14px' }}
            >
              All
            </button>
            {Object.entries(categories).map(([key, tags]) => (
              <button
                key={key}
                onClick={() => handleCategoryChange(key)}
                className={selectedCategory === key ? 'btn-primary' : 'btn-outline'}
                style={{ padding: '8px 16px', fontSize: '14px' }}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Sort Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                border: `2px solid ${isDarkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
                borderRadius: '8px',
                backgroundColor: isDarkMode ? 'var(--card-dark)' : 'var(--background-light)',
                color: isDarkMode ? 'var(--text-dark)' : 'var(--text-light)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Sort: {sortBy === 'newest' ? 'Newest' : sortBy === 'oldest' ? 'Oldest' : 'Most Cheers'}
              <span>▼</span>
            </button>
            
            {showSortDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                backgroundColor: isDarkMode ? 'var(--card-dark)' : 'var(--background-light)',
                border: `1px solid ${isDarkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 1000,
                minWidth: '150px',
                marginTop: '4px'
              }}>
                <button
                  onClick={() => {
                    onSortChange('newest')
                    setShowSortDropdown(false)
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    textAlign: 'left',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: isDarkMode ? 'var(--text-dark)' : 'var(--text-light)',
                    cursor: 'pointer',
                    fontSize: '14px',
                    borderBottom: `1px solid ${isDarkMode ? 'var(--border-dark)' : 'var(--border-light)'}`
                  }}
                >
                  Newest
                </button>
                <button
                  onClick={() => {
                    onSortChange('oldest')
                    setShowSortDropdown(false)
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    textAlign: 'left',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: isDarkMode ? 'var(--text-dark)' : 'var(--text-light)',
                    cursor: 'pointer',
                    fontSize: '14px',
                    borderBottom: `1px solid ${isDarkMode ? 'var(--border-dark)' : 'var(--border-light)'}`
                  }}
                >
                  Oldest
                </button>
                <button
                  onClick={() => {
                    onSortChange('cheers')
                    setShowSortDropdown(false)
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    textAlign: 'left',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: isDarkMode ? 'var(--text-dark)' : 'var(--text-light)',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Most Cheers
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryFilter

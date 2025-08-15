import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import { formatDate } from '../utils/dateUtils.js'
import { postsApi, realtimeApi } from '../services/api.js'
import '../components/MasonryGrid.css'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [sortBy, setSortBy] = useState('newest')

  // Load posts from Supabase
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await postsApi.getAll()
        setPosts(data)
        setFilteredPosts(data)
      } catch (error) {
        console.error('Error loading posts:', error)
        // Fallback to mock data if Supabase is not available
        const mockPosts = [
          {
            id: 1,
            title: "Amazing 10K Run This Morning!",
            content: "Just completed my fastest 10K ever! The weather was perfect and I felt incredible throughout the entire run.",
            image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tags: ["10K", "Training"],
            upvotes_count: 24,
            comment_count: 5,
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 2,
            title: "New Running Shoes Review",
            content: "Just got my hands on the latest Nike Air Zoom. These shoes are incredible for long-distance runs!",
            image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            tags: ["Gear", "Shoes"],
            upvotes_count: 15,
            comment_count: 3,
            created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
          }
        ]
        setPosts(mockPosts)
        setFilteredPosts(mockPosts)
      }
    }

    loadPosts()

    // Set up real-time subscription
    const subscription = realtimeApi.subscribeToPosts((payload) => {
      if (payload.eventType === 'INSERT') {
        setPosts(prev => [payload.new, ...prev])
        setFilteredPosts(prev => [payload.new, ...prev])
      } else if (payload.eventType === 'UPDATE') {
        setPosts(prev => prev.map(post => post.id === payload.new.id ? payload.new : post))
        setFilteredPosts(prev => prev.map(post => post.id === payload.new.id ? payload.new : post))
      } else if (payload.eventType === 'DELETE') {
        setPosts(prev => prev.filter(post => post.id !== payload.old.id))
        setFilteredPosts(prev => prev.filter(post => post.id !== payload.old.id))
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleFilterChange = ({ category, searchTerm }) => {
    let filtered = posts

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (category) {
      const categoryTags = {
        nutrition: ['Nutrition', 'Hydration', 'Pre-Run', 'Post-Run'],
        runs: ['5K', '10K', 'Half Marathon', 'Marathon'],
        gear: ['Shoes', 'Clothing', 'Watches'],
        experience: ['Training', 'Race Day', 'Recovery'],
        community: ['Events', 'Groups', 'Challenges']
      }
      
      filtered = filtered.filter(post =>
        post.tags.some(tag => categoryTags[category].includes(tag))
      )
    }

    setFilteredPosts(filtered)
  }

  const handleSort = (sortType) => {
    setSortBy(sortType)
    const sorted = [...filteredPosts].sort((a, b) => {
      if (sortType === 'newest') {
        const dateA = new Date(a.created_at || 0)
        const dateB = new Date(b.created_at || 0)
        return dateB - dateA
      } else if (sortType === 'oldest') {
        const dateA = new Date(a.created_at || 0)
        const dateB = new Date(b.created_at || 0)
        return dateA - dateB
      } else if (sortType === 'cheers') {
        return (b.upvotes_count || 0) - (a.upvotes_count || 0)
      }
      return 0
    })
    setFilteredPosts(sorted)
  }

  return (
    <div>
      <Navbar />
      
      <CategoryFilter 
        onFilterChange={handleFilterChange} 
        sortBy={sortBy}
        onSortChange={handleSort}
      />

      <div className="masonry-grid">
        {filteredPosts.map(post => (
          <div key={post.id} className="masonry-item">
            <div className="card">
              {post.image_url && (
                <img 
                  src={post.image_url} 
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    marginBottom: '16px'
                  }}
                />
              )}
              
              <h3 style={{ 
                marginBottom: '12px', 
                fontSize: '20px',
                fontWeight: '600',
                lineHeight: '1.3'
              }}>
                <Link to={`/post/${post.id}`} style={{ color: 'inherit' }}>
                  {post.title}
                </Link>
              </h3>
              
              <p style={{ 
                marginBottom: '16px', 
                color: 'inherit',
                opacity: 0.8,
                lineHeight: '1.6',
                fontSize: '15px'
              }}>
                {post.content.length > 150 
                  ? `${post.content.substring(0, 150)}...` 
                  : post.content
                }
              </p>
              
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {post.tags.map(tag => (
                  <span key={tag} style={{
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                fontSize: '14px',
                opacity: 0.7,
                paddingTop: '12px',
                borderTop: '1px solid var(--border-light)',
                color: 'inherit'
              }}>
                <span>👏 {post.upvotes_count || 0}</span>
                <span>💬 {post.comment_count || 0}</span>
                <span>{formatDate(post.created_at)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home

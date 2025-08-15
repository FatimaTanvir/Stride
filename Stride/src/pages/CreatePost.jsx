import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { postsApi } from '../services/api.js'

const CreatePost = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    tags: []
  })
  const [customTag, setCustomTag] = useState('')

  const predefinedTags = {
    nutrition: ['Nutrition', 'Hydration', 'Pre-Run', 'Post-Run'],
    runs: ['5K', '10K', 'Half Marathon', 'Marathon'],
    gear: ['Shoes', 'Clothing', 'Watches'],
    experience: ['Training', 'Race Day', 'Recovery'],
    community: ['Events', 'Groups', 'Challenges']
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const addTag = (tag) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }))
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      alert('Title is required!')
      return
    }

    try {
      const postData = {
        title: formData.title,
        content: formData.content,
        image_url: formData.imageUrl,
        tags: formData.tags,
        upvotes_count: 0,
        created_at: new Date().toISOString()
      }

      await postsApi.create(postData)
      
      // Navigate back to feed without animation
      navigate('/feed', { replace: true })
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Failed to create post. Please try again.')
    }
  }

  return (
    <div className="container">
      <Navbar />
      
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>Create New Post</h1>
        
        <form onSubmit={handleSubmit} className="card">
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter your post title..."
              style={{ width: '100%' }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Share your running experience..."
              rows="6"
              style={{ width: '100%', resize: 'vertical' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Image URL (optional)
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Tags
            </label>
            
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {Object.entries(predefinedTags).map(([category, tags]) => (
                  <div key={category} style={{ marginBottom: '10px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px', textTransform: 'capitalize' }}>
                      {category}:
                    </div>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      {tags.map(tag => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => addTag(tag)}
                          disabled={formData.tags.includes(tag)}
                          style={{
                            padding: '4px 8px',
                            fontSize: '12px',
                            borderRadius: '12px',
                            border: '1px solid var(--primary-color)',
                            background: formData.tags.includes(tag) ? 'var(--primary-color)' : 'transparent',
                            color: formData.tags.includes(tag) ? 'white' : 'var(--primary-color)',
                            cursor: formData.tags.includes(tag) ? 'default' : 'pointer'
                          }}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <input
                type="text"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                placeholder="Add custom tag..."
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={() => {
                  if (customTag.trim()) {
                    addTag(customTag.trim())
                    setCustomTag('')
                  }
                }}
                className="btn-secondary"
              >
                Add
              </button>
            </div>

            {formData.tags.length > 0 && (
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                  Selected Tags:
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {formData.tags.map(tag => (
                    <span key={tag} style={{
                      backgroundColor: 'var(--primary-color)',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '16px',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '16px',
                          padding: '0',
                          margin: '0'
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => navigate('/feed')}
              className="btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost

import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { formatDate, formatFullDate } from '../utils/dateUtils.js'
import { postsApi, commentsApi, realtimeApi } from '../services/api.js'

const PostDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ title: '', content: '', imageUrl: '', tags: [] })
  const [customTag, setCustomTag] = useState('')

  // Load post and comments from Supabase
  useEffect(() => {
    const loadPostAndComments = async () => {
      try {
        const [postData, commentsData] = await Promise.all([
          postsApi.getById(id),
          commentsApi.getByPostId(id)
        ])

        if (postData) {
          setPost(postData)
          setEditData({
            title: postData.title,
            content: postData.content,
            imageUrl: postData.image_url,
            tags: [...(postData.tags || [])]
          })
        }
        
        if (commentsData) {
          setComments(commentsData)
        }
      } catch (error) {
        console.error('Error loading post:', error)
        // Fallback to mock data
        const mockPost = {
          id: parseInt(id),
          title: "Amazing 10K Run This Morning!",
          content: "Just completed my fastest 10K ever! The weather was perfect and I felt incredible throughout the entire run.",
          image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          tags: ["10K", "Training"],
          upvotes_count: 24,
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        }
        setPost(mockPost)
        setEditData({
          title: mockPost.title,
          content: mockPost.content,
          imageUrl: mockPost.image_url,
          tags: [...mockPost.tags]
        })
      }
    }

    loadPostAndComments()

    // Set up real-time subscription for comments
    const subscription = realtimeApi.subscribeToComments((payload) => {
      if (payload.new.post_id === parseInt(id)) {
        if (payload.eventType === 'INSERT') {
          setComments(prev => [payload.new, ...prev])
        } else if (payload.eventType === 'UPDATE') {
          setComments(prev => prev.map(comment => comment.id === payload.new.id ? payload.new : comment))
        } else if (payload.eventType === 'DELETE') {
          setComments(prev => prev.filter(comment => comment.id !== payload.old.id))
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [id])

  const handleCheer = async () => {
    try {
      const updatedPost = await postsApi.incrementCheers(post.id)
      setPost(updatedPost)
    } catch (error) {
      console.error('Error cheering post:', error)
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      const commentData = {
        post_id: parseInt(id),
        author: "You",
        content: newComment
      }

      await commentsApi.create(commentData)
      setNewComment('')
    } catch (error) {
      console.error('Error adding comment:', error)
      alert('Failed to add comment. Please try again.')
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      const updates = {
        title: editData.title,
        content: editData.content,
        image_url: editData.imageUrl,
        tags: editData.tags
      }

      const updatedPost = await postsApi.update(post.id, updates)
      setPost(updatedPost)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating post:', error)
      alert('Failed to update post. Please try again.')
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postsApi.delete(post.id)
        navigate('/feed')
      } catch (error) {
        console.error('Error deleting post:', error)
        alert('Failed to delete post. Please try again.')
      }
    }
  }

  const addTag = (tag) => {
    if (tag && !editData.tags.includes(tag)) {
      setEditData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }))
    }
  }

  const removeTag = (tagToRemove) => {
    setEditData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  if (!post) return <div>Loading...</div>

  const predefinedTags = {
    nutrition: ['Nutrition', 'Hydration', 'Pre-Run', 'Post-Run'],
    runs: ['5K', '10K', 'Half Marathon', 'Marathon'],
    gear: ['Shoes', 'Clothing', 'Watches'],
    experience: ['Training', 'Race Day', 'Recovery'],
    community: ['Events', 'Groups', 'Challenges']
  }

  return (
    <div className="container">
      <Navbar />
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="card">
            <h2 style={{ marginBottom: '20px' }}>Edit Post</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Title
              </label>
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                style={{ width: '100%' }}
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Content
              </label>
              <textarea
                value={editData.content}
                onChange={(e) => setEditData(prev => ({ ...prev, content: e.target.value }))}
                rows="8"
                style={{ width: '100%', resize: 'vertical' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Image URL
              </label>
              <input
                type="url"
                value={editData.imageUrl}
                onChange={(e) => setEditData(prev => ({ ...prev, imageUrl: e.target.value }))}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Tags
              </label>
              
              <div style={{ marginBottom: '15px' }}>
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
                          disabled={editData.tags.includes(tag)}
                          style={{
                            padding: '4px 8px',
                            fontSize: '12px',
                            borderRadius: '12px',
                            border: '1px solid var(--primary-color)',
                            background: editData.tags.includes(tag) ? 'var(--primary-color)' : 'transparent',
                            color: editData.tags.includes(tag) ? 'white' : 'var(--primary-color)',
                            cursor: editData.tags.includes(tag) ? 'default' : 'pointer'
                          }}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
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

              {editData.tags.length > 0 && (
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                    Selected Tags:
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {editData.tags.map(tag => (
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
                onClick={() => setIsEditing(false)}
                className="btn-outline"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <h1 style={{ margin: 0, fontSize: '32px' }}>{post.title}</h1>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setIsEditing(true)} className="btn-outline">
                  Edit
                </button>
                <button onClick={handleDelete} style={{ backgroundColor: '#dc2626', color: 'white' }}>
                  Delete
                </button>
              </div>
            </div>

            {post.image_url && (
              <img 
                src={post.image_url} 
                alt={post.title}
                style={{
                  width: '100%',
                  maxHeight: '400px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '20px'
                }}
              />
            )}

            <p style={{ 
              marginBottom: '20px', 
              lineHeight: '1.8',
              fontSize: '16px'
            }}>
              {post.content}
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {post.tags.map(tag => (
                <span key={tag} style={{
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '14px',
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
              padding: '20px 0',
              borderTop: '1px solid var(--border-light)',
              borderBottom: '1px solid var(--border-light)',
              marginBottom: '30px'
            }}>
              <button onClick={handleCheer} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer'
              }}>
                👏 {post.upvotes_count || 0}
              </button>
              <span style={{ opacity: 0.7 }}>{formatFullDate(post.created_at)}</span>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ marginBottom: '20px' }}>Comments ({comments.length})</h3>
              
              <form onSubmit={handleAddComment} style={{ marginBottom: '20px' }}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  rows="3"
                  style={{ width: '100%', marginBottom: '10px' }}
                />
                <button type="submit" className="btn-primary">
                  Post Comment
                </button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {comments.map(comment => (
                  <div key={comment.id} style={{
                    padding: '16px',
                    backgroundColor: 'var(--card-light)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <strong>{comment.author}</strong>
                                          <span style={{ fontSize: '14px', opacity: 0.7 }}>
                      {formatDate(comment.created_at)}
                    </span>
                    </div>
                    <p style={{ margin: 0, lineHeight: '1.5' }}>{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostDetail

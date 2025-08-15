import { supabase } from '../lib/supabase.js'

// Posts API
export const postsApi = {
  // Get all posts with comment counts
  async getAll() {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        comments:comments(count)
      `)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching posts:', error)
      return []
    }
    
    // Transform the data to include comment count
    return (data || []).map(post => ({
      ...post,
      comment_count: post.comments?.[0]?.count || 0
    }))
  },

  // Get single post by ID
  async getById(id) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching post:', error)
      return null
    }
    return data
  },

  // Create new post
  async create(postData) {
    const { data, error } = await supabase
      .from('posts')
      .insert([postData])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating post:', error)
      throw error
    }
    return data
  },

  // Update post
  async update(id, updates) {
    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating post:', error)
      throw error
    }
    return data
  },

  // Delete post
  async delete(id) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting post:', error)
      throw error
    }
    return true
  },

  // Increment upvotes count
  async incrementCheers(id) {
    // First get current upvotes count
    const { data: currentPost, error: fetchError } = await supabase
      .from('posts')
      .select('upvotes_count')
      .eq('id', id)
      .single()
    
    if (fetchError) {
      console.error('Error fetching current upvotes:', fetchError)
      throw fetchError
    }

    // Then increment it
    const { data, error } = await supabase
      .from('posts')
      .update({ upvotes_count: (currentPost.upvotes_count || 0) + 1 })
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error incrementing upvotes:', error)
      throw error
    }
    return data
  }
}

// Comments API
export const commentsApi = {
  // Get comments for a post
  async getByPostId(postId) {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching comments:', error)
      return []
    }
    return data || []
  },

  // Create new comment
  async create(commentData) {
    const { data, error } = await supabase
      .from('comments')
      .insert([commentData])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating comment:', error)
      throw error
    }
    return data
  },

  // Update comment
  async update(id, updates) {
    const { data, error } = await supabase
      .from('comments')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating comment:', error)
      throw error
    }
    return data
  },

  // Delete comment
  async delete(id) {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting comment:', error)
      throw error
    }
    return true
  }
}

// Real-time subscriptions
export const realtimeApi = {
  // Subscribe to posts changes
  subscribeToPosts(callback) {
    return supabase
      .channel('posts')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'posts' 
      }, callback)
      .subscribe()
  },

  // Subscribe to comments changes
  subscribeToComments(callback) {
    return supabase
      .channel('comments')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'comments' 
      }, callback)
      .subscribe()
  }
}

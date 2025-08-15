export const formatDate = (dateString) => {
  if (!dateString) return 'Unknown'
  
  const date = new Date(dateString)
  const now = new Date()
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid date'
  }
  
  const diffInSeconds = Math.floor((now - date) / 1000)
  
  if (diffInSeconds < 60) {
    return 'Just now'
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours}h ago`
  }
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays}d ago`
  }
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export const formatFullDate = (dateString) => {
  if (!dateString) return 'Unknown'
  
  const date = new Date(dateString)
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid date'
  }
  
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

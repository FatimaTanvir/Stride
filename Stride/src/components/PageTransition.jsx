import { useEffect, useState } from 'react'

const PageTransition = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className={`page-transition ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  )
}

export default PageTransition

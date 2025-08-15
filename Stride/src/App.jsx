import { Routes, Route } from 'react-router-dom'
import { useTheme } from './contexts/ThemeContext.jsx'
import Landing from './pages/Landing.jsx'
import Home from './pages/Home.jsx'
import CreatePost from './pages/CreatePost.jsx'
import PostDetail from './pages/PostDetail.jsx'
import PageTransition from './components/PageTransition.jsx'
import './App.css'

function App() {
  const { isDarkMode } = useTheme()

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route 
          path="/feed" 
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          } 
        />
        <Route 
          path="/create" 
          element={
            <PageTransition>
              <CreatePost />
            </PageTransition>
          } 
        />
        <Route 
          path="/post/:id" 
          element={
            <PageTransition>
              <PostDetail />
            </PageTransition>
          } 
        />
      </Routes>
    </div>
  )
}

export default App

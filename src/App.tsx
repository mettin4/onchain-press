import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Write from './pages/Write'
import Article from './pages/Article'
import Latest from './pages/Latest'
import Topics from './pages/Topics'
import Writers from './pages/Writers'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<Write />} />
        <Route path="/article/:author/:blobName" element={<Article />} />
        <Route path="/latest" element={<Latest />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/writers" element={<Writers />} />
      </Routes>
    </div>
  )
}

export default App
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LiveDetect from './pages/LiveDetect'
import UploadAnalyze from './pages/UploadAnalyze'
import SourceIdentification from './pages/SourceIdentification'
import Logs from './pages/Logs'
import Navigation from './components/Navigation'
import MatrixBackground from './components/MatrixBackground'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-cyber-black relative">
        <MatrixBackground />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/live-detect" element={<LiveDetect />} />
          <Route path="/upload-analyze" element={<UploadAnalyze />} />
          <Route path="/source-identification" element={<SourceIdentification />} />
          <Route path="/logs" element={<Logs />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

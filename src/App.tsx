import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Opponents from './pages/Opponents'
import PlayerProfile from './pages/PlayerProfile'
import Tactics from './pages/Tactics'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players/:id" element={<PlayerProfile />} />
          <Route path="/tactics" element={<Tactics />} />
          <Route path="/opponents" element={<Opponents />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

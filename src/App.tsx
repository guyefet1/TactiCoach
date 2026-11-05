import type { ReactNode } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'

function Home() {
  return (
    <Page title="Squad">
      <p>Player roster will appear here.</p>
    </Page>
  )
}

function PlayerProfile() {
  return (
    <Page title="Player Profile">
      <p>Player details will appear here.</p>
    </Page>
  )
}

function Tactics() {
  return (
    <Page title="Tactics">
      <p>The tactics board will appear here.</p>
    </Page>
  )
}

function Opponents() {
  return (
    <Page title="Opponents">
      <p>League opponents will appear here.</p>
    </Page>
  )
}

function Page({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="page">
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink className="brand" to="/">
          TactiCoach
        </NavLink>
        <nav className="navigation" aria-label="Main navigation">
          <NavLink to="/" end>
            Squad
          </NavLink>
          <NavLink to="/players/placeholder">Player Profile</NavLink>
          <NavLink to="/tactics">Tactics</NavLink>
          <NavLink to="/opponents">Opponents</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players/:id" element={<PlayerProfile />} />
          <Route path="/tactics" element={<Tactics />} />
          <Route path="/opponents" element={<Opponents />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

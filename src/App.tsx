import { useEffect, useState, type ReactNode } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import {
  parseTheSportsDbPlayersResponse,
  type TheSportsDbPlayer,
} from './types/player'
import './App.css'

function Home() {
  const [players, setPlayers] = useState<TheSportsDbPlayer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadPlayers() {
      try {
        const response = await fetch(
          'https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?t=Maccabi%20Tel%20Aviv',
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error(`TheSportsDB returned an HTTP ${response.status} error.`)
        }

        const data: unknown = await response.json()
        const result = parseTheSportsDbPlayersResponse(data)
        setPlayers(result.player ?? [])
      } catch (loadError) {
        if (loadError instanceof Error && loadError.name === 'AbortError') {
          return
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : 'An unexpected error occurred while loading the squad.',
        )
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadPlayers()
    return () => controller.abort()
  }, [])

  return (
    <Page
      title="Maccabi Tel Aviv Squad"
      description="Meet the players representing Maccabi Tel Aviv."
    >
      {isLoading ? (
        <div className="loading-state" role="status">
          <span className="loading-spinner" aria-hidden="true" />
          <span>Loading squad...</span>
        </div>
      ) : error ? (
        <div className="error-state" role="alert">
          <h2>Could not load the squad</h2>
          <p>{error}</p>
        </div>
      ) : players.length === 0 ? (
        <p className="empty-state">No players were found for Maccabi Tel Aviv.</p>
      ) : (
        <ul className="player-grid">
          {players.map((player) => {
            const imageUrl = player.strRender?.trim() || player.strThumb?.trim()

            return (
              <li className="player-card" key={player.idPlayer}>
                {imageUrl ? (
                  <img
                    className="player-image"
                    src={imageUrl}
                    alt={player.strPlayer}
                    loading="lazy"
                  />
                ) : (
                  <div className="player-image player-image-placeholder" aria-hidden="true">
                    <span>{player.strPlayer.charAt(0)}</span>
                  </div>
                )}
                <div className="player-card-content">
                  <h2>{player.strPlayer}</h2>
                  <p>{player.strPosition?.trim() || 'Position not listed'}</p>
                </div>
              </li>
            )
          })}
        </ul>
      )}
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
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="page">
      <header className="page-heading">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </header>
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

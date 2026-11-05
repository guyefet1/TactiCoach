import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import {
  parseTheSportsDbPlayerProfileResponse,
  parseTheSportsDbPlayersResponse,
  type TheSportsDbPlayer,
  type TheSportsDbPlayerProfile,
} from './types/player'
import './App.css'

const fallbackPlayers: TheSportsDbPlayer[] = [
  {
    idPlayer: 'fallback-bukayo-saka',
    strPlayer: 'Bukayo Saka',
    strRender: null,
    strThumb:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Bukayo_Saka_England_v_Ghana_23_June_2026-057_%28cropped%29.jpg/500px-Bukayo_Saka_England_v_Ghana_23_June_2026-057_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    strPosition: 'Forward',
  },
  {
    idPlayer: 'fallback-martin-odegaard',
    strPlayer: 'Martin Odegaard',
    strRender: null,
    strThumb:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/Martin_Odegaard_France_v_Norway_26_June_26-014.jpg/500px-Martin_Odegaard_France_v_Norway_26_June_26-014.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    strPosition: 'Midfielder',
  },
  {
    idPlayer: 'fallback-declan-rice',
    strPlayer: 'Declan Rice',
    strRender: null,
    strThumb:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Declan_Rice_England_v_Ghana_23_June_2026-150.jpg/500px-Declan_Rice_England_v_Ghana_23_June_2026-150.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    strPosition: 'Midfielder',
  },
]

const fallbackProfiles: Record<string, TheSportsDbPlayerProfile> = {
  'fallback-bukayo-saka': {
    ...fallbackPlayers[0],
    strNationality: 'England',
    strDescriptionEN:
      'Bukayo Saka is an English winger known for his pace, creativity, and attacking threat.',
  },
  'fallback-martin-odegaard': {
    ...fallbackPlayers[1],
    strNationality: 'Norway',
    strDescriptionEN:
      'Martin Odegaard is a Norwegian midfielder known for his vision, technique, and playmaking.',
  },
  'fallback-declan-rice': {
    ...fallbackPlayers[2],
    strNationality: 'England',
    strDescriptionEN:
      'Declan Rice is an English midfielder known for his work rate, ball-winning, and distribution.',
  },
}

function Home() {
  const [players, setPlayers] = useState<TheSportsDbPlayer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUsingFallback, setIsUsingFallback] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPosition, setSelectedPosition] = useState('')

  const filteredPlayers = players.filter((player) => {
    const matchesName = player.strPlayer
      .toLocaleLowerCase()
      .includes(searchQuery.trim().toLocaleLowerCase())
    const matchesPosition =
      !selectedPosition ||
      player.strPosition?.trim().toLocaleLowerCase() ===
        selectedPosition.toLocaleLowerCase()

    return matchesName && matchesPosition
  })

  useEffect(() => {
    const controller = new AbortController()
    const timeoutController = new AbortController()
    const timeoutId = window.setTimeout(() => timeoutController.abort(), 8000)
    const signal = AbortSignal.any([
      controller.signal,
      timeoutController.signal,
    ])

    async function loadPlayers() {
      try {
        const response = await fetch(
          'https://api.allorigins.win/raw?url=https%3A%2F%2Fwww.thesportsdb.com%2Fapi%2Fv1%2Fjson%2F3%2Fsearchplayers.php%3Ft%3DArsenal',
          { signal },
        )

        if (!response.ok) {
          throw new Error(`TheSportsDB returned an HTTP ${response.status} error.`)
        }

        const data: unknown = await response.json()
        const result = parseTheSportsDbPlayersResponse(data)
        if (result.player?.length) {
          setPlayers(result.player)
        } else {
          setPlayers(fallbackPlayers)
          setIsUsingFallback(true)
        }
      } catch {
        if (controller.signal.aborted) {
          return
        }

        setPlayers(fallbackPlayers)
        setIsUsingFallback(true)
      } finally {
        window.clearTimeout(timeoutId)
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadPlayers()
    return () => {
      window.clearTimeout(timeoutId)
      controller.abort()
    }
  }, [])

  return (
    <Page
      title="Arsenal Squad"
      description="Meet the players representing Arsenal."
    >
      {isLoading ? (
        <div className="loading-state" role="status">
          <span className="loading-spinner" aria-hidden="true" />
          <span>Loading squad...</span>
        </div>
      ) : (
        <>
          {isUsingFallback && (
            <p className="fallback-notice" role="status">
              Showing sample Arsenal players because the live roster is unavailable.
            </p>
          )}
          <div className="player-filters">
            <label className="filter-field">
              <span>Search players</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by name"
              />
            </label>
            <label className="filter-field">
              <span>Position</span>
              <select
                value={selectedPosition}
                onChange={(event) => setSelectedPosition(event.target.value)}
              >
                <option value="">All positions</option>
                <option value="Forward">Forward</option>
                <option value="Midfielder">Midfielder</option>
                <option value="Defender">Defender</option>
                <option value="Goalkeeper">Goalkeeper</option>
              </select>
            </label>
          </div>
          {filteredPlayers.length > 0 ? (
            <ul className="player-grid">
              {filteredPlayers.map((player) => {
                const imageUrl = player.strRender?.trim() || player.strThumb?.trim()

                return (
                  <li key={player.idPlayer}>
                    <Link
                      className="player-card"
                      to={`/players/${encodeURIComponent(player.idPlayer)}`}
                    >
                      {imageUrl ? (
                        <img
                          className="player-image"
                          src={imageUrl}
                          alt={player.strPlayer}
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="player-image player-image-placeholder"
                          aria-hidden="true"
                        >
                          <span>{player.strPlayer.charAt(0)}</span>
                        </div>
                      )}
                      <div className="player-card-content">
                        <h2>{player.strPlayer}</h2>
                        <p>{player.strPosition?.trim() || 'Position not listed'}</p>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="empty-state" role="status">
              No players match your search and position filters.
            </p>
          )}
          {isUsingFallback && (
            <p className="image-attribution">
              Sample photos by{' '}
              <a
                href="https://commons.wikimedia.org/wiki/User:Berlination"
                target="_blank"
                rel="noreferrer"
              >
                Bryan Berlin
              </a>
              {' · '}
              <a
                href="https://creativecommons.org/licenses/by-sa/4.0/"
                target="_blank"
                rel="noreferrer"
              >
                CC BY-SA 4.0
              </a>
            </p>
          )}
        </>
      )}
    </Page>
  )
}

function PlayerProfile() {
  const { id } = useParams<{ id: string }>()
  const [player, setPlayer] = useState<TheSportsDbPlayerProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUsingFallback, setIsUsingFallback] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const timeoutController = new AbortController()
    const timeoutId = window.setTimeout(() => timeoutController.abort(), 8000)
    const signal = AbortSignal.any([
      controller.signal,
      timeoutController.signal,
    ])

    async function loadPlayer() {
      if (!id) {
        setIsLoading(false)
        return
      }

      const fallbackProfile = fallbackProfiles[id]

      try {
        if (fallbackProfile) {
          setPlayer(fallbackProfile)
          setIsUsingFallback(true)
          return
        }

        const url = new URL(
          'https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php',
        )
        url.searchParams.set('id', id)
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url.toString())}`
        const response = await fetch(proxyUrl, { signal })

        if (!response.ok) {
          throw new Error(`TheSportsDB returned an HTTP ${response.status} error.`)
        }

        const data: unknown = await response.json()
        const result = parseTheSportsDbPlayerProfileResponse(data)
        const foundPlayer = result.players?.find(
          (profile) => profile.idPlayer === id,
        )

        if (!foundPlayer) {
          throw new Error('The requested player was not found.')
        }

        setPlayer(foundPlayer)
      } catch {
        if (controller.signal.aborted) {
          return
        }

        setPlayer(fallbackProfile ?? null)
        setIsUsingFallback(Boolean(fallbackProfile))
      } finally {
        window.clearTimeout(timeoutId)
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadPlayer()
    return () => {
      window.clearTimeout(timeoutId)
      controller.abort()
    }
  }, [id])

  const imageUrl = player?.strRender?.trim() || player?.strThumb?.trim()

  return (
    <Page title={player?.strPlayer ?? 'Player Profile'}>
      {isLoading ? (
        <div className="loading-state" role="status">
          <span className="loading-spinner" aria-hidden="true" />
          <span>Loading player profile...</span>
        </div>
      ) : player ? (
        <article className="player-profile">
          {isUsingFallback && (
            <p className="fallback-notice" role="status">
              Showing sample profile because live player details are unavailable.
            </p>
          )}
          <div className="profile-card">
            {imageUrl ? (
              <img
                className="profile-image"
                src={imageUrl}
                alt={player.strPlayer}
              />
            ) : (
              <div
                className="profile-image profile-image-placeholder"
                aria-hidden="true"
              >
                {player.strPlayer.charAt(0)}
              </div>
            )}
            <div className="profile-details">
              <p className="profile-nationality">
                {player.strNationality?.trim() || 'Nationality not listed'}
              </p>
              <p>
                {player.strDescriptionEN?.trim() ||
                  'No player description is available.'}
              </p>
            </div>
          </div>
        </article>
      ) : (
        <p className="empty-state" role="status">
          Player details are unavailable.
        </p>
      )}
      <Link className="back-to-squad" to="/">
        Back to Squad
      </Link>
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

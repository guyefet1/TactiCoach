import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import {
  parseTheSportsDbPlayerProfileResponse,
  parseTheSportsDbPlayersResponse,
  type TheSportsDbPlayer,
  type TheSportsDbPlayerProfile,
} from './types/player'
import {
  parseTheSportsDbTeamsResponse,
  type TheSportsDbTeam,
} from './types/team'
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

const tacticsPlayers: TheSportsDbPlayer[] = [
  {
    idPlayer: 'fallback-david-raya',
    strPlayer: 'David Raya',
    strRender: null,
    strThumb: null,
    strPosition: 'Goalkeeper',
  },
  {
    idPlayer: 'fallback-ben-white',
    strPlayer: 'Ben White',
    strRender: null,
    strThumb: null,
    strPosition: 'Defender',
  },
  {
    idPlayer: 'fallback-william-saliba',
    strPlayer: 'William Saliba',
    strRender: null,
    strThumb: null,
    strPosition: 'Defender',
  },
  {
    idPlayer: 'fallback-gabriel-magalhaes',
    strPlayer: 'Gabriel Magalhaes',
    strRender: null,
    strThumb: null,
    strPosition: 'Defender',
  },
  {
    idPlayer: 'fallback-jurrien-timber',
    strPlayer: 'Jurrien Timber',
    strRender: null,
    strThumb: null,
    strPosition: 'Defender',
  },
  {
    idPlayer: 'fallback-declan-rice',
    strPlayer: 'Declan Rice',
    strRender: null,
    strThumb: null,
    strPosition: 'Midfielder',
  },
  {
    idPlayer: 'fallback-martin-odegaard',
    strPlayer: 'Martin Odegaard',
    strRender: null,
    strThumb: null,
    strPosition: 'Midfielder',
  },
  {
    idPlayer: 'fallback-kai-havertz',
    strPlayer: 'Kai Havertz',
    strRender: null,
    strThumb: null,
    strPosition: 'Forward',
  },
  {
    idPlayer: 'fallback-bukayo-saka',
    strPlayer: 'Bukayo Saka',
    strRender: null,
    strThumb: null,
    strPosition: 'Forward',
  },
  {
    idPlayer: 'fallback-gabriel-martinelli',
    strPlayer: 'Gabriel Martinelli',
    strRender: null,
    strThumb: null,
    strPosition: 'Forward',
  },
  {
    idPlayer: 'fallback-leandro-trossard',
    strPlayer: 'Leandro Trossard',
    strRender: null,
    strThumb: null,
    strPosition: 'Forward',
  },
]

const tacticsPlayerById = new Map(
  tacticsPlayers.map((player) => [player.idPlayer, player]),
)

const fallbackTeams: TheSportsDbTeam[] = [
  { idTeam: 'fallback-maccabi-tel-aviv', strTeam: 'Maccabi Tel Aviv', strLocation: 'Tel Aviv', strStadium: 'Bloomfield Stadium' },
  { idTeam: 'fallback-hapoel-beer-sheva', strTeam: 'Hapoel Be\'er Sheva', strLocation: 'Be\'er Sheva', strStadium: 'Toto Turner Stadium' },
  { idTeam: 'fallback-maccabi-haifa', strTeam: 'Maccabi Haifa', strLocation: 'Haifa', strStadium: 'Sammy Ofer Stadium' },
  { idTeam: 'fallback-beitar-jerusalem', strTeam: 'Beitar Jerusalem', strLocation: 'Jerusalem', strStadium: 'Teddy Stadium' },
  { idTeam: 'fallback-hapoel-tel-aviv', strTeam: 'Hapoel Tel Aviv', strLocation: 'Tel Aviv', strStadium: 'Bloomfield Stadium' },
  { idTeam: 'fallback-hapoel-haifa', strTeam: 'Hapoel Haifa', strLocation: 'Haifa', strStadium: 'Sammy Ofer Stadium' },
  { idTeam: 'fallback-maccabi-netanya', strTeam: 'Maccabi Netanya', strLocation: 'Netanya', strStadium: 'Netanya Stadium' },
  { idTeam: 'fallback-bnei-sakhnin', strTeam: 'Bnei Sakhnin', strLocation: 'Sakhnin', strStadium: 'Doha Stadium' },
  { idTeam: 'fallback-hapoel-jerusalem', strTeam: 'Hapoel Jerusalem', strLocation: 'Jerusalem', strStadium: 'Teddy Stadium' },
  { idTeam: 'fallback-ashdod', strTeam: 'Ashdod SC', strLocation: 'Ashdod', strStadium: 'Yud-Alef Stadium' },
  { idTeam: 'fallback-maccabi-petah-tikva', strTeam: 'Maccabi Petah Tikva', strLocation: 'Petah Tikva', strStadium: 'HaMoshava Stadium' },
  { idTeam: 'fallback-hapoel-hadera', strTeam: 'Hapoel Hadera', strLocation: 'Hadera', strStadium: 'Netanya Stadium' },
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
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const selectedPlayers = selectedPlayerIds
    .map((id) => tacticsPlayerById.get(id))
    .filter((player): player is TheSportsDbPlayer => player !== undefined)

  useEffect(() => {
    try {
      const savedSquad = window.localStorage.getItem('tacticCoach_squad')

      if (savedSquad) {
        const parsedSquad: unknown = JSON.parse(savedSquad)
        const isValidSquad =
          Array.isArray(parsedSquad) &&
          parsedSquad.length === 11 &&
          parsedSquad.every(
            (id): id is string =>
              typeof id === 'string' && tacticsPlayerById.has(id),
          ) &&
          new Set(parsedSquad).size === 11

        if (!isValidSquad) {
          throw new Error(
            'The saved lineup is invalid. Select 11 players and save it again.',
          )
        }

        // oxlint-disable-next-line react/set-state-in-effect -- Restore the persisted lineup on mount.
        setSelectedPlayerIds(parsedSquad)
        setMessage('Loaded your saved starting 11.')
      }
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Unable to load the saved lineup from this browser.',
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  function togglePlayer(playerId: string) {
    setError(null)
    setMessage(null)
    setSelectedPlayerIds((currentIds) => {
      if (currentIds.includes(playerId)) {
        return currentIds.filter((id) => id !== playerId)
      }

      if (currentIds.length >= 11) {
        return currentIds
      }

      return [...currentIds, playerId]
    })
  }

  function saveTactics() {
    if (selectedPlayerIds.length !== 11) {
      setError('Select exactly 11 players before saving your tactics.')
      return
    }

    try {
      window.localStorage.setItem(
        'tacticCoach_squad',
        JSON.stringify(selectedPlayerIds),
      )
      setError(null)
      setMessage('Your starting 11 has been saved.')
    } catch {
      setError('Unable to save your lineup to this browser.')
      setMessage(null)
    }
  }

  return (
    <Page
      title="Tactics Board"
      description="Choose exactly 11 players for your starting lineup."
    >
      {isLoading ? (
        <div className="loading-state" role="status">
          <span className="loading-spinner" aria-hidden="true" />
          <span>Loading saved tactics...</span>
        </div>
      ) : (
        <div className="tactics-layout">
          <section className="tactics-roster" aria-labelledby="roster-heading">
            <div className="tactics-section-heading">
              <div>
                <h2 id="roster-heading">Available players</h2>
                <p>Select players to build your starting 11.</p>
              </div>
              <span className="selection-count" aria-live="polite">
                {selectedPlayerIds.length} / 11 selected
              </span>
            </div>
            <ul className="tactics-player-list">
              {tacticsPlayers.map((player) => {
                const isSelected = selectedPlayerIds.includes(player.idPlayer)
                const isUnavailable =
                  !isSelected && selectedPlayerIds.length === 11

                return (
                  <li key={player.idPlayer}>
                    <label
                      className={`tactics-player${isSelected ? ' selected' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        disabled={isUnavailable}
                        onChange={() => togglePlayer(player.idPlayer)}
                      />
                      <span className="tactics-player-info">
                        <span className="tactics-player-name">
                          {player.strPlayer}
                        </span>
                        <span className="tactics-player-position">
                          {player.strPosition}
                        </span>
                      </span>
                      <span className="selection-indicator" aria-hidden="true">
                        {isSelected ? 'Selected' : 'Add'}
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </section>

          <aside className="starting-eleven" aria-labelledby="starting-heading">
            <div className="tactics-section-heading">
              <div>
                <h2 id="starting-heading">Starting 11</h2>
                <p>Your selected lineup</p>
              </div>
            </div>
            {selectedPlayers.length > 0 ? (
              <ol className="starting-player-list">
                {selectedPlayers.map((player) => (
                  <li key={player.idPlayer}>
                    <span>{player.strPlayer}</span>
                    <span>{player.strPosition}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="starting-empty">
                Your selected players will appear here.
              </p>
            )}
            <button
              className="save-tactics-button"
              type="button"
              disabled={selectedPlayerIds.length !== 11}
              onClick={saveTactics}
            >
              Save Tactics
            </button>
            {error && (
              <p className="tactics-message error-message" role="alert">
                {error}
              </p>
            )}
            {message && (
              <p className="tactics-message success-message" role="status">
                {message}
              </p>
            )}
          </aside>
        </div>
      )}
    </Page>
  )
}

function Opponents() {
  const [teams, setTeams] = useState<TheSportsDbTeam[]>([])
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

    async function loadTeams() {
      try {
        const response = await fetch(
          'https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=Israeli%20Premier%20League',
          { signal },
        )

        if (!response.ok) {
          throw new Error(`TheSportsDB returned an HTTP ${response.status} error.`)
        }

        const data: unknown = await response.json()
        const result = parseTheSportsDbTeamsResponse(data)
        if (result.teams?.length) {
          setTeams(result.teams)
        } else {
          setTeams(fallbackTeams)
          setIsUsingFallback(true)
        }
      } catch {
        if (controller.signal.aborted) {
          return
        }

        setTeams(fallbackTeams)
        setIsUsingFallback(true)
      } finally {
        window.clearTimeout(timeoutId)
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadTeams()
    return () => {
      window.clearTimeout(timeoutId)
      controller.abort()
    }
  }, [])

  return (
    <Page
      title="League Opponents"
      description="Explore the teams competing in the Israeli Premier League."
    >
      {isLoading ? (
        <div className="loading-state" role="status">
          <span className="loading-spinner" aria-hidden="true" />
          <span>Loading league teams...</span>
        </div>
      ) : (
        <>
          {isUsingFallback && (
            <p className="fallback-notice" role="status">
              Showing sample league teams because live team data is unavailable.
            </p>
          )}
          <ul className="team-grid">
            {teams.map((team, index) => {
              const logoUrl =
                team.strTeamBadge?.trim() ||
                team.strBadge?.trim() ||
                team.strTeamLogo?.trim() ||
                createTeamBadge(team.strTeam, index)

              return (
                <li className="team-card" key={team.idTeam}>
                  <img className="team-logo" src={logoUrl} alt="" />
                  <div className="team-card-content">
                    <h2>{team.strTeam}</h2>
                    <p>{team.strLocation?.trim() || 'Israel'}</p>
                    {team.strStadium?.trim() && (
                      <p className="team-stadium">{team.strStadium}</p>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </Page>
  )
}

function createTeamBadge(teamName: string, index: number) {
  const colors = ['#187653', '#1d4e89', '#a52834', '#6a3d8f']
  const initials = teamName
    .split(/\s+/)
    .filter((word) => word.length > 2)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 112"><path d="M50 4 91 19v32c0 26-17 45-41 57C26 96 9 77 9 51V19z" fill="${colors[index % colors.length]}"/><path d="M50 13 82 25v26c0 20-12 35-32 46-20-11-32-26-32-46V25z" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="2"/><text x="50" y="62" fill="#fff" font-family="Arial,sans-serif" font-size="27" font-weight="700" text-anchor="middle">${initials}</text></svg>`

  return `data:image/svg+xml,${encodeURIComponent(svg)}`
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

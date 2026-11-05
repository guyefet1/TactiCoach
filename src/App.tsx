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
    idPlayer: 'fallback-eran-zahavi',
    strPlayer: 'Eran Zahavi',
    strRender: null,
    strThumb:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/EranZeahviCelebrating.jpg/500px-EranZeahviCelebrating.jpg',
    strPosition: 'Forward',
  },
  {
    idPlayer: 'fallback-gabi-kanichowsky',
    strPlayer: 'Gabi Kanichowsky',
    strRender: null,
    strThumb:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/%D7%92%D7%91%D7%99_%D7%A7%D7%A0%D7%99%D7%A7%D7%95%D7%91%D7%A1%D7%A7%D7%99.jpg/500px-%D7%92%D7%91%D7%99_%D7%A7%D7%A0%D7%99%D7%A7%D7%95%D7%91%D7%A1%D7%A7%D7%99.jpg',
    strPosition: 'Midfielder',
  },
  {
    idPlayer: 'fallback-dor-peretz',
    strPlayer: 'Dor Peretz',
    strRender: null,
    strThumb:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Dor_Peretz.JPG/500px-Dor_Peretz.JPG',
    strPosition: 'Midfielder',
  },
  {
    idPlayer: 'fallback-raz-shlomo',
    strPlayer: 'Raz Shlomo',
    strRender: null,
    strThumb:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/Raz_Shlomo_Hapoel_2018_2.jpg/500px-Raz_Shlomo_Hapoel_2018_2.jpg',
    strPosition: 'Defender',
  },
  {
    idPlayer: 'fallback-ofir-davidzada',
    strPlayer: 'Ofir Davidzada',
    strRender: null,
    strThumb: null,
    strPosition: 'Defender',
  },
  {
    idPlayer: 'fallback-roi-mishpati',
    strPlayer: 'Roi Mishpati',
    strRender: null,
    strThumb: null,
    strPosition: 'Goalkeeper',
  },
  {
    idPlayer: 'fallback-roy-revivo',
    strPlayer: 'Roy Revivo',
    strRender: null,
    strThumb: null,
    strPosition: 'Defender',
  },
  {
    idPlayer: 'fallback-dan-glazer',
    strPlayer: 'Dan Glazer',
    strRender: null,
    strThumb: null,
    strPosition: 'Midfielder',
  },
  {
    idPlayer: 'fallback-joris-van-overeem',
    strPlayer: 'Joris van Overeem',
    strRender: null,
    strThumb: null,
    strPosition: 'Midfielder',
  },
  {
    idPlayer: 'fallback-sagiv-yehezkel',
    strPlayer: 'Sagiv Yehezkel',
    strRender: null,
    strThumb: null,
    strPosition: 'Forward',
  },
  {
    idPlayer: 'fallback-dor-turgeman',
    strPlayer: 'Dor Turgeman',
    strRender: null,
    strThumb: null,
    strPosition: 'Forward',
  },
  {
    idPlayer: 'fallback-osher-davida',
    strPlayer: 'Osher Davida',
    strRender: null,
    strThumb: null,
    strPosition: 'Forward',
  },
]

const tacticsPlayers = fallbackPlayers
const startingLineupSize = 11

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
  'fallback-eran-zahavi': {
    ...fallbackPlayers[0],
    strNationality: 'Israel',
    strDescriptionEN:
      'Eran Zahavi is an Israeli striker known for his prolific scoring and leadership.',
  },
  'fallback-gabi-kanichowsky': {
    ...fallbackPlayers[1],
    strNationality: 'Israel',
    strDescriptionEN:
      'Gabi Kanichowsky is an Israeli midfielder known for his passing and creative play.',
  },
  'fallback-dor-peretz': {
    ...fallbackPlayers[2],
    strNationality: 'Israel',
    strDescriptionEN:
      'Dor Peretz is an Israeli midfielder known for his energy and ability to contribute in attack.',
  },
  'fallback-raz-shlomo': {
    ...fallbackPlayers[3],
    strNationality: 'Israel',
    strDescriptionEN:
      'Raz Shlomo is an Israeli centre-back who plays in defence for Maccabi Tel Aviv.',
  },
  'fallback-roi-mishpati': {
    ...fallbackPlayers[4],
    strNationality: 'Israel',
    strDescriptionEN:
      'Roi Mishpati is an Israeli goalkeeper for Maccabi Tel Aviv.',
  },
  'fallback-ofir-davidzada': {
    ...fallbackPlayers[5],
    strNationality: 'Israel',
    strDescriptionEN:
      'Ofir Davidzada is an Israeli defender for Maccabi Tel Aviv.',
  },
  'fallback-roy-revivo': {
    ...fallbackPlayers[6],
    strNationality: 'Israel',
    strDescriptionEN:
      'Roy Revivo is an Israeli defender for Maccabi Tel Aviv.',
  },
  'fallback-dan-glazer': {
    ...fallbackPlayers[7],
    strNationality: 'Israel',
    strDescriptionEN:
      'Dan Glazer is an Israeli midfielder for Maccabi Tel Aviv.',
  },
  'fallback-joris-van-overeem': {
    ...fallbackPlayers[8],
    strNationality: 'Netherlands',
    strDescriptionEN:
      'Joris van Overeem is a Dutch midfielder for Maccabi Tel Aviv.',
  },
  'fallback-sagiv-yehezkel': {
    ...fallbackPlayers[9],
    strNationality: 'Israel',
    strDescriptionEN:
      'Sagiv Yehezkel is an Israeli forward for Maccabi Tel Aviv.',
  },
  'fallback-dor-turgeman': {
    ...fallbackPlayers[10],
    strNationality: 'Israel',
    strDescriptionEN:
      'Dor Turgeman is an Israeli forward for Maccabi Tel Aviv.',
  },
  'fallback-osher-davida': {
    ...fallbackPlayers[11],
    strNationality: 'Israel',
    strDescriptionEN:
      'Osher Davida is an Israeli forward for Maccabi Tel Aviv.',
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
          'https://api.allorigins.win/raw?url=https%3A%2F%2Fwww.thesportsdb.com%2Fapi%2Fv1%2Fjson%2F3%2Fsearchplayers.php%3Ft%3DMaccabi%2520Tel%2520Aviv',
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
      title="Maccabi Tel Aviv Squad"
      description="Meet the players representing Maccabi Tel Aviv."
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
              Showing sample Maccabi Tel Aviv players because the live roster is unavailable.
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
              Sample photos: {' '}
              <a
                href="https://commons.wikimedia.org/wiki/File:EranZeahviCelebrating.jpg"
                target="_blank"
                rel="noreferrer"
              >
                Eran Zahavi (Nir Keidar, CC BY-SA 3.0)
              </a>
              <a
                href="https://commons.wikimedia.org/wiki/File:%D7%92%D7%91%D7%99_%D7%A7%D7%A0%D7%99%D7%A7%D7%95%D7%91%D7%A1%D7%A7%D7%99.jpg"
                target="_blank"
                rel="noreferrer"
              >
                {' · '}Gabi Kanichowsky (Adir Benyamini, CC BY-SA 4.0)
              </a>
              <a
                href="https://commons.wikimedia.org/wiki/File:Dor_Peretz.JPG"
                target="_blank"
                rel="noreferrer"
              >
                {' · '}Dor Peretz (Botend, CC BY-SA 4.0)
              </a>
              <a
                href="https://commons.wikimedia.org/wiki/File:Raz_Shlomo_Hapoel_2018_2.jpg"
                target="_blank"
                rel="noreferrer"
              >
                {' · '}Raz Shlomo (Sebastian27, CC BY-SA 4.0)
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
          parsedSquad.length > 0 &&
          parsedSquad.length <= startingLineupSize &&
          parsedSquad.every(
            (id): id is string =>
              typeof id === 'string' && tacticsPlayerById.has(id),
          ) &&
          new Set(parsedSquad).size === parsedSquad.length

        if (!isValidSquad) {
          throw new Error(
            `The saved lineup is invalid. Select ${startingLineupSize} available players and save it again.`,
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

      if (currentIds.length >= startingLineupSize) {
        return currentIds
      }

      return [...currentIds, playerId]
    })
  }

  function saveTactics() {
    if (selectedPlayerIds.length !== startingLineupSize) {
      setError(`Select exactly ${startingLineupSize} players before saving your tactics.`)
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
      description={`Choose exactly ${startingLineupSize} players for your starting lineup.`}
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
                {selectedPlayerIds.length} / {startingLineupSize} selected
              </span>
            </div>
            <ul className="tactics-player-list">
              {tacticsPlayers.map((player) => {
                const isSelected = selectedPlayerIds.includes(player.idPlayer)
                const isUnavailable =
                  !isSelected &&
                  selectedPlayerIds.length === startingLineupSize

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
              disabled={selectedPlayerIds.length !== startingLineupSize}
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

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingState from '../components/LoadingState'
import Page from '../components/Page'
import { fallbackPlayers } from '../data/fallbackData'
import { fetchPlayers } from '../services/playerService'
import type { TheSportsDbPlayer } from '../types/player'

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
        const fetchedPlayers = await fetchPlayers(signal)
        if (fetchedPlayers.length) {
          setPlayers(fetchedPlayers)
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
        <LoadingState message="Loading squad..." />
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

export default Home

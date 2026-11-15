import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LoadingState from '../components/LoadingState'
import Page from '../components/Page'
import { fallbackProfiles } from '../data/fallbackData'
import { fetchPlayerProfile } from '../services/playerService'
import type { TheSportsDbPlayerProfile } from '../types/player'

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

        setPlayer(await fetchPlayerProfile(id, signal))
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
        <LoadingState message="Loading player profile..." />
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

export default PlayerProfile

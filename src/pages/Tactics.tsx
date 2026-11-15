import { useEffect, useState } from 'react'
import LoadingState from '../components/LoadingState'
import Page from '../components/Page'
import {
  startingLineupSize,
  tacticsPlayerById,
  tacticsPlayers,
  tacticsStorageKey,
} from '../data/fallbackData'
import type { TheSportsDbPlayer } from '../types/player'

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
      const savedSquad = window.localStorage.getItem(tacticsStorageKey)

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
        tacticsStorageKey,
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
        <LoadingState message="Loading saved tactics..." />
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

export default Tactics

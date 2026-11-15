import { useEffect, useState } from 'react'
import LoadingState from '../components/LoadingState'
import Page from '../components/Page'
import { fallbackTeams } from '../data/fallbackData'
import { fetchLeagueTeams } from '../services/teamService'
import type { TheSportsDbTeam } from '../types/team'
import { createTeamBadge } from '../utils/createTeamBadge'

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
        const fetchedTeams = await fetchLeagueTeams(signal)
        if (fetchedTeams.length) {
          setTeams(fetchedTeams)
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
        <LoadingState message="Loading league teams..." />
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

export default Opponents

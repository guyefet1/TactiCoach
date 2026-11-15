import {
  parseTheSportsDbTeamsResponse,
  type TheSportsDbTeam,
} from '../types/team'

export async function fetchLeagueTeams(
  signal: AbortSignal,
): Promise<TheSportsDbTeam[]> {
  const response = await fetch(
    'https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=Israeli%20Premier%20League',
    { signal },
  )

  if (!response.ok) {
    throw new Error(`TheSportsDB returned an HTTP ${response.status} error.`)
  }

  const data: unknown = await response.json()
  return parseTheSportsDbTeamsResponse(data).teams ?? []
}

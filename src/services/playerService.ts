import {
  parseTheSportsDbPlayerProfileResponse,
  parseTheSportsDbPlayersResponse,
  type TheSportsDbPlayer,
  type TheSportsDbPlayerProfile,
} from '../types/player'

export async function fetchPlayers(
  signal: AbortSignal,
): Promise<TheSportsDbPlayer[]> {
  const response = await fetch(
    'https://api.allorigins.win/raw?url=https%3A%2F%2Fwww.thesportsdb.com%2Fapi%2Fv1%2Fjson%2F3%2Fsearchplayers.php%3Ft%3DMaccabi%2520Tel%2520Aviv',
    { signal },
  )

  if (!response.ok) {
    throw new Error(`TheSportsDB returned an HTTP ${response.status} error.`)
  }

  const data: unknown = await response.json()
  return parseTheSportsDbPlayersResponse(data).player ?? []
}

export async function fetchPlayerProfile(
  id: string,
  signal: AbortSignal,
): Promise<TheSportsDbPlayerProfile> {
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
  const player = result.players?.find((profile) => profile.idPlayer === id)

  if (!player) {
    throw new Error('The requested player was not found.')
  }

  return player
}

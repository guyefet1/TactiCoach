export interface TheSportsDbPlayer {
  idPlayer: string
  strPlayer: string
  strRender: string | null
  strThumb: string | null
  strPosition: string | null
}

export interface TheSportsDbPlayersResponse {
  player: TheSportsDbPlayer[] | null
}

export interface TheSportsDbPlayerProfile extends TheSportsDbPlayer {
  strNationality: string | null
  strDescriptionEN: string | null
}

export interface TheSportsDbPlayerProfileResponse {
  players: TheSportsDbPlayerProfile[] | null
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isNullableString(value: unknown): value is string | null {
  return typeof value === 'string' || value === null
}

function isTheSportsDbPlayer(value: unknown): value is TheSportsDbPlayer {
  return (
    isRecord(value) &&
    typeof value.idPlayer === 'string' &&
    typeof value.strPlayer === 'string' &&
    isNullableString(value.strRender) &&
    isNullableString(value.strThumb) &&
    isNullableString(value.strPosition)
  )
}

function isTheSportsDbPlayerProfile(
  value: unknown,
): value is TheSportsDbPlayerProfile {
  return (
    isRecord(value) &&
    isTheSportsDbPlayer(value) &&
    isNullableString(value.strNationality) &&
    isNullableString(value.strDescriptionEN)
  )
}

export function parseTheSportsDbPlayersResponse(
  value: unknown,
): TheSportsDbPlayersResponse {
  if (
    !isRecord(value) ||
    (value.player !== null &&
      (!Array.isArray(value.player) || !value.player.every(isTheSportsDbPlayer)))
  ) {
    throw new Error('The players response from TheSportsDB was invalid.')
  }

  return { player: value.player }
}

export function parseTheSportsDbPlayerProfileResponse(
  value: unknown,
): TheSportsDbPlayerProfileResponse {
  if (
    !isRecord(value) ||
    (value.players !== null &&
      (!Array.isArray(value.players) ||
        !value.players.every(isTheSportsDbPlayerProfile)))
  ) {
    throw new Error('The player profile response from TheSportsDB was invalid.')
  }

  return { players: value.players }
}

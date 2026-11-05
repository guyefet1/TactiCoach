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

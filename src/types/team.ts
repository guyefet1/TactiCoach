export interface TheSportsDbTeam {
  idTeam: string
  strTeam: string
  strTeamBadge?: string | null
  strBadge?: string | null
  strTeamLogo?: string | null
  strLocation?: string | null
  strStadium?: string | null
}

export interface TheSportsDbTeamsResponse {
  teams: TheSportsDbTeam[] | null
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isOptionalNullableString(value: unknown): value is string | null | undefined {
  return value === undefined || typeof value === 'string' || value === null
}

function isTheSportsDbTeam(value: unknown): value is TheSportsDbTeam {
  return (
    isRecord(value) &&
    typeof value.idTeam === 'string' &&
    typeof value.strTeam === 'string' &&
    isOptionalNullableString(value.strTeamBadge) &&
    isOptionalNullableString(value.strBadge) &&
    isOptionalNullableString(value.strTeamLogo) &&
    isOptionalNullableString(value.strLocation) &&
    isOptionalNullableString(value.strStadium)
  )
}

export function parseTheSportsDbTeamsResponse(
  value: unknown,
): TheSportsDbTeamsResponse {
  if (
    !isRecord(value) ||
    (value.teams !== null &&
      (!Array.isArray(value.teams) || !value.teams.every(isTheSportsDbTeam)))
  ) {
    throw new Error('The teams response from TheSportsDB was invalid.')
  }

  return { teams: value.teams }
}

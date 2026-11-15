export function createTeamBadge(teamName: string, index: number): string {
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

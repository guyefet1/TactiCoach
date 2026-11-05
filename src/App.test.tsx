import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

function LocationOutput() {
  const location = useLocation()
  return <output data-testid="current-location">{location.pathname}</output>
}

function renderApp(initialEntry = '/') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <App />
      <LocationOutput />
    </MemoryRouter>,
  )
}

function mockApiFailure() {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Network error')))
}

describe('TactiCoach app', () => {
  it('renders the squad using fallback players when the roster API fails', async () => {
    mockApiFailure()
    renderApp()

    expect(
      await screen.findByText(
        'Showing sample Arsenal players because the live roster is unavailable.',
      ),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Bukayo Saka' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Martin Odegaard' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Declan Rice' })).toBeInTheDocument()
  })

  it('filters players by name without regard to case and combines the position filter', async () => {
    mockApiFailure()
    const { container } = renderApp()
    await screen.findByRole('heading', { name: 'Bukayo Saka' })

    fireEvent.change(screen.getByRole('searchbox', { name: 'Search players' }), {
      target: { value: 'RICE' },
    })
    fireEvent.change(screen.getByRole('combobox', { name: 'Position' }), {
      target: { value: 'Midfielder' },
    })

    const cards = container.querySelectorAll('.player-card')
    expect(cards).toHaveLength(1)
    expect(
      screen.getByRole('heading', { name: 'Declan Rice' }),
    ).toBeInTheDocument()

    fireEvent.change(screen.getByRole('combobox', { name: 'Position' }), {
      target: { value: 'Forward' },
    })
    expect(
      screen.getByText('No players match your search and position filters.'),
    ).toBeInTheDocument()
  })

  it('navigates from a player card to that player profile and back to the squad', async () => {
    mockApiFailure()
    renderApp()
    const playerLink = await screen.findByRole('link', {
      name: /Bukayo Saka.*Forward/,
    })

    fireEvent.click(playerLink)

    expect(await screen.findByTestId('current-location')).toHaveTextContent(
      '/players/fallback-bukayo-saka',
    )
    expect(
      await screen.findByText(
        'Showing sample profile because live player details are unavailable.',
      ),
    ).toBeInTheDocument()
    expect(screen.getByText('England')).toBeInTheDocument()
    expect(screen.getByText(/English winger known/)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Bukayo Saka' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('link', { name: 'Back to Squad' }))
    expect(await screen.findByTestId('current-location')).toHaveTextContent('/')
    expect(await screen.findByRole('heading', { name: 'Arsenal Squad' })).toBeInTheDocument()
  })

  it('requires exactly 11 players and saves the selected lineup to localStorage', async () => {
    renderApp('/tactics')

    const saveButton = screen.getByRole('button', { name: 'Save Tactics' })
    expect(saveButton).toBeDisabled()

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(11)
    for (const checkbox of checkboxes) {
      fireEvent.click(checkbox)
    }

    expect(screen.getByText('11 / 11 selected')).toBeInTheDocument()
    expect(saveButton).toBeEnabled()
    fireEvent.click(saveButton)

    expect(await screen.findByText('Your starting 11 has been saved.')).toBeInTheDocument()
    const savedSquad: unknown = JSON.parse(
      window.localStorage.getItem('tacticCoach_squad') ?? 'null',
    )
    expect(savedSquad).toHaveLength(11)
  })

  it('loads the saved starting lineup from localStorage on mount', async () => {
    mockApiFailure()
    const savedIds = [
      'fallback-david-raya',
      'fallback-ben-white',
      'fallback-william-saliba',
      'fallback-gabriel-magalhaes',
      'fallback-jurrien-timber',
      'fallback-declan-rice',
      'fallback-martin-odegaard',
      'fallback-kai-havertz',
      'fallback-bukayo-saka',
      'fallback-gabriel-martinelli',
      'fallback-leandro-trossard',
    ]
    window.localStorage.setItem('tacticCoach_squad', JSON.stringify(savedIds))
    const { container } = renderApp('/tactics')

    expect(await screen.findByText('Loaded your saved starting 11.')).toBeInTheDocument()
    expect(screen.getByText('11 / 11 selected')).toBeInTheDocument()
    expect(screen.getAllByRole('checkbox', { checked: true })).toHaveLength(11)
    expect(container.querySelectorAll('.starting-player-list li')).toHaveLength(11)
  })

  it('shows fallback league teams and their logos when the teams API fails', async () => {
    mockApiFailure()
    const { container } = renderApp('/opponents')

    expect(
      await screen.findByText(
        'Showing sample league teams because live team data is unavailable.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Maccabi Tel Aviv' }),
    ).toBeInTheDocument()
    expect(container.querySelectorAll('.team-card')).toHaveLength(12)
    expect(container.querySelectorAll('.team-logo')).toHaveLength(12)
    expect(screen.getByRole('link', { name: 'Opponents' })).toHaveAttribute(
      'href',
      '/opponents',
    )
  })
})

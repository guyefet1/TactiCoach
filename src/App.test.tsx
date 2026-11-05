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
        'Showing sample Maccabi Tel Aviv players because the live roster is unavailable.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Maccabi Tel Aviv Squad' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: 'Player Profile' }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Eran Zahavi' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Gabi Kanichowsky' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Dor Peretz' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Raz Shlomo' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Roi Mishpati' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Ofir Davidzada' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Roy Revivo' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Dan Glazer' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Joris van Overeem' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Sagiv Yehezkel' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Dor Turgeman' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Osher Davida' })).toBeInTheDocument()
    expect(document.querySelectorAll('.player-card')).toHaveLength(12)
  })

  it('filters players by name without regard to case and combines the position filter', async () => {
    mockApiFailure()
    const { container } = renderApp()
    await screen.findByRole('heading', { name: 'Eran Zahavi' })

    fireEvent.change(screen.getByRole('searchbox', { name: 'Search players' }), {
      target: { value: 'DOR PERETZ' },
    })
    fireEvent.change(screen.getByRole('combobox', { name: 'Position' }), {
      target: { value: 'Midfielder' },
    })

    const cards = container.querySelectorAll('.player-card')
    expect(cards).toHaveLength(1)
    expect(
      screen.getByRole('heading', { name: 'Dor Peretz' }),
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
      name: /Eran Zahavi.*Forward/,
    })

    fireEvent.click(playerLink)

    expect(await screen.findByTestId('current-location')).toHaveTextContent(
      '/players/fallback-eran-zahavi',
    )
    expect(
      await screen.findByText(
        'Showing sample profile because live player details are unavailable.',
      ),
    ).toBeInTheDocument()
    expect(screen.getByText('Israel')).toBeInTheDocument()
    expect(screen.getByText(/Israeli striker known/)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Eran Zahavi' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('link', { name: 'Back to Squad' }))
    expect(await screen.findByTestId('current-location')).toHaveTextContent('/')
    expect(await screen.findByRole('heading', { name: 'Maccabi Tel Aviv Squad' })).toBeInTheDocument()
  })

  it('shows 12 Maccabi fallback players and requires exactly 11 for the lineup', async () => {
    renderApp('/tactics')

    const saveButton = screen.getByRole('button', { name: 'Save Tactics' })
    expect(saveButton).toBeDisabled()

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(12)
    expect(screen.getByText('Eran Zahavi')).toBeInTheDocument()
    expect(screen.getByText('Gabi Kanichowsky')).toBeInTheDocument()
    expect(screen.getByText('Dor Peretz')).toBeInTheDocument()
    expect(screen.getByText('Raz Shlomo')).toBeInTheDocument()
    expect(screen.getByText('Roi Mishpati')).toBeInTheDocument()
    expect(screen.getByText('Ofir Davidzada')).toBeInTheDocument()

    for (const checkbox of checkboxes.slice(0, 11)) {
      fireEvent.click(checkbox)
    }

    expect(screen.getByText('11 / 11 selected')).toBeInTheDocument()
    expect(checkboxes[11]).toBeDisabled()
    expect(saveButton).toBeEnabled()
    fireEvent.click(saveButton)

    expect(await screen.findByText('Your starting 11 has been saved.')).toBeInTheDocument()
    const savedSquad: unknown = JSON.parse(
      window.localStorage.getItem('tacticCoach_squad') ?? 'null',
    )
    expect(savedSquad).toEqual([
      'fallback-eran-zahavi',
      'fallback-gabi-kanichowsky',
      'fallback-dor-peretz',
      'fallback-raz-shlomo',
      'fallback-ofir-davidzada',
      'fallback-roi-mishpati',
      'fallback-roy-revivo',
      'fallback-dan-glazer',
      'fallback-joris-van-overeem',
      'fallback-sagiv-yehezkel',
      'fallback-dor-turgeman',
    ])
  })

  it('loads the saved Maccabi starting 11 from localStorage on mount', async () => {
    const savedIds = [
      'fallback-eran-zahavi',
      'fallback-gabi-kanichowsky',
      'fallback-dor-peretz',
      'fallback-raz-shlomo',
      'fallback-ofir-davidzada',
      'fallback-roi-mishpati',
      'fallback-roy-revivo',
      'fallback-dan-glazer',
      'fallback-joris-van-overeem',
      'fallback-sagiv-yehezkel',
      'fallback-dor-turgeman',
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

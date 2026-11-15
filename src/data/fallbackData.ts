import type {
  TheSportsDbPlayer,
  TheSportsDbPlayerProfile,
} from '../types/player'
import type { TheSportsDbTeam } from '../types/team'

export const fallbackPlayers: TheSportsDbPlayer[] = [
  {
    idPlayer: 'fallback-eran-zahavi',
    strPlayer: 'Eran Zahavi',
    strRender: null,
    strThumb:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/EranZeahviCelebrating.jpg/500px-EranZeahviCelebrating.jpg',
    strPosition: 'Forward',
  },
  {
    idPlayer: 'fallback-gabi-kanichowsky',
    strPlayer: 'Gabi Kanichowsky',
    strRender: null,
    strThumb:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/%D7%92%D7%91%D7%99_%D7%A7%D7%A0%D7%99%D7%A7%D7%95%D7%91%D7%A1%D7%A7%D7%99.jpg/500px-%D7%92%D7%91%D7%99_%D7%A7%D7%A0%D7%99%D7%A7%D7%95%D7%91%D7%A1%D7%A7%D7%99.jpg',
    strPosition: 'Midfielder',
  },
  {
    idPlayer: 'fallback-dor-peretz',
    strPlayer: 'Dor Peretz',
    strRender: null,
    strThumb:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Dor_Peretz.JPG/500px-Dor_Peretz.JPG',
    strPosition: 'Midfielder',
  },
  {
    idPlayer: 'fallback-raz-shlomo',
    strPlayer: 'Raz Shlomo',
    strRender: null,
    strThumb:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/Raz_Shlomo_Hapoel_2018_2.jpg/500px-Raz_Shlomo_Hapoel_2018_2.jpg',
    strPosition: 'Defender',
  },
  {
    idPlayer: 'fallback-ofir-davidzada',
    strPlayer: 'Ofir Davidzada',
    strRender: null,
    strThumb: null,
    strPosition: 'Defender',
  },
  {
    idPlayer: 'fallback-roi-mishpati',
    strPlayer: 'Roi Mishpati',
    strRender: null,
    strThumb: null,
    strPosition: 'Goalkeeper',
  },
  {
    idPlayer: 'fallback-roy-revivo',
    strPlayer: 'Roy Revivo',
    strRender: null,
    strThumb: null,
    strPosition: 'Defender',
  },
  {
    idPlayer: 'fallback-dan-glazer',
    strPlayer: 'Dan Glazer',
    strRender: null,
    strThumb: null,
    strPosition: 'Midfielder',
  },
  {
    idPlayer: 'fallback-joris-van-overeem',
    strPlayer: 'Joris van Overeem',
    strRender: null,
    strThumb: null,
    strPosition: 'Midfielder',
  },
  {
    idPlayer: 'fallback-sagiv-yehezkel',
    strPlayer: 'Sagiv Yehezkel',
    strRender: null,
    strThumb: null,
    strPosition: 'Forward',
  },
  {
    idPlayer: 'fallback-dor-turgeman',
    strPlayer: 'Dor Turgeman',
    strRender: null,
    strThumb: null,
    strPosition: 'Forward',
  },
  {
    idPlayer: 'fallback-osher-davida',
    strPlayer: 'Osher Davida',
    strRender: null,
    strThumb: null,
    strPosition: 'Forward',
  },
]

export const tacticsPlayers = fallbackPlayers
export const startingLineupSize = 11
export const tacticsStorageKey = 'tacticCoach_squad'

export const tacticsPlayerById = new Map(
  tacticsPlayers.map((player) => [player.idPlayer, player]),
)

export const fallbackTeams: TheSportsDbTeam[] = [
  { idTeam: 'fallback-maccabi-tel-aviv', strTeam: 'Maccabi Tel Aviv', strLocation: 'Tel Aviv', strStadium: 'Bloomfield Stadium' },
  { idTeam: 'fallback-hapoel-beer-sheva', strTeam: 'Hapoel Be\'er Sheva', strLocation: 'Be\'er Sheva', strStadium: 'Toto Turner Stadium' },
  { idTeam: 'fallback-maccabi-haifa', strTeam: 'Maccabi Haifa', strLocation: 'Haifa', strStadium: 'Sammy Ofer Stadium' },
  { idTeam: 'fallback-beitar-jerusalem', strTeam: 'Beitar Jerusalem', strLocation: 'Jerusalem', strStadium: 'Teddy Stadium' },
  { idTeam: 'fallback-hapoel-tel-aviv', strTeam: 'Hapoel Tel Aviv', strLocation: 'Tel Aviv', strStadium: 'Bloomfield Stadium' },
  { idTeam: 'fallback-hapoel-haifa', strTeam: 'Hapoel Haifa', strLocation: 'Haifa', strStadium: 'Sammy Ofer Stadium' },
  { idTeam: 'fallback-maccabi-netanya', strTeam: 'Maccabi Netanya', strLocation: 'Netanya', strStadium: 'Netanya Stadium' },
  { idTeam: 'fallback-bnei-sakhnin', strTeam: 'Bnei Sakhnin', strLocation: 'Sakhnin', strStadium: 'Doha Stadium' },
  { idTeam: 'fallback-hapoel-jerusalem', strTeam: 'Hapoel Jerusalem', strLocation: 'Jerusalem', strStadium: 'Teddy Stadium' },
  { idTeam: 'fallback-ashdod', strTeam: 'Ashdod SC', strLocation: 'Ashdod', strStadium: 'Yud-Alef Stadium' },
  { idTeam: 'fallback-maccabi-petah-tikva', strTeam: 'Maccabi Petah Tikva', strLocation: 'Petah Tikva', strStadium: 'HaMoshava Stadium' },
  { idTeam: 'fallback-hapoel-hadera', strTeam: 'Hapoel Hadera', strLocation: 'Hadera', strStadium: 'Netanya Stadium' },
]

export const fallbackProfiles: Record<string, TheSportsDbPlayerProfile> = {
  'fallback-eran-zahavi': {
    ...fallbackPlayers[0],
    strNationality: 'Israel',
    strDescriptionEN:
      'Eran Zahavi is an Israeli striker known for his prolific scoring and leadership.',
  },
  'fallback-gabi-kanichowsky': {
    ...fallbackPlayers[1],
    strNationality: 'Israel',
    strDescriptionEN:
      'Gabi Kanichowsky is an Israeli midfielder known for his passing and creative play.',
  },
  'fallback-dor-peretz': {
    ...fallbackPlayers[2],
    strNationality: 'Israel',
    strDescriptionEN:
      'Dor Peretz is an Israeli midfielder known for his energy and ability to contribute in attack.',
  },
  'fallback-raz-shlomo': {
    ...fallbackPlayers[3],
    strNationality: 'Israel',
    strDescriptionEN:
      'Raz Shlomo is an Israeli centre-back who plays in defence for Maccabi Tel Aviv.',
  },
  'fallback-roi-mishpati': {
    ...fallbackPlayers[4],
    strNationality: 'Israel',
    strDescriptionEN:
      'Roi Mishpati is an Israeli goalkeeper for Maccabi Tel Aviv.',
  },
  'fallback-ofir-davidzada': {
    ...fallbackPlayers[5],
    strNationality: 'Israel',
    strDescriptionEN:
      'Ofir Davidzada is an Israeli defender for Maccabi Tel Aviv.',
  },
  'fallback-roy-revivo': {
    ...fallbackPlayers[6],
    strNationality: 'Israel',
    strDescriptionEN:
      'Roy Revivo is an Israeli defender for Maccabi Tel Aviv.',
  },
  'fallback-dan-glazer': {
    ...fallbackPlayers[7],
    strNationality: 'Israel',
    strDescriptionEN:
      'Dan Glazer is an Israeli midfielder for Maccabi Tel Aviv.',
  },
  'fallback-joris-van-overeem': {
    ...fallbackPlayers[8],
    strNationality: 'Netherlands',
    strDescriptionEN:
      'Joris van Overeem is a Dutch midfielder for Maccabi Tel Aviv.',
  },
  'fallback-sagiv-yehezkel': {
    ...fallbackPlayers[9],
    strNationality: 'Israel',
    strDescriptionEN:
      'Sagiv Yehezkel is an Israeli forward for Maccabi Tel Aviv.',
  },
  'fallback-dor-turgeman': {
    ...fallbackPlayers[10],
    strNationality: 'Israel',
    strDescriptionEN:
      'Dor Turgeman is an Israeli forward for Maccabi Tel Aviv.',
  },
  'fallback-osher-davida': {
    ...fallbackPlayers[11],
    strNationality: 'Israel',
    strDescriptionEN:
      'Osher Davida is an Israeli forward for Maccabi Tel Aviv.',
  },
}

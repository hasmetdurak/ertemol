export interface FixtureData {
  id: number
  home: string
  away: string
  group: string
  stage: string
  kickoffUtc: string
  status: string
  scoreHome: number | null
  scoreAway: number | null
  minute: string | null
  venue: string | null
  city: string | null
  streamCountByLang: Record<string, number>
  totalStreams: number
}

export const fixturesByDate: Record<string, FixtureData[]> = {
  "2026-06-11": [
    { id: 1, home: "Mexico", away: "South Africa", group: "Group A", stage: "group", kickoffUtc: "2026-06-11T07:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Mexico City", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 2, home: "South Korea", away: "Czech Republic", group: "Group A", stage: "group", kickoffUtc: "2026-06-11T14:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Guadalajara (Zapopan)", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-06-12": [
    { id: 7, home: "Canada", away: "Bosnia & Herzegovina", group: "Group B", stage: "group", kickoffUtc: "2026-06-12T11:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Toronto", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 19, home: "USA", away: "Paraguay", group: "Group D", stage: "group", kickoffUtc: "2026-06-12T11:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Los Angeles (Inglewood)", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-06-13": [
    { id: 8, home: "Qatar", away: "Switzerland", group: "Group B", stage: "group", kickoffUtc: "2026-06-13T05:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "San Francisco Bay Area (Santa Clara)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 13, home: "Brazil", away: "Morocco", group: "Group C", stage: "group", kickoffUtc: "2026-06-13T14:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "New York/New Jersey (East Rutherford)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 14, home: "Haiti", away: "Scotland", group: "Group C", stage: "group", kickoffUtc: "2026-06-13T17:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Boston (Foxborough)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 20, home: "Australia", away: "Turkey", group: "Group D", stage: "group", kickoffUtc: "2026-06-13T14:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Vancouver", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-06-14": [
    { id: 25, home: "Germany", away: "Cura├ğao", group: "Group E", stage: "group", kickoffUtc: "2026-06-14T07:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Houston", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 26, home: "Ivory Coast", away: "Ecuador", group: "Group E", stage: "group", kickoffUtc: "2026-06-14T15:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Philadelphia", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 31, home: "Netherlands", away: "Japan", group: "Group F", stage: "group", kickoffUtc: "2026-06-14T10:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Dallas (Arlington)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 32, home: "Sweden", away: "Tunisia", group: "Group F", stage: "group", kickoffUtc: "2026-06-14T14:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Monterrey (Guadalupe)", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-06-15": [
    { id: 37, home: "Belgium", away: "Egypt", group: "Group G", stage: "group", kickoffUtc: "2026-06-15T05:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Seattle", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 38, home: "Iran", away: "New Zealand", group: "Group G", stage: "group", kickoffUtc: "2026-06-15T11:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Los Angeles (Inglewood)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 43, home: "Spain", away: "Cape Verde", group: "Group H", stage: "group", kickoffUtc: "2026-06-15T08:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Atlanta", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 44, home: "Saudi Arabia", away: "Uruguay", group: "Group H", stage: "group", kickoffUtc: "2026-06-15T14:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Miami (Miami Gardens)", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-06-16": [
    { id: 49, home: "France", away: "Senegal", group: "Group I", stage: "group", kickoffUtc: "2026-06-16T11:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "New York/New Jersey (East Rutherford)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 50, home: "Iraq", away: "Norway", group: "Group I", stage: "group", kickoffUtc: "2026-06-16T14:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Boston (Foxborough)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 55, home: "Argentina", away: "Algeria", group: "Group J", stage: "group", kickoffUtc: "2026-06-16T15:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Kansas City", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 56, home: "Austria", away: "Jordan", group: "Group J", stage: "group", kickoffUtc: "2026-06-16T14:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "San Francisco Bay Area (Santa Clara)", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-06-17": [
    { id: 61, home: "Portugal", away: "DR Congo", group: "Group K", stage: "group", kickoffUtc: "2026-06-17T07:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Houston", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 62, home: "Uzbekistan", away: "Colombia", group: "Group K", stage: "group", kickoffUtc: "2026-06-17T14:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Mexico City", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 67, home: "England", away: "Croatia", group: "Group L", stage: "group", kickoffUtc: "2026-06-17T10:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Dallas (Arlington)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 68, home: "Ghana", away: "Panama", group: "Group L", stage: "group", kickoffUtc: "2026-06-17T15:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Toronto", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-06-18": [
    { id: 3, home: "Czech Republic", away: "South Africa", group: "Group A", stage: "group", kickoffUtc: "2026-06-18T08:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Atlanta", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 4, home: "Mexico", away: "South Korea", group: "Group A", stage: "group", kickoffUtc: "2026-06-18T13:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Guadalajara (Zapopan)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 9, home: "Switzerland", away: "Bosnia & Herzegovina", group: "Group B", stage: "group", kickoffUtc: "2026-06-18T05:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Los Angeles (Inglewood)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 10, home: "Canada", away: "Qatar", group: "Group B", stage: "group", kickoffUtc: "2026-06-18T08:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Vancouver", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-06-19": [
    { id: 15, home: "Scotland", away: "Morocco", group: "Group C", stage: "group", kickoffUtc: "2026-06-19T14:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Boston (Foxborough)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 16, home: "Brazil", away: "Haiti", group: "Group C", stage: "group", kickoffUtc: "2026-06-19T16:30:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Philadelphia", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 21, home: "USA", away: "Australia", group: "Group D", stage: "group", kickoffUtc: "2026-06-19T05:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Seattle", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 22, home: "Turkey", away: "Paraguay", group: "Group D", stage: "group", kickoffUtc: "2026-06-19T13:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "San Francisco Bay Area (Santa Clara)", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-06-20": [
    { id: 27, home: "Germany", away: "Ivory Coast", group: "Group E", stage: "group", kickoffUtc: "2026-06-20T12:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Toronto", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 28, home: "Ecuador", away: "Cura├ğao", group: "Group E", stage: "group", kickoffUtc: "2026-06-20T14:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Kansas City", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 33, home: "Netherlands", away: "Sweden", group: "Group F", stage: "group", kickoffUtc: "2026-06-20T07:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Houston", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 34, home: "Tunisia", away: "Japan", group: "Group F", stage: "group", kickoffUtc: "2026-06-20T16:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Monterrey (Guadalupe)", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-06-21": [
    { id: 39, home: "Belgium", away: "Iran", group: "Group G", stage: "group", kickoffUtc: "2026-06-21T05:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Los Angeles (Inglewood)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 40, home: "New Zealand", away: "Egypt", group: "Group G", stage: "group", kickoffUtc: "2026-06-21T11:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Vancouver", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 45, home: "Spain", away: "Saudi Arabia", group: "Group H", stage: "group", kickoffUtc: "2026-06-21T08:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Atlanta", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 46, home: "Uruguay", away: "Cape Verde", group: "Group H", stage: "group", kickoffUtc: "2026-06-21T14:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Miami (Miami Gardens)", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-06-22": [
    { id: 51, home: "France", away: "Iraq", group: "Group I", stage: "group", kickoffUtc: "2026-06-22T13:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Philadelphia", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 52, home: "Norway", away: "Senegal", group: "Group I", stage: "group", kickoffUtc: "2026-06-22T16:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "New York/New Jersey (East Rutherford)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 57, home: "Argentina", away: "Austria", group: "Group J", stage: "group", kickoffUtc: "2026-06-22T07:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Dallas (Arlington)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 58, home: "Jordan", away: "Algeria", group: "Group J", stage: "group", kickoffUtc: "2026-06-22T13:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "San Francisco Bay Area (Santa Clara)", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-06-23": [
    { id: 63, home: "Portugal", away: "Uzbekistan", group: "Group K", stage: "group", kickoffUtc: "2026-06-23T07:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Houston", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 64, home: "Colombia", away: "DR Congo", group: "Group K", stage: "group", kickoffUtc: "2026-06-23T14:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Guadalajara (Zapopan)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 69, home: "England", away: "Ghana", group: "Group L", stage: "group", kickoffUtc: "2026-06-23T12:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Boston (Foxborough)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 70, home: "Panama", away: "Croatia", group: "Group L", stage: "group", kickoffUtc: "2026-06-23T15:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Toronto", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-06-24": [
    { id: 5, home: "Czech Republic", away: "Mexico", group: "Group A", stage: "group", kickoffUtc: "2026-06-24T13:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Mexico City", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 6, home: "South Africa", away: "South Korea", group: "Group A", stage: "group", kickoffUtc: "2026-06-24T13:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Monterrey (Guadalupe)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 11, home: "Switzerland", away: "Canada", group: "Group B", stage: "group", kickoffUtc: "2026-06-24T05:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Vancouver", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 12, home: "Bosnia & Herzegovina", away: "Qatar", group: "Group B", stage: "group", kickoffUtc: "2026-06-24T05:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Seattle", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 17, home: "Scotland", away: "Brazil", group: "Group C", stage: "group", kickoffUtc: "2026-06-24T14:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Miami (Miami Gardens)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 18, home: "Morocco", away: "Haiti", group: "Group C", stage: "group", kickoffUtc: "2026-06-24T14:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Atlanta", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-06-25": [
    { id: 23, home: "Turkey", away: "USA", group: "Group D", stage: "group", kickoffUtc: "2026-06-25T12:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Los Angeles (Inglewood)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 24, home: "Paraguay", away: "Australia", group: "Group D", stage: "group", kickoffUtc: "2026-06-25T12:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "San Francisco Bay Area (Santa Clara)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 29, home: "Cura├ğao", away: "Ivory Coast", group: "Group E", stage: "group", kickoffUtc: "2026-06-25T12:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Philadelphia", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 30, home: "Ecuador", away: "Germany", group: "Group E", stage: "group", kickoffUtc: "2026-06-25T12:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "New York/New Jersey (East Rutherford)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 35, home: "Japan", away: "Sweden", group: "Group F", stage: "group", kickoffUtc: "2026-06-25T13:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Dallas (Arlington)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 36, home: "Tunisia", away: "Netherlands", group: "Group F", stage: "group", kickoffUtc: "2026-06-25T13:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Kansas City", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-06-26": [
    { id: 41, home: "Egypt", away: "Iran", group: "Group G", stage: "group", kickoffUtc: "2026-06-26T13:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Seattle", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 42, home: "New Zealand", away: "Belgium", group: "Group G", stage: "group", kickoffUtc: "2026-06-26T13:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Vancouver", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 47, home: "Cape Verde", away: "Saudi Arabia", group: "Group H", stage: "group", kickoffUtc: "2026-06-26T14:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Houston", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 48, home: "Uruguay", away: "Spain", group: "Group H", stage: "group", kickoffUtc: "2026-06-26T12:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Guadalajara (Zapopan)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 53, home: "Norway", away: "France", group: "Group I", stage: "group", kickoffUtc: "2026-06-26T11:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Boston (Foxborough)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 54, home: "Senegal", away: "Iraq", group: "Group I", stage: "group", kickoffUtc: "2026-06-26T11:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Toronto", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-06-27": [
    { id: 59, home: "Algeria", away: "Austria", group: "Group J", stage: "group", kickoffUtc: "2026-06-27T16:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Kansas City", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 60, home: "Jordan", away: "Argentina", group: "Group J", stage: "group", kickoffUtc: "2026-06-27T16:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Dallas (Arlington)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 65, home: "Colombia", away: "Portugal", group: "Group K", stage: "group", kickoffUtc: "2026-06-27T15:30:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Miami (Miami Gardens)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 66, home: "DR Congo", away: "Uzbekistan", group: "Group K", stage: "group", kickoffUtc: "2026-06-27T15:30:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Atlanta", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 71, home: "Panama", away: "England", group: "Group L", stage: "group", kickoffUtc: "2026-06-27T13:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "New York/New Jersey (East Rutherford)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 72, home: "Croatia", away: "Ghana", group: "Group L", stage: "group", kickoffUtc: "2026-06-27T13:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Philadelphia", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-06-28": [
    { id: 73, home: "2A", away: "2B", group: "Round of 32", stage: "knockout", kickoffUtc: "2026-06-28T05:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Los Angeles (Inglewood)", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-06-29": [
    { id: 74, home: "1E", away: "3A/B/C/D/F", group: "Round of 32", stage: "knockout", kickoffUtc: "2026-06-29T12:30:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Boston (Foxborough)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 75, home: "1F", away: "2C", group: "Round of 32", stage: "knockout", kickoffUtc: "2026-06-29T13:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Monterrey (Guadalupe)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 76, home: "1C", away: "2F", group: "Round of 32", stage: "knockout", kickoffUtc: "2026-06-29T07:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Houston", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-06-30": [
    { id: 77, home: "1I", away: "3C/D/F/G/H", group: "Round of 32", stage: "knockout", kickoffUtc: "2026-06-30T13:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "New York/New Jersey (East Rutherford)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 78, home: "2E", away: "2I", group: "Round of 32", stage: "knockout", kickoffUtc: "2026-06-30T07:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Dallas (Arlington)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 79, home: "1A", away: "3C/E/F/H/I", group: "Round of 32", stage: "knockout", kickoffUtc: "2026-06-30T13:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Mexico City", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-07-01": [
    { id: 80, home: "1L", away: "3E/H/I/J/K", group: "Round of 32", stage: "knockout", kickoffUtc: "2026-07-01T08:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Atlanta", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 81, home: "1D", away: "3B/E/F/I/J", group: "Round of 32", stage: "knockout", kickoffUtc: "2026-07-01T10:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "San Francisco Bay Area (Santa Clara)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 82, home: "1G", away: "3A/E/H/I/J", group: "Round of 32", stage: "knockout", kickoffUtc: "2026-07-01T06:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Seattle", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-07-02": [
    { id: 83, home: "2K", away: "2L", group: "Round of 32", stage: "knockout", kickoffUtc: "2026-07-02T15:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Toronto", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 84, home: "1H", away: "2J", group: "Round of 32", stage: "knockout", kickoffUtc: "2026-07-02T05:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Los Angeles (Inglewood)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 85, home: "1B", away: "3E/F/G/I/J", group: "Round of 32", stage: "knockout", kickoffUtc: "2026-07-02T13:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Vancouver", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-07-03": [
    { id: 86, home: "1J", away: "2H", group: "Round of 32", stage: "knockout", kickoffUtc: "2026-07-03T14:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Miami (Miami Gardens)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 87, home: "1K", away: "3D/E/I/J/L", group: "Round of 32", stage: "knockout", kickoffUtc: "2026-07-03T15:30:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Kansas City", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 88, home: "2D", away: "2G", group: "Round of 32", stage: "knockout", kickoffUtc: "2026-07-03T08:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Dallas (Arlington)", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-07-04": [
    { id: 89, home: "W74", away: "W77", group: "Round of 16", stage: "knockout", kickoffUtc: "2026-07-04T13:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Philadelphia", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 90, home: "W73", away: "W75", group: "Round of 16", stage: "knockout", kickoffUtc: "2026-07-04T07:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Houston", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-07-05": [
    { id: 91, home: "W76", away: "W78", group: "Round of 16", stage: "knockout", kickoffUtc: "2026-07-05T12:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "New York/New Jersey (East Rutherford)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 92, home: "W79", away: "W80", group: "Round of 16", stage: "knockout", kickoffUtc: "2026-07-05T12:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Mexico City", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-07-06": [
    { id: 93, home: "W83", away: "W84", group: "Round of 16", stage: "knockout", kickoffUtc: "2026-07-06T09:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Dallas (Arlington)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 94, home: "W81", away: "W82", group: "Round of 16", stage: "knockout", kickoffUtc: "2026-07-06T10:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Seattle", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-07-07": [
    { id: 95, home: "W86", away: "W88", group: "Round of 16", stage: "knockout", kickoffUtc: "2026-07-07T08:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Atlanta", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 96, home: "W85", away: "W87", group: "Round of 16", stage: "knockout", kickoffUtc: "2026-07-07T06:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Vancouver", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-07-09": [
    { id: 97, home: "W89", away: "W90", group: "Quarter-final", stage: "final", kickoffUtc: "2026-07-09T12:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Boston (Foxborough)", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-07-10": [
    { id: 98, home: "W93", away: "W94", group: "Quarter-final", stage: "final", kickoffUtc: "2026-07-10T05:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Los Angeles (Inglewood)", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-07-11": [
    { id: 99, home: "W91", away: "W92", group: "Quarter-final", stage: "final", kickoffUtc: "2026-07-11T13:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Miami (Miami Gardens)", city: null, streamCountByLang: {}, totalStreams: 0 },
    { id: 100, home: "W95", away: "W96", group: "Quarter-final", stage: "final", kickoffUtc: "2026-07-11T15:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Kansas City", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-07-14": [
    { id: 101, home: "W97", away: "W98", group: "Semi-final", stage: "final", kickoffUtc: "2026-07-14T09:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Dallas (Arlington)", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-07-15": [
    { id: 102, home: "W99", away: "W100", group: "Semi-final", stage: "final", kickoffUtc: "2026-07-15T11:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Atlanta", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-07-18": [
    { id: 103, home: "L101", away: "L102", group: "Match for third place", stage: "knockout", kickoffUtc: "2026-07-18T13:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "Miami (Miami Gardens)", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
  "2026-07-19": [
    { id: 104, home: "W101", away: "W102", group: "Final", stage: "final", kickoffUtc: "2026-07-19T11:00:00.000Z", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: "New York/New Jersey (East Rutherford)", city: null, streamCountByLang: {}, totalStreams: 0 },
  ],
};

export function getFixturesForDate(dateStr: string): FixtureData[] {
  if (fixturesByDate[dateStr]) return fixturesByDate[dateStr]
  const allDates = Object.keys(fixturesByDate)
  if (allDates.length === 0) return []
  return fixturesByDate[allDates[0]]
}



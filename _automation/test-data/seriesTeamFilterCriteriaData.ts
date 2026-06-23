import type { SeriesTeamFilterCriteriaModel } from '../models/seriesTeamFilterCriteriaModel.js';

export const seriesTeamFilterCriteria: SeriesTeamFilterCriteriaModel & { metadata: { enabled: boolean } } = {
  seriesName: 'Women\'s T20 World Cup',
  teamSearchTerm: 'india',
  teamName: 'India Women',
  expectedSeriesPageHeading: 'ICC Women\'s T20 World Cup 2026',
  expectedSchedulePageHeading: 'ICC Women\'s T20 World Cup Schedule & Match Results',
  expectedFilteredTeamText: 'India Women',
  metadata: {
    enabled: true
  }
};

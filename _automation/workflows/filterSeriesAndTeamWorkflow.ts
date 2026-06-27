import { CricinfoHomePage } from '../pages/cricinfoHomePage.js';
import { SeriesDetailPage } from '../pages/seriesDetailPage.js';
import { ScheduleFixturesPage } from '../pages/scheduleFixturesPage.js';

export interface FilterSeriesAndTeamResult {
  scheduleHeadingText: string;
  mainResultsText: string;
}

export class FilterSeriesAndTeamWorkflow {
  constructor(
    private readonly cricinfoHomePage: CricinfoHomePage,
    private readonly seriesDetailPage: SeriesDetailPage,
    private readonly scheduleFixturesPage: ScheduleFixturesPage
  ) {}

  async filterBySeriesAndTeam(
    seriesName: string,
    expectedSeriesPageHeading: string,
    teamSearchTerm: string,
    teamName: string,
    expectedSchedulePageHeading: string
  ): Promise<FilterSeriesAndTeamResult> {
    await this.cricinfoHomePage.openSeriesMenu();
    await this.cricinfoHomePage.selectSeries(seriesName);
    await this.seriesDetailPage.waitUntilHeadingVisible(expectedSeriesPageHeading);
    await this.seriesDetailPage.openFixturesAndResults();
    await this.seriesDetailPage.expandTeamsFilter();
    await this.seriesDetailPage.searchTeam(teamSearchTerm);
    await this.seriesDetailPage.selectTeam(teamName);
    await this.seriesDetailPage.applyFilters();
    await this.scheduleFixturesPage.waitUntilHeadingVisible(expectedSchedulePageHeading);

    const scheduleHeadingText = await this.scheduleFixturesPage.getScheduleHeadingText();
    const mainResultsText = await this.scheduleFixturesPage.getMainResultsText();

    return { scheduleHeadingText, mainResultsText };
  }
}

import { ScheduleFixturesPage } from '../pages/scheduleFixturesPage.js';
import { PointsTablePage } from '../pages/pointsTablePage.js';

export interface ViewStandingsTableResult {
  standingsHeadingText: string;
}

export class ViewStandingsTableWorkflow {
  constructor(
    private readonly scheduleFixturesPage: ScheduleFixturesPage,
    private readonly pointsTablePage: PointsTablePage
  ) {}

  async viewStandingsTable(
    expectedSeriesNavigationText: string,
    expectedStandingsHeading: string
  ): Promise<ViewStandingsTableResult> {
    await this.scheduleFixturesPage.confirmSeriesNavigation(expectedSeriesNavigationText);
    await this.scheduleFixturesPage.openStandingsTable();
    await this.pointsTablePage.waitUntilHeadingVisible(expectedStandingsHeading);

    const standingsHeadingText = await this.pointsTablePage.getHeadingText();

    return { standingsHeadingText };
  }
}

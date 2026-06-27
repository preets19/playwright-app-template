import { BasePage } from '@your-org/playwright-base-framework';

export class ScheduleFixturesPage extends BasePage {
  private readonly scheduleHeading = this.page.locator('h1');
  private readonly mainResultsContainer = this.page.locator('#main-container');
  private readonly seriesNavigationLandmark = this.page.getByRole('navigation');
  private readonly standingsTableNavLink = this.page.getByRole('navigation').getByRole('link', { name: 'Table' });

  // Readiness gap: Tier 3 corroboration only; immediate assertion was generic, not page-level (Prompt 1).
  async waitUntilHeadingVisible(expectedHeading: string): Promise<void> {
    await this.waits.forText(this.scheduleHeading, expectedHeading);
  }

  async getScheduleHeadingText(): Promise<string> {
    return this.actions.text(this.scheduleHeading);
  }

  async getMainResultsText(): Promise<string> {
    return this.actions.text(this.mainResultsContainer);
  }

  // Readiness gap: reused via workflow source read, not locator match; readinessGap expected (Phase A.6).
  async confirmSeriesNavigation(expectedSeriesNavigationText: string): Promise<void> {
    await this.waits.forText(this.seriesNavigationLandmark, expectedSeriesNavigationText);
  }

  async openStandingsTable(): Promise<void> {
    await this.actions.click(this.standingsTableNavLink);
  }
}

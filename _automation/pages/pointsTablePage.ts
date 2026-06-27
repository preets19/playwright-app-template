import { BasePage } from '@your-org/playwright-base-framework';

export class PointsTablePage extends BasePage {
  private readonly standingsHeading = this.page.locator('h1');

  async waitUntilHeadingVisible(expectedHeading: string): Promise<void> {
    await this.waits.forText(this.standingsHeading, expectedHeading);
  }

  async getHeadingText(): Promise<string> {
    return this.actions.text(this.standingsHeading);
  }
}

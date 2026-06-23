import { BasePage } from '@your-org/playwright-base-framework';

export class SeriesDetailPage extends BasePage {
  async openFixturesAndResults(): Promise<void> {
    const fixturesAndResultsLink = await this.resolveLocator([
      () => this.page.locator('#tippy-3').getByRole('link', { name: "Women's T20 World Cup" }).getByRole('link', { name: 'Fixtures and Results' }),
      () => this.page.getByRole('link', { name: 'Fixtures and Results' })
      // Manual override: if every automatic candidate above ever fails, add a new first entry here with a manually-confirmed locator (e.g. a full XPath verified by inspecting the live page). This is an expected maintenance path, not an error state.
    ]);
    await this.actions.click(fixturesAndResultsLink);
  }
}

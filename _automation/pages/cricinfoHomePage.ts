import { BasePage } from '@your-org/playwright-base-framework';

export class CricinfoHomePage extends BasePage {
  private readonly navigationLandmark = this.page.getByRole('navigation');

  async open(baseUrl: string): Promise<void> {
    await this.navigateTo(baseUrl);
  }

  override async waitUntilReady(): Promise<void> {
    await this.waits.forText(this.navigationLandmark, 'Series');
  }

  async openSeriesMenu(): Promise<void> {
    const seriesNavLink = await this.resolveLocator([
      () => this.page.getByRole('navigation').getByRole('link', { name: 'Series' }),
      () => this.page.getByRole('link', { name: 'Series' })
      // Manual override: if every automatic candidate above ever fails, add a new first entry here with a manually-confirmed locator (e.g. a full XPath verified by inspecting the live page). This is an expected maintenance path, not an error state.
    ]);
    await this.actions.click(seriesNavLink);
  }

  async selectSeries(seriesName: string): Promise<void> {
    const selectedSeriesLink = await this.resolveLocator([
      () => this.page.locator('#tippy-3').getByRole('link', { name: seriesName }),
      () => this.page.locator('[id^="tippy-"]').getByRole('link', { name: seriesName }),
      () => this.page.getByRole('link', { name: seriesName })
      // Manual override: if every automatic candidate above ever fails, add a new first entry here with a manually-confirmed locator (e.g. a full XPath verified by inspecting the live page). This is an expected maintenance path, not an error state.
    ]);
    await this.actions.click(selectedSeriesLink);
  }
}

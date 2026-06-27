import { BasePage } from '@your-org/playwright-base-framework';

export class SeriesDetailPage extends BasePage {
  private readonly seriesHeading = this.page.locator('h1');
  private readonly fixturesAndResultsLink = this.page.getByRole('link', { name: 'Fixtures and Results' });
  // Provisional: generic div+ordinal selector, no semantic anchor (Prompt 2 Phase D).
  private readonly teamsFilterSection = this.page.locator('div').filter({ hasText: /^Teams$/ }).nth(2);
  // Provisional: class-only selector with .first(), no anchor (Prompt 2 Phase D).
  private readonly teamFilterExpandIcon = this.page.locator('.icon-expand_more-outlined.ds-text-icon-inverse').first();
  private readonly teamSearchInput = this.page.getByRole('textbox', { name: 'search...' });
  private readonly applyFilterButton = this.page.getByRole('button', { name: 'Apply' });

  private teamSearchResultOption(teamName: string) {
    return this.resolveLocator([
      () => this.page.locator('#tippy-76').getByText(teamName),
      () => this.page.locator('[id^="tippy-"]').getByText(teamName),
      () => this.page.getByText(teamName)
      // Manual override: if every automatic candidate above fails, a QA can add a manually-supplied locator (e.g. a confirmed XPath) as a new first entry — expected maintenance, not an error.
    ]);
  }

  // Readiness gap: Tier 3 corroboration only; no immediate page-level confirmation (Prompt 1).
  async waitUntilHeadingVisible(expectedHeading: string): Promise<void> {
    await this.waits.forText(this.seriesHeading, expectedHeading);
  }

  async openFixturesAndResults(): Promise<void> {
    await this.actions.click(this.fixturesAndResultsLink);
  }

  async expandTeamsFilter(): Promise<void> {
    await this.waits.forVisible(this.teamsFilterSection);
    await this.actions.click(this.teamFilterExpandIcon);
  }

  async searchTeam(teamSearchTerm: string): Promise<void> {
    await this.actions.fill(this.teamSearchInput, teamSearchTerm);
  }

  async selectTeam(teamName: string): Promise<void> {
    const option = await this.teamSearchResultOption(teamName);
    await this.actions.click(option);
  }

  async applyFilters(): Promise<void> {
    await this.actions.click(this.applyFilterButton);
  }
}

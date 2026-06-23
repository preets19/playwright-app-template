import { BasePage } from '@your-org/playwright-base-framework';

export class ScheduleFixturesPage extends BasePage {
  override async waitUntilReady(): Promise<void> {
    const teamsFilterSection = await this.resolveLocator([
      () => this.page.locator('#tippy-3').getByRole('link', { name: "Women's T20 World Cup" }).locator('div').filter({ hasText: /^Teams$/ }).nth(2),
      () => this.page.locator('div').filter({ hasText: /^Teams$/ }).nth(2)
      // Manual override: if every automatic candidate above ever fails, add a new first entry here with a manually-confirmed locator (e.g. a full XPath verified by inspecting the live page). This is an expected maintenance path, not an error state.
    ]);
    await this.waits.forVisible(teamsFilterSection);
  }

  async openTeamFilterPopover(): Promise<void> {
    const expandTeamFilterIcon = await this.resolveLocator([
      () => this.page.locator('div').filter({ hasText: /^Teams$/ }).nth(2).locator('.icon-expand_more-outlined.ds-text-icon-inverse').first(),
      () => this.page.locator('.icon-expand_more-outlined.ds-text-icon-inverse').first()
      // Manual override: if every automatic candidate above ever fails, add a new first entry here with a manually-confirmed locator (e.g. a full XPath verified by inspecting the live page). This is an expected maintenance path, not an error state.
    ]);
    await this.actions.click(expandTeamFilterIcon);
  }

  async searchTeam(teamSearchTerm: string): Promise<void> {
    const teamSearchInput = await this.resolveLocator([
      () => this.page.locator('div').filter({ hasText: /^Teams$/ }).nth(2).getByRole('textbox', { name: 'search...' }),
      () => this.page.getByRole('textbox', { name: 'search...' })
      // Manual override: if every automatic candidate above ever fails, add a new first entry here with a manually-confirmed locator (e.g. a full XPath verified by inspecting the live page). This is an expected maintenance path, not an error state.
    ]);
    await this.actions.fill(teamSearchInput, teamSearchTerm);
  }

  async selectTeam(teamName: string): Promise<void> {
    const selectedTeamOption = await this.resolveLocator([
      () => this.page.locator('#tippy-76').getByText(teamName),
      () => this.page.locator('[id^="tippy-"]').getByText(teamName),
      () => this.page.locator('div').filter({ hasText: /^Teams$/ }).nth(2).getByText(teamName),
      () => this.page.getByText(teamName)
      // Manual override: if every automatic candidate above ever fails, add a new first entry here with a manually-confirmed locator (e.g. a full XPath verified by inspecting the live page). This is an expected maintenance path, not an error state.
    ]);
    await this.actions.click(selectedTeamOption);
  }

  async applyFilter(): Promise<void> {
    const applyButton = await this.resolveLocator([
      () => this.page.locator('div').filter({ hasText: /^Teams$/ }).nth(2).getByRole('button', { name: 'Apply' }),
      () => this.page.getByRole('button', { name: 'Apply' })
      // Manual override: if every automatic candidate above ever fails, add a new first entry here with a manually-confirmed locator (e.g. a full XPath verified by inspecting the live page). This is an expected maintenance path, not an error state.
    ]);
    await this.actions.click(applyButton);
  }

  async getScheduleHeadingText(): Promise<string> {
    const scheduleHeading = await this.resolveLocator([
      () => this.page.locator('div').filter({ hasText: /^Teams$/ }).nth(2).locator('h1'),
      () => this.page.locator('h1')
      // Manual override: if every automatic candidate above ever fails, add a new first entry here with a manually-confirmed locator (e.g. a full XPath verified by inspecting the live page). This is an expected maintenance path, not an error state.
    ]);
    return this.actions.text(scheduleHeading);
  }

  async getFilteredResultsText(): Promise<string> {
    const filteredResultsContainer = await this.resolveLocator([
      () => this.page.locator('div').filter({ hasText: /^Teams$/ }).nth(2).locator('#main-container'),
      () => this.page.locator('#main-container')
      // Manual override: if every automatic candidate above ever fails, add a new first entry here with a manually-confirmed locator (e.g. a full XPath verified by inspecting the live page). This is an expected maintenance path, not an error state.
    ]);
    return this.actions.text(filteredResultsContainer);
  }
}

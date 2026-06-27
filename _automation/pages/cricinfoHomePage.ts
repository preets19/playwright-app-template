import { BasePage } from '@your-org/playwright-base-framework';

export class CricinfoHomePage extends BasePage {
  private readonly seriesNavLink = this.page.getByRole('link', { name: 'Series' });

  private dismissWebPushPrompt() {
    // CleverTap's ("wzrk" = WizRocket, CleverTap's former name) own web-push opt-in widget, not the
    // native browser Notification permission banner -- it can appear at any point, not just on first
    // load, so this is meant to be used with pollAndDismiss rather than awaited once directly.
    return this.resolveLocator([
      () => this.page.locator('#wzrk-cancel'),
      () => this.page.locator('.wzrk-alert').getByRole('button', { name: 'Not Now' })
      // Manual override: if every automatic candidate above fails, a QA can add a manually-supplied locator (e.g. a confirmed XPath) as a new first entry — expected maintenance, not an error.
    ]);
  }

private dismissCookieConsentBanner() {
  return this.resolveLocator([
    () => this.page.locator('#onetrust-accept-btn-handler'),
    () => this.page.locator('#onetrust-button-group').getByRole('button', { name: 'Accept All' })
    // Manual override: if every automatic candidate above fails, a QA can add a manually-supplied locator (e.g. a confirmed XPath) as a new first entry — expected maintenance, not an error.
  ]);
}

startDismissingCookieConsentBanner(): () => void {
  return this.pollAndDismiss(() => this.dismissCookieConsentBanner());
}


  startDismissingWebPushPrompt(): () => void {
    return this.pollAndDismiss(() => this.dismissWebPushPrompt());
  }

  private seriesMenuTournamentLink(seriesName: string) {
    return this.resolveLocator([
      // Current markup (verified via DevTools): each series is a plain <li title="..."> containing
      // the link, no tippy wrapper at all anymore -- scoping by the li's title avoids the page-wide
      // ambiguity risk of a bare role lookup matching the same series name elsewhere on the page.
      () => this.page.locator(`li[title*="${seriesName}"]`).getByRole('link', { name: seriesName }),
      () => this.page.locator('#tippy-3').getByRole('link', { name: seriesName }),
      () => this.page.locator('[id^="tippy-"]').getByRole('link', { name: seriesName }),
      () => this.page.getByRole('link', { name: seriesName })
      // Manual override: if every automatic candidate above fails, a QA can add a manually-supplied locator (e.g. a confirmed XPath) as a new first entry — expected maintenance, not an error.
    ]);
  }

  async waitUntilReady(): Promise<void> {
    await super.waitUntilReady();
    await this.waits.forText(this.page.getByRole('navigation'), 'Series');
  }

  async openSeriesMenu(): Promise<void> {
    await this.actions.click(this.seriesNavLink);
  }

  async selectSeries(seriesName: string): Promise<void> {
    const tournamentLink = await this.seriesMenuTournamentLink(seriesName);
    await this.waits.forVisible(tournamentLink);
    await this.actions.click(tournamentLink);
  }
}

import { BasePage } from '@your-org/playwright-base-framework';

export class HomePage extends BasePage {
  private readonly inventoryContainer = this.page.locator('[data-test="inventory-container"]');
  private readonly pageHeading = this.page.locator('[data-test="title"]');

  async isLoaded(): Promise<boolean> {
    return this.actions.isVisible(this.inventoryContainer);
  }

  async pageTitleText(): Promise<string> {
    return this.actions.text(this.pageHeading);
  }
}

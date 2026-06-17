import { BasePage } from '@your-org/playwright-base-framework';
import { SampleCartPage } from './sampleCartPage.js';

export class SampleProductDetailsPage extends BasePage {
  private readonly addToCartButton = this.page.locator('[data-test="add-to-cart"]');
  private readonly cartLink = this.page.locator('[data-test="nav-cart"]');
  private readonly closeSplitScreenButton = this.page.getByRole('button', { name: /close split screen/i });

  async addToCart(): Promise<void> {
    await this.actions.click(this.addToCartButton);
  }

  async closeSplitScreenIfVisible(): Promise<void> {
    if (await this.actions.isVisible(this.closeSplitScreenButton)) {
      await this.actions.click(this.closeSplitScreenButton);
    }
  }

  async openCart(): Promise<SampleCartPage> {
    await this.actions.click(this.cartLink);

    const cartPage = new SampleCartPage(this.page);
    await cartPage.waitUntilReady();
    return cartPage;
  }
}

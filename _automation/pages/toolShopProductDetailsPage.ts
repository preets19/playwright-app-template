import { BasePage } from '@your-org/playwright-base-framework';
import { ToolShopCartPage } from './toolShopCartPage.js';

export class ToolShopProductDetailsPage extends BasePage {
  private readonly addToCartButton = this.page.locator('[data-test="add-to-cart"]');
  private readonly cartLink = this.page.locator('[data-test="nav-cart"]');
  private readonly closeSplitScreenButton = this.page.getByRole('button', { name: /close split screen/i });

  async addToCart(): Promise<void> {
    await this.actions.click(this.addToCartButton);
  }

  async openCart(): Promise<ToolShopCartPage> {
    await this.actions.click(this.cartLink);
    return new ToolShopCartPage(this.page);
  }

  async closeSplitScreenIfVisible(): Promise<void> {
    if (await this.actions.isVisible(this.closeSplitScreenButton)) {
      await this.actions.click(this.closeSplitScreenButton);
    }
  }
}

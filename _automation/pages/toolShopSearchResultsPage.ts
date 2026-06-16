import { BasePage } from '@your-org/playwright-base-framework';
import { ToolShopProductDetailsPage } from './toolShopProductDetailsPage.js';

export class ToolShopSearchResultsPage extends BasePage {
  private readonly productCards = this.page.locator('[data-test^="product-"]');

  async firstProductName(searchTerm: string): Promise<string> {
    const product = this.firstProductMatching(searchTerm);
    await this.waits.forVisible(product);
    return this.actions.text(product.locator('[data-test="product-name"]'));
  }

  async firstProductPrice(searchTerm: string): Promise<string> {
    const product = this.firstProductMatching(searchTerm);
    await this.waits.forVisible(product);
    return this.actions.text(product.locator('[data-test="product-price"]'));
  }

  async openFirstProduct(searchTerm: string): Promise<ToolShopProductDetailsPage> {
    const product = this.firstProductMatching(searchTerm);
    await this.waits.forVisible(product);
    await this.actions.click(product);
    const detailsPage = new ToolShopProductDetailsPage(this.page);
    await detailsPage.waitUntilReady();
    return detailsPage;
  }

  private firstProductMatching(searchTerm: string) {
    return this.productCards.filter({ hasText: searchTerm }).first();
  }
}

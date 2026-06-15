import { BasePage } from '@your-org/playwright-base-framework';
import { ToolShopProductDetailsPage } from './toolShopProductDetailsPage.js';

export class ToolShopSearchResultsPage extends BasePage {
  private readonly productCards = this.page.locator('[data-test^="product-"]');

  async firstProductName(searchTerm: string): Promise<string> {
    const product = this.firstProductMatching(searchTerm);
    await product.waitFor();
    return this.actions.text(product.locator('[data-test="product-name"]'));
  }

  async firstProductPrice(searchTerm: string): Promise<string> {
    const product = this.firstProductMatching(searchTerm);
    await product.waitFor();
    return this.actions.text(product.locator('[data-test="product-price"]'));
  }

  async openFirstProduct(searchTerm: string): Promise<ToolShopProductDetailsPage> {
    const product = this.firstProductMatching(searchTerm);
    await product.waitFor();
    await this.actions.click(product);
    return new ToolShopProductDetailsPage(this.page);
  }

  private firstProductMatching(searchTerm: string) {
    return this.productCards.filter({ hasText: searchTerm }).first();
  }
}

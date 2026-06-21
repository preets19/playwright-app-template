import { BasePage } from '@your-org/playwright-base-framework';

export class SampleInventoryPage extends BasePage {
  private readonly inventoryPageTitle = this.page.locator('[data-test="title"]');
  // Provisional: product names are expected to be unique until a stable product-card scope is recorded.
  private readonly inventoryProductNameByProduct = (productName: string) =>
    this.page.locator('[data-test="inventory-item-name"]').filter({ hasText: productName }).first();
  // Provisional: this price is not scoped to the same inventory item as the product name.
  private readonly inventoryProductPriceByPrice = (expectedPrice: string) =>
    this.page.locator('[data-test="inventory-list"]').getByText(expectedPrice, { exact: true }).first();
  private readonly addToCartButtonByProduct = (productSlug: string) =>
    this.page.locator(`[data-test="add-to-cart-${productSlug}"]`);
  private readonly shoppingCartLink = this.page.locator('[data-test="shopping-cart-link"]');

  override async waitUntilReady(): Promise<void> {
    await this.waits.forVisible(this.inventoryPageTitle);
  }

  async getHeadingText(): Promise<string> {
    return this.actions.text(this.inventoryPageTitle);
  }

  async waitForProductName(productName: string): Promise<void> {
    await this.waits.forVisible(this.inventoryProductNameByProduct(productName));
  }

  async waitForProductPrice(expectedPrice: string): Promise<void> {
    await this.waits.forVisible(this.inventoryProductPriceByPrice(expectedPrice));
  }

  async addProductToCart(productSlug: string): Promise<void> {
    await this.actions.click(this.addToCartButtonByProduct(productSlug));
  }

  async openCart(): Promise<void> {
    await this.actions.click(this.shoppingCartLink);
  }
}
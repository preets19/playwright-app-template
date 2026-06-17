import { BasePage } from '@your-org/playwright-base-framework';
import type { Locator } from '@playwright/test';
import type { ProductModel } from '../models/checkoutModel.js';
import { CartPage } from './cartPage.js';

export class ProductsPage extends BasePage {
  private readonly pageTitle = this.page.locator('[data-test="title"]');
  private readonly productSortSelect = this.page.locator('[data-test="product-sort-container"]');
  private readonly shoppingCartLink = this.page.locator('[data-test="shopping-cart-link"]');

  override async waitUntilReady(): Promise<void> {
    await super.waitUntilReady();
    await this.waits.forExactText(this.pageTitle, 'Products', { description: 'Products page title' });
    await this.waits.forEnabled(this.productSortSelect, { description: 'Product sort select' });
  }

  async sortProducts(sortOrder: string): Promise<void> {
    await this.actions.selectByValue(this.productSortSelect, sortOrder);
  }

  async waitForProduct(product: ProductModel): Promise<void> {
    await this.waits.forVisible(this.productTitle(product), {
      description: `${product.name} product title`
    });
    await this.waits.forVisible(this.productPrice(product), {
      description: `${product.name} product price`
    });
  }

  async addProductToCart(product: ProductModel): Promise<void> {
    await this.waitForProduct(product);
    await this.actions.click(this.addToCartButton(product), {
      description: `${product.name} add to cart button`
    });
  }

  async openCart(): Promise<CartPage> {
    await this.actions.click(this.shoppingCartLink, { description: 'Shopping cart link' });

    const cartPage = new CartPage(this.page);
    await cartPage.waitUntilReady();
    return cartPage;
  }

  private productTitle(product: ProductModel): Locator {
    return this.page.locator(`[data-test="${product.titleTestId}"]`);
  }

  private productPrice(product: ProductModel): Locator {
    return this.productContainer(product)
      .locator('[data-test="inventory-item-price"]')
      .filter({ hasText: product.price });
  }

  private addToCartButton(product: ProductModel): Locator {
    return this.page.locator(`[data-test="${product.addToCartTestId}"]`);
  }

  private productContainer(product: ProductModel): Locator {
    return this.page.locator('.inventory_item').filter({ has: this.productTitle(product) });
  }
}

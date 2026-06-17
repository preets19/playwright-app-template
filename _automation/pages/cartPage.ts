import { BasePage } from '@your-org/playwright-base-framework';
import type { Locator } from '@playwright/test';
import type { ProductModel } from '../models/checkoutModel.js';
import { CheckoutPage } from './checkoutPage.js';

export class CartPage extends BasePage {
  private readonly pageTitle = this.page.locator('[data-test="title"]');
  private readonly checkoutButton = this.page.locator('[data-test="checkout"]');

  override async waitUntilReady(): Promise<void> {
    await super.waitUntilReady();
    await this.waits.forExactText(this.pageTitle, 'Your Cart', { description: 'Cart page title' });
    await this.waits.forEnabled(this.checkoutButton, { description: 'Checkout button' });
  }

  async waitForProduct(product: ProductModel): Promise<void> {
    await this.waits.forVisible(this.productTitle(product), {
      description: `${product.name} cart item`
    });
    await this.waits.forVisible(this.productPriceLocator(product), {
      description: `${product.name} cart price`
    });
  }

  async productName(product: ProductModel): Promise<string> {
    await this.waitForProduct(product);
    return this.actions.text(this.productTitle(product));
  }

  async productPrice(product: ProductModel): Promise<string> {
    await this.waitForProduct(product);
    return this.actions.text(this.productPriceLocator(product));
  }

  async proceedToCheckout(): Promise<CheckoutPage> {
    await this.actions.click(this.checkoutButton, { description: 'Checkout button' });

    const checkoutPage = new CheckoutPage(this.page);
    await checkoutPage.waitForInformationStep();
    return checkoutPage;
  }

  private productTitle(product: ProductModel): Locator {
    return this.page.locator(`[data-test="${product.titleTestId}"]`);
  }

  private productPriceLocator(product: ProductModel): Locator {
    return this.productContainer(product)
      .locator('[data-test="inventory-item-price"]')
      .filter({ hasText: product.price });
  }

  private productContainer(product: ProductModel): Locator {
    return this.page.locator('.cart_item').filter({ has: this.productTitle(product) });
  }
}

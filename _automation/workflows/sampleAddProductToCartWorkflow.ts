import type { Page } from '@playwright/test';
import type { SampleProductSelectionModel } from '../models/sampleProductSelectionModel.js';
import { SampleCartPage } from '../pages/sampleCartPage.js';
import { SampleInventoryPage } from '../pages/sampleInventoryPage.js';

export interface SampleAddProductToCartWorkflowResult {
  cartPageHeading: string;
  cartProductName: string;
  cartProductPrice: string;
}

export class SampleAddProductToCartWorkflow {
  constructor(private readonly page: Page) {}

  async addProductToCart(
    product: SampleProductSelectionModel,
    expectedCartPageHeading: string
  ): Promise<SampleAddProductToCartWorkflowResult> {
    const inventoryPage = new SampleInventoryPage(this.page);
    await inventoryPage.waitUntilReady();
    await inventoryPage.waitForProductName(product.productName);
    await inventoryPage.waitForProductPrice(product.expectedPrice);
    await inventoryPage.addProductToCart(product.productSlug);
    await inventoryPage.openCart();

    const cartPage = new SampleCartPage(this.page);
    await cartPage.waitUntilReady();
    await cartPage.waitForHeadingText(expectedCartPageHeading);

    return {
      cartPageHeading: await cartPage.getHeadingText(),
      cartProductName: await cartPage.getProductName(product.productName),
      cartProductPrice: await cartPage.getProductPrice(product.expectedPrice)
    };
  }
}
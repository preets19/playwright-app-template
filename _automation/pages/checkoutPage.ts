import { BasePage } from '@your-org/playwright-base-framework';
import type { Locator } from '@playwright/test';
import type {
  CheckoutInformationModel,
  ProductModel
} from '../models/checkoutModel.js';

export class CheckoutPage extends BasePage {
  private readonly pageTitle = this.page.locator('[data-test="title"]');
  private readonly firstNameInput = this.page.locator('[data-test="firstName"]');
  private readonly lastNameInput = this.page.locator('[data-test="lastName"]');
  private readonly postalCodeInput = this.page.locator('[data-test="postalCode"]');
  private readonly continueButton = this.page.locator('[data-test="continue"]');
  private readonly finishButton = this.page.locator('[data-test="finish"]');
  private readonly secondaryHeader = this.page.locator('[data-test="secondary-header"]');
  private readonly completeHeader = this.page.locator('[data-test="complete-header"]');

  async waitForInformationStep(): Promise<void> {
    await super.waitUntilReady();
    await this.waits.forExactText(this.pageTitle, 'Checkout: Your Information', {
      description: 'Checkout information title'
    });
    await this.waits.forEditable(this.firstNameInput, { description: 'First name input' });
    await this.waits.forEditable(this.lastNameInput, { description: 'Last name input' });
    await this.waits.forEditable(this.postalCodeInput, { description: 'Postal code input' });
    await this.waits.forEnabled(this.continueButton, { description: 'Continue button' });
  }

  async enterCheckoutInformation(information: CheckoutInformationModel): Promise<void> {
    await this.actions.clearAndFill(this.firstNameInput, information.firstName);
    await this.actions.clearAndFill(this.lastNameInput, information.lastName);
    await this.actions.clearAndFill(this.postalCodeInput, information.postalCode);
  }

  async continueToOverview(product: ProductModel): Promise<void> {
    await this.actions.click(this.continueButton, { description: 'Continue button' });
    await this.waitForOverviewStep(product);
  }

  async waitForOverviewStep(product: ProductModel): Promise<void> {
    await this.waits.forExactText(this.pageTitle, 'Checkout: Overview', {
      description: 'Checkout overview title'
    });
    await this.waits.forVisible(this.overviewProductTitle(product), {
      description: `${product.name} overview item`
    });
    await this.waits.forVisible(this.overviewProductPriceLocator(product), {
      description: `${product.name} overview price`
    });
    await this.waits.forEnabled(this.finishButton, { description: 'Finish button' });
  }

  async overviewProductName(product: ProductModel): Promise<string> {
    await this.waitForOverviewStep(product);
    return this.actions.text(this.overviewProductTitle(product));
  }

  async overviewProductPrice(product: ProductModel): Promise<string> {
    await this.waitForOverviewStep(product);
    return this.actions.text(this.overviewProductPriceLocator(product));
  }

  async finishCheckout(): Promise<void> {
    await this.actions.click(this.finishButton, { description: 'Finish button' });
    await this.waitForCompleteStep();
  }

  async waitForCompleteStep(): Promise<void> {
    await this.waits.forExactText(this.pageTitle, 'Checkout: Complete!', {
      description: 'Checkout complete title'
    });
    await this.waits.forVisible(this.secondaryHeader, { description: 'Checkout complete header' });
    await this.waits.forVisible(this.completeHeader, { description: 'Checkout complete message' });
  }

  async successMessage(): Promise<string> {
    await this.waitForCompleteStep();
    return this.actions.text(this.completeHeader);
  }

  private overviewProductTitle(product: ProductModel): Locator {
    return this.page.locator(`[data-test="${product.titleTestId}"]`);
  }

  private overviewProductPriceLocator(product: ProductModel): Locator {
    return this.overviewProductContainer(product)
      .locator('[data-test="inventory-item-price"]')
      .filter({ hasText: product.price });
  }

  private overviewProductContainer(product: ProductModel): Locator {
    return this.page.locator('.cart_item').filter({ has: this.overviewProductTitle(product) });
  }
}

import { BasePage } from '@your-org/playwright-base-framework';
import type { SampleCheckoutInformationModel } from '../models/sampleCheckoutInformationModel.js';

export class SampleCheckoutInformationPage extends BasePage {
  private readonly checkoutInformationPageTitle = this.page.locator('[data-test="title"]');
  private readonly firstNameInput = this.page.locator('[data-test="firstName"]');
  private readonly lastNameInput = this.page.locator('[data-test="lastName"]');
  private readonly postalCodeInput = this.page.locator('[data-test="postalCode"]');
  private readonly continueButton = this.page.locator('[data-test="continue"]');

  override async waitUntilReady(): Promise<void> {
    await this.waits.forVisible(this.checkoutInformationPageTitle);
  }

  async waitForHeadingText(expectedInformationPageHeading: string): Promise<void> {
    await this.waits.forText(this.checkoutInformationPageTitle, expectedInformationPageHeading);
  }

  async enterInformation(checkoutInformation: SampleCheckoutInformationModel): Promise<void> {
    await this.actions.fill(this.firstNameInput, checkoutInformation.firstName);
    await this.actions.fill(this.lastNameInput, checkoutInformation.lastName);
    await this.actions.fill(this.postalCodeInput, checkoutInformation.postalCode);
  }

  async continueCheckout(): Promise<void> {
    await this.actions.click(this.continueButton);
  }
}
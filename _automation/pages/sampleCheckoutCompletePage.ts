import { BasePage } from '@your-org/playwright-base-framework';

export class SampleCheckoutCompletePage extends BasePage {
  private readonly checkoutCompletePageTitle = this.page.locator('[data-test="title"]');
  private readonly orderConfirmationMessage = this.page.locator('[data-test="complete-header"]');

  override async waitUntilReady(): Promise<void> {
    await this.waits.forVisible(this.checkoutCompletePageTitle);
  }

  async waitForHeadingText(expectedCompletePageHeading: string): Promise<void> {
    await this.waits.forText(this.checkoutCompletePageTitle, expectedCompletePageHeading);
  }

  async waitForOrderConfirmationText(expectedOrderConfirmationMessage: string): Promise<void> {
    await this.waits.forText(this.orderConfirmationMessage, expectedOrderConfirmationMessage);
  }

  async getHeadingText(): Promise<string> {
    return this.actions.text(this.checkoutCompletePageTitle);
  }

  async getOrderConfirmationText(): Promise<string> {
    return this.actions.text(this.orderConfirmationMessage);
  }
}
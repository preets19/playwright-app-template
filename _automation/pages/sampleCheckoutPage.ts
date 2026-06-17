import { BasePage } from '@your-org/playwright-base-framework';
import type {
  SampleAddressModel,
  SampleGuestModel,
  SamplePaymentModel
} from '../models/sampleCheckoutModel.js';

export class SampleCheckoutPage extends BasePage {
  private readonly loginHeading = this.page.getByRole('heading', { name: 'Login' });
  private readonly continueAsGuestTab = this.page.getByRole('tab', { name: 'Continue as Guest' });
  private readonly guestEmailInput = this.page.locator('[data-test="guest-email"]');
  private readonly guestFirstNameInput = this.page.locator('[data-test="guest-first-name"]');
  private readonly guestLastNameInput = this.page.locator('[data-test="guest-last-name"]');
  private readonly guestSubmitButton = this.page.locator('[data-test="guest-submit"]');
  private readonly proceedAsGuestButton = this.page.locator('[data-test="proceed-2-guest"]');
  private readonly countrySelect = this.page.locator('[data-test="country"]');
  private readonly postalCodeInput = this.page.locator('[data-test="postal_code"]');
  private readonly houseNumberInput = this.page.locator('[data-test="house_number"]');
  private readonly cityInput = this.page.locator('[data-test="city"]');
  private readonly stateInput = this.page.locator('[data-test="state"]');
  private readonly streetInput = this.page.locator('[data-test="street"]');
  private readonly proceedToPaymentButton = this.page.locator('[data-test="proceed-3"]');
  private readonly paymentMethodSelect = this.page.locator('[data-test="payment-method"]');
  private readonly monthlyInstallmentsSelect = this.page.locator('[data-test="monthly_installments"]');
  private readonly finishButton = this.page.locator('[data-test="finish"]');
  private readonly successMessage = this.page.locator('[data-test="payment-success-message"]');

  override async waitUntilReady(): Promise<void> {
    await super.waitUntilReady();
    await this.waits.forVisible(this.loginHeading, { description: 'Checkout login heading' });
  }

  async continueAsGuest(guest: SampleGuestModel): Promise<void> {
    await this.actions.clickTab(this.continueAsGuestTab, this.guestEmailInput, {
      description: 'Continue as Guest tab'
    });
    await this.actions.clearAndFill(this.guestEmailInput, guest.email);
    await this.actions.clearAndFill(this.guestFirstNameInput, guest.firstName);
    await this.actions.clearAndFill(this.guestLastNameInput, guest.lastName);
    await this.actions.click(this.guestSubmitButton);
  }

  async proceedToBillingAddress(): Promise<void> {
    await this.actions.click(this.proceedAsGuestButton);
    await this.waits.forVisible(this.countrySelect, { description: 'Billing country select' });
  }

  async enterBillingAddress(address: SampleAddressModel): Promise<void> {
    await this.actions.selectByValue(this.countrySelect, address.country);
    await this.actions.clearAndFill(this.postalCodeInput, address.postalCode);
    await this.actions.clearAndFill(this.houseNumberInput, address.houseNumber);

    if (address.city) {
      await this.actions.clearAndFill(this.cityInput, address.city);
    }

    if (address.state) {
      await this.actions.clearAndFill(this.stateInput, address.state);
    }

    if (address.street) {
      await this.actions.clearAndFill(this.streetInput, address.street);
    }

    await this.actions.click(this.proceedToPaymentButton);
    await this.waits.forVisible(this.paymentMethodSelect, { description: 'Payment method select' });
  }

  async payByBuyNowPayLater(payment: SamplePaymentModel): Promise<void> {
    await this.actions.selectByValue(this.paymentMethodSelect, payment.method);
    await this.actions.selectByValue(this.monthlyInstallmentsSelect, payment.monthlyInstallments);
    await this.actions.click(this.finishButton);
  }

  async paymentSuccessMessage(): Promise<string> {
    await this.waits.forVisible(this.successMessage, { description: 'Payment success message' });
    return this.actions.text(this.successMessage);
  }
}

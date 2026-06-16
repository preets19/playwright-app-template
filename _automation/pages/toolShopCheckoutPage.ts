import { BasePage } from '@your-org/playwright-base-framework';
import type {
  ToolShopAddressModel,
  ToolShopGuestModel,
  ToolShopPaymentModel
} from '../models/toolShopCheckoutModel.js';

export class ToolShopCheckoutPage extends BasePage {
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
  private readonly creditCardNumberInput = this.page.locator('[data-test="credit_card_number"]');
  private readonly expirationDateInput = this.page.locator('[data-test="expiration_date"]');
  private readonly cvvInput = this.page.locator('[data-test="cvv"]');
  private readonly cardHolderNameInput = this.page.locator('[data-test="card_holder_name"]');
  private readonly finishButton = this.page.locator('[data-test="finish"]');
  private readonly successMessage = this.page.locator('[data-test="payment-success-message"]');

  async isLoaded(): Promise<boolean> {
    return this.page.url().includes('/checkout') && await this.actions.isVisible(this.loginHeading);
  }

  async continueAsGuest(guest: ToolShopGuestModel): Promise<void> {
    await this.actions.click(this.continueAsGuestTab);
    await this.actions.clearAndFill(this.guestEmailInput, guest.email);
    await this.actions.clearAndFill(this.guestFirstNameInput, guest.firstName);
    await this.actions.clearAndFill(this.guestLastNameInput, guest.lastName);
    await this.actions.click(this.guestSubmitButton);
  }

  async proceedToBillingAddress(): Promise<void> {
    await this.actions.click(this.proceedAsGuestButton);
  }

  async enterBillingAddress(address: ToolShopAddressModel): Promise<void> {
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
  }

  async payByCreditCard(payment: ToolShopPaymentModel): Promise<void> {
    if (!payment.creditCardNumber || !payment.expirationDate || !payment.cvv || !payment.cardHolderName) {
      throw new Error('Credit card payment requires card number, expiration date, CVV, and card holder name.');
    }

    await this.actions.selectByValue(this.paymentMethodSelect, payment.method);
    await this.actions.clearAndFill(this.creditCardNumberInput, payment.creditCardNumber);
    await this.actions.clearAndFill(this.expirationDateInput, payment.expirationDate);
    await this.actions.clearAndFill(this.cvvInput, payment.cvv);
    await this.actions.clearAndFill(this.cardHolderNameInput, payment.cardHolderName);
    await this.actions.click(this.finishButton);
  }

  async payByBuyNowPayLater(payment: ToolShopPaymentModel): Promise<void> {
    if (!payment.monthlyInstallments) {
      throw new Error('Buy now pay later payment requires monthlyInstallments.');
    }

    await this.actions.selectByValue(this.paymentMethodSelect, payment.method);
    await this.actions.selectByValue(this.monthlyInstallmentsSelect, payment.monthlyInstallments);
    await this.actions.click(this.finishButton);
  }

  async paymentSuccessMessage(): Promise<string> {
    await this.waits.forVisible(this.successMessage);
    return this.actions.text(this.successMessage);
  }
}

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
  private readonly proceedToPaymentButton = this.page.locator('[data-test="proceed-3"]');
  private readonly paymentMethodSelect = this.page.locator('[data-test="payment-method"]');
  private readonly creditCardNumberInput = this.page.locator('[data-test="credit_card_number"]');
  private readonly expirationDateInput = this.page.locator('[data-test="expiration_date"]');
  private readonly cvvInput = this.page.locator('[data-test="cvv"]');
  private readonly cardHolderNameInput = this.page.locator('[data-test="card_holder_name"]');
  private readonly finishButton = this.page.locator('[data-test="finish"]');
  private readonly successMessage = this.page.getByText(/payment was successful/i);

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
    await this.countrySelect.selectOption(address.country);
    await this.actions.clearAndFill(this.postalCodeInput, address.postalCode);
    await this.actions.clearAndFill(this.houseNumberInput, address.houseNumber);
    await this.actions.click(this.proceedToPaymentButton);
  }

  async payByCreditCard(payment: ToolShopPaymentModel): Promise<void> {
    await this.paymentMethodSelect.selectOption(payment.method);
    await this.actions.clearAndFill(this.creditCardNumberInput, payment.creditCardNumber);
    await this.actions.clearAndFill(this.expirationDateInput, payment.expirationDate);
    await this.actions.clearAndFill(this.cvvInput, payment.cvv);
    await this.actions.clearAndFill(this.cardHolderNameInput, payment.cardHolderName);
    await this.actions.click(this.finishButton);
  }

  async paymentSuccessMessage(): Promise<string> {
    await this.successMessage.waitFor();
    return this.actions.text(this.successMessage);
  }
}

import type { Page } from '@playwright/test';
import type { SampleGuestCheckoutModel } from '../models/sampleCheckoutModel.js';
import { SampleHomePage } from '../pages/sampleHomePage.js';

export class SampleCheckoutWorkflow {
  constructor(private readonly page: Page) {}

  async checkoutRentalProductAsGuest(checkout: SampleGuestCheckoutModel) {
    const homePage = new SampleHomePage(this.page);
    await homePage.open();

    const rentalsPage = await homePage.openRentals();
    const detailsPage = await rentalsPage.openRentalProduct(checkout.product);
    await detailsPage.addToCart();
    await detailsPage.closeSplitScreenIfVisible();

    const cartPage = await detailsPage.openCart();
    const cartProduct = {
      name: await cartPage.productName(),
      price: await cartPage.price()
    };

    const checkoutPage = await cartPage.proceedToCheckout();
    await checkoutPage.continueAsGuest(checkout.guest);
    await checkoutPage.proceedToBillingAddress();
    await checkoutPage.enterBillingAddress(checkout.billingAddress);
    await checkoutPage.payByBuyNowPayLater(checkout.payment);

    return {
      selectedProduct: checkout.product,
      cartProduct,
      paymentSuccessMessage: await checkoutPage.paymentSuccessMessage()
    };
  }
}

import type { Page } from '@playwright/test';
import type { ToolShopGuestCheckoutModel } from '../models/toolShopCheckoutModel.js';
import type { ToolShopProductModel } from '../models/toolShopProductModel.js';
import { ToolShopHomePage } from '../pages/toolShopHomePage.js';

export class ToolShopCheckoutWorkflow {
  constructor(private readonly page: Page) {}

  async addFirstMatchingProductToCartAndStartCheckout(product: ToolShopProductModel) {
    if (!product.searchTerm) {
      throw new Error('Product search checkout requires searchTerm.');
    }

    const homePage = new ToolShopHomePage(this.page);
    await homePage.open();

    const resultsPage = await homePage.searchForProduct(product.searchTerm);
    const selectedProduct = {
      name: await resultsPage.firstProductName(product.searchTerm),
      price: await resultsPage.firstProductPrice(product.searchTerm)
    };

    const detailsPage = await resultsPage.openFirstProduct(product.searchTerm);
    await detailsPage.addToCart();

    const cartPage = await detailsPage.openCart();
    const cartProduct = {
      name: await cartPage.productName(),
      price: await cartPage.price()
    };

    const checkoutPage = await cartPage.proceedToCheckout();

    return {
      selectedProduct,
      cartProduct,
      checkoutPage
    };
  }

  async checkoutFirstMatchingProductAsGuest(checkout: ToolShopGuestCheckoutModel) {
    const startedCheckout = await this.addFirstMatchingProductToCartAndStartCheckout(checkout.product);

    await startedCheckout.checkoutPage.continueAsGuest(checkout.guest);
    await startedCheckout.checkoutPage.proceedToBillingAddress();
    await startedCheckout.checkoutPage.enterBillingAddress(checkout.billingAddress);
    await startedCheckout.checkoutPage.payByCreditCard(checkout.payment);

    return {
      ...startedCheckout,
      paymentSuccessMessage: await startedCheckout.checkoutPage.paymentSuccessMessage()
    };
  }

  async checkoutRentalProductAsGuest(checkout: ToolShopGuestCheckoutModel) {
    const homePage = new ToolShopHomePage(this.page);
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
      selectedProduct: {
        name: checkout.product.productName
      },
      cartProduct,
      paymentSuccessMessage: await checkoutPage.paymentSuccessMessage()
    };
  }
}

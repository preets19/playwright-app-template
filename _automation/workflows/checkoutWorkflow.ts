import type { Page } from '@playwright/test';
import type {
  CheckoutModel,
  CheckoutResultModel
} from '../models/checkoutModel.js';
import { LoginPage } from '../pages/loginPage.js';

export class CheckoutWorkflow {
  constructor(private readonly page: Page) {}

  async checkoutProduct(checkout: CheckoutModel): Promise<CheckoutResultModel> {
    const loginPage = new LoginPage(this.page);
    await loginPage.open(checkout.startPath);

    const productsPage = await loginPage.loginAs(checkout.user);

    if (checkout.product.sortOrder) {
      await productsPage.sortProducts(checkout.product.sortOrder);
    }

    await productsPage.waitForProduct(checkout.product);
    await productsPage.addProductToCart(checkout.product);

    const cartPage = await productsPage.openCart();
    const cartProductName = await cartPage.productName(checkout.product);
    const cartProductPrice = await cartPage.productPrice(checkout.product);

    const checkoutPage = await cartPage.proceedToCheckout();
    await checkoutPage.enterCheckoutInformation(checkout.checkoutInformation);
    await checkoutPage.continueToOverview(checkout.product);

    const overviewProductName = await checkoutPage.overviewProductName(checkout.product);
    const overviewProductPrice = await checkoutPage.overviewProductPrice(checkout.product);

    await checkoutPage.finishCheckout();

    return {
      selectedProduct: checkout.product,
      cartProductName,
      cartProductPrice,
      overviewProductName,
      overviewProductPrice,
      paymentSuccessMessage: await checkoutPage.successMessage()
    };
  }
}

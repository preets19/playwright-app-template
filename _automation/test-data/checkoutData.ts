import type { CheckoutModel } from '../models/checkoutModel.js';

export const standardUserCheckout: CheckoutModel = {
  startPath: '/',
  user: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  product: {
    name: 'Sauce Labs Onesie',
    price: '$7.99',
    sortOrder: 'za',
    titleTestId: 'item-2-title-link',
    addToCartTestId: 'add-to-cart-sauce-labs-onesie'
  },
  checkoutInformation: {
    firstName: 'test',
    lastName: 'shopper',
    postalCode: '55122'
  },
  expectedSuccessMessage: 'Thank you for your order'
};

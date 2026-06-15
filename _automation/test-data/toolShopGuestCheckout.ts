import type { ToolShopGuestCheckoutModel } from '../models/toolShopCheckoutModel.js';
import { hammerProduct } from './toolShopProducts.js';

export const guestCheckout: ToolShopGuestCheckoutModel = {
  product: hammerProduct,
  guest: {
    email: 'guest@guest.com',
    firstName: 'guest',
    lastName: 'shopper'
  },
  billingAddress: {
    country: 'US',
    postalCode: '55124',
    houseNumber: '1122'
  },
  payment: {
    method: 'credit-card',
    creditCardNumber: '1234-1234-1234-1234',
    expirationDate: '01/2027',
    cvv: '238',
    cardHolderName: 'guest shopper'
  },
  expectedSuccessMessage: 'Payment was successful'
};

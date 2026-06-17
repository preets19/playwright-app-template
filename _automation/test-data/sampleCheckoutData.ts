import type { SampleGuestCheckoutModel } from '../models/sampleCheckoutModel.js';

export const sampleGuestCheckout: SampleGuestCheckoutModel = {
  product: {
    productName: 'Excavator'
  },
  guest: {
    email: 'test@email.com',
    firstName: 'test',
    lastName: 'shop'
  },
  billingAddress: {
    country: 'US',
    postalCode: '55124',
    houseNumber: '1212',
    city: 'Test City',
    state: 'MN',
    street: 'test ave'
  },
  payment: {
    method: 'buy-now-pay-later',
    monthlyInstallments: '3'
  },
  expectedSuccessMessage: 'Payment was successful'
};

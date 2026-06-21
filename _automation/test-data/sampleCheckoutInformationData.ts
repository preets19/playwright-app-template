import type { SampleCheckoutInformationModel } from '../models/sampleCheckoutInformationModel.js';

export const sampleCheckoutInformation: SampleCheckoutInformationModel & {
  expectedInformationPageHeading: string;
  expectedOverviewPageHeading: string;
  expectedCompletePageHeading: string;
  expectedOrderConfirmationMessage: string;
  metadata: { enabled: boolean };
} = {
  firstName: 'test',
  lastName: 'shopper',
  postalCode: '55122',
  expectedInformationPageHeading: 'Checkout: Your Information',
  expectedOverviewPageHeading: 'Checkout: Overview',
  expectedCompletePageHeading: 'Checkout: Complete!',
  expectedOrderConfirmationMessage: 'Thank you for your order!',
  metadata: {
    enabled: true
  }
};
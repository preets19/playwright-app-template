import type { SampleProductSelectionModel } from '../models/sampleProductSelectionModel.js';

export const sampleBackpackProduct: SampleProductSelectionModel & {
  expectedCartPageHeading: string;
  metadata: { enabled: boolean };
} = {
  productName: 'Sauce Labs Backpack',
  productSlug: 'sauce-labs-backpack',
  expectedPrice: '$29.99',
  expectedCartPageHeading: 'Your Cart',
  metadata: {
    enabled: true
  }
};
import type { SampleLoginCredentialsModel } from '../models/sampleLoginCredentialsModel.js';

export const sampleStandardUserCredentials: SampleLoginCredentialsModel & {
  expectedLoginPageHeading: string;
  expectedInventoryPageHeading: string;
  metadata: { enabled: boolean };
} = {
  username: 'standard_user',
  password: 'secret_sauce',
  expectedLoginPageHeading: 'Swag Labs',
  expectedInventoryPageHeading: 'Products',
  metadata: {
    enabled: true
  }
};
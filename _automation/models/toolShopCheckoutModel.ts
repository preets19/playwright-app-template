import type { ToolShopProductModel } from './toolShopProductModel.js';

export interface ToolShopGuestModel {
  email: string;
  firstName: string;
  lastName: string;
}

export interface ToolShopAddressModel {
  country: string;
  postalCode: string;
  houseNumber: string;
  city?: string;
  state?: string;
  street?: string;
}

export interface ToolShopPaymentModel {
  method: string;
  creditCardNumber?: string;
  expirationDate?: string;
  cvv?: string;
  cardHolderName?: string;
  monthlyInstallments?: string;
}

export interface ToolShopGuestCheckoutModel {
  product: ToolShopProductModel;
  guest: ToolShopGuestModel;
  billingAddress: ToolShopAddressModel;
  payment: ToolShopPaymentModel;
  expectedSuccessMessage: string;
}

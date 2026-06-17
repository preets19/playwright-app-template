export interface SampleProductModel {
  productName: string;
}

export interface SampleGuestModel {
  email: string;
  firstName: string;
  lastName: string;
}

export interface SampleAddressModel {
  country: string;
  postalCode: string;
  houseNumber: string;
  city?: string;
  state?: string;
  street?: string;
}

export interface SamplePaymentModel {
  method: string;
  monthlyInstallments: string;
}

export interface SampleGuestCheckoutModel {
  product: SampleProductModel;
  guest: SampleGuestModel;
  billingAddress: SampleAddressModel;
  payment: SamplePaymentModel;
  expectedSuccessMessage: string;
}

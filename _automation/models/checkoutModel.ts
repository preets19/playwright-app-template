export interface UserModel {
  username: string;
  password: string;
}

export interface ProductModel {
  name: string;
  price: string;
  sortOrder?: string;
  titleTestId: string;
  addToCartTestId: string;
}

export interface CheckoutInformationModel {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export interface CheckoutModel {
  startPath: string;
  user: UserModel;
  product: ProductModel;
  checkoutInformation: CheckoutInformationModel;
  expectedSuccessMessage: string;
}

export interface CheckoutResultModel {
  selectedProduct: ProductModel;
  cartProductName: string;
  cartProductPrice: string;
  overviewProductName: string;
  overviewProductPrice: string;
  paymentSuccessMessage: string;
}

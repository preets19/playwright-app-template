import { expect, test } from '@your-org/playwright-base-framework';
import { sampleStandardUserCredentials } from '../../test-data/sampleLoginData.js';
import { sampleBackpackProduct } from '../../test-data/sampleProductSelectionData.js';
import { sampleCheckoutInformation } from '../../test-data/sampleCheckoutInformationData.js';
import { SampleAddProductToCartWorkflow } from '../../workflows/sampleAddProductToCartWorkflow.js';
import { SampleLoginWorkflow } from '../../workflows/sampleLoginWorkflow.js';
import { SampleCheckoutWorkflow } from '../../workflows/sampleCheckoutWorkflow.js';

const normalizeText = (value: string): string => value.replace(/\s+/g, ' ').trim();

test.describe('Regression', () => {
  test('Sample login and order product', async ({ page }) => {
    test.skip(
      !sampleStandardUserCredentials.metadata.enabled ||
        !sampleBackpackProduct.metadata.enabled ||
        !sampleCheckoutInformation.metadata.enabled,
      'Login, product, or checkout test data is disabled'
    );

    const loginWorkflow = new SampleLoginWorkflow(page);
    const loginResult = await loginWorkflow.login(
      sampleStandardUserCredentials,
      sampleStandardUserCredentials.expectedLoginPageHeading
    );

    expect(normalizeText(loginResult.inventoryPageHeading)).toContain(
      normalizeText(sampleStandardUserCredentials.expectedInventoryPageHeading)
    );

    const addProductToCartWorkflow = new SampleAddProductToCartWorkflow(page);
    const cartResult = await addProductToCartWorkflow.addProductToCart(
      sampleBackpackProduct,
      sampleBackpackProduct.expectedCartPageHeading
    );

    expect(normalizeText(cartResult.cartPageHeading)).toContain(
      normalizeText(sampleBackpackProduct.expectedCartPageHeading)
    );
    expect(normalizeText(cartResult.cartProductName)).toContain(
      normalizeText(sampleBackpackProduct.productName)
    );
    expect(normalizeText(cartResult.cartProductPrice)).toContain(
      normalizeText(sampleBackpackProduct.expectedPrice)
    );

    const sampleCheckoutWorkflow = new SampleCheckoutWorkflow(page);
    const checkoutResult = await sampleCheckoutWorkflow.placeOrder(
      sampleCheckoutInformation,
      sampleBackpackProduct
    );

    expect(normalizeText(checkoutResult.checkoutOverviewProductName)).toContain(
      normalizeText(sampleBackpackProduct.productName)
    );
    expect(normalizeText(checkoutResult.checkoutOverviewProductPrice)).toContain(
      normalizeText(sampleBackpackProduct.expectedPrice)
    );
    expect(normalizeText(checkoutResult.checkoutCompleteHeading)).toContain(
      normalizeText(sampleCheckoutInformation.expectedCompletePageHeading)
    );
    expect(normalizeText(checkoutResult.orderConfirmationMessage)).toContain(
      normalizeText(sampleCheckoutInformation.expectedOrderConfirmationMessage)
    );
  });
});
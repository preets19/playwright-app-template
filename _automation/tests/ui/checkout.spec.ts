import { expect, test } from '@your-org/playwright-base-framework';
import { standardUserCheckout } from '../../test-data/checkoutData.js';
import { CheckoutWorkflow } from '../../workflows/checkoutWorkflow.js';

test.describe('Regression', () => {
  test('User can add a product to cart and checkout', async ({ page }) => {
    const checkout = await new CheckoutWorkflow(page)
      .checkoutProduct(standardUserCheckout);

    await expect(checkout.cartProductName).toContain(standardUserCheckout.product.name);
    await expect(checkout.cartProductPrice).toContain(standardUserCheckout.product.price);
    await expect(checkout.overviewProductName).toContain(standardUserCheckout.product.name);
    await expect(checkout.overviewProductPrice).toContain(standardUserCheckout.product.price);
    await expect(checkout.paymentSuccessMessage).toContain(
      standardUserCheckout.expectedSuccessMessage
    );
  });
});

import { expect, test } from '@your-org/playwright-base-framework';
import { sampleGuestCheckout } from '../../test-data/sampleCheckoutData.js';
import { SampleCheckoutWorkflow } from '../../workflows/sampleCheckoutWorkflow.js';

test.describe('Sample Checkout', () => {
  test('guest can complete rental checkout', async ({ page }) => {
    const checkout = await new SampleCheckoutWorkflow(page)
      .checkoutRentalProductAsGuest(sampleGuestCheckout);

    await expect(checkout.cartProduct.name).toContain(sampleGuestCheckout.product.productName);
    await expect(checkout.paymentSuccessMessage).toContain(sampleGuestCheckout.expectedSuccessMessage);
  });
});

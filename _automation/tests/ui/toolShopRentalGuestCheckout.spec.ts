import { expect, test } from '@your-org/playwright-base-framework';
import { rentalGuestCheckout } from '../../test-data/toolShopGuestCheckout.js';
import { ToolShopCheckoutWorkflow } from '../../workflows/toolShopCheckoutWorkflow.js';

test.describe('Regression', () => {
  test('Guest checkout for rental', async ({ page }) => {
    const checkout = await new ToolShopCheckoutWorkflow(page)
      .checkoutRentalProductAsGuest(rentalGuestCheckout);

    await expect(checkout.cartProduct.name).toContain(rentalGuestCheckout.product.productName);
    await expect(checkout.paymentSuccessMessage).toContain(rentalGuestCheckout.expectedSuccessMessage);
  });
});

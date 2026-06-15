import { expect, test } from '@your-org/playwright-base-framework';
import { guestCheckout } from '../../test-data/toolShopGuestCheckout.js';
import { ToolShopCheckoutWorkflow } from '../../workflows/toolShopCheckoutWorkflow.js';

test.describe('Regression', () => {
  test('Guest checkout', async ({ page }) => {
    const checkout = await new ToolShopCheckoutWorkflow(page)
      .checkoutFirstMatchingProductAsGuest(guestCheckout);

    await expect(checkout.cartProduct.name).toContain(checkout.selectedProduct.name);
    await expect(checkout.cartProduct.price).toBe(checkout.selectedProduct.price);
    await expect(checkout.paymentSuccessMessage).toContain(guestCheckout.expectedSuccessMessage);
  });
});

import { expect, test } from '@your-org/playwright-base-framework';
import { hammerProduct, pliersProduct } from '../../test-data/toolShopProducts.js';
import { ToolShopCheckoutWorkflow } from '../../workflows/toolShopCheckoutWorkflow.js';

test.describe('Smoke', () => {
  for (const product of [pliersProduct, hammerProduct]) {
    test(`user can add a ${product.searchTerm} product to cart and checkout`, async ({ page }) => {
      const checkout = await new ToolShopCheckoutWorkflow(page)
        .addFirstMatchingProductToCartAndStartCheckout(product);

      await expect(checkout.cartProduct.name).toContain(checkout.selectedProduct.name);
      await expect(checkout.cartProduct.price).toBe(checkout.selectedProduct.price);
      await expect(await checkout.checkoutPage.isLoaded()).toBeTruthy();
    });
  }
});

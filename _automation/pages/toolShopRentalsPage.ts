import { BasePage } from '@your-org/playwright-base-framework';
import type { ToolShopProductModel } from '../models/toolShopProductModel.js';
import { ToolShopProductDetailsPage } from './toolShopProductDetailsPage.js';

export class ToolShopRentalsPage extends BasePage {
  async openRentalProduct(product: ToolShopProductModel): Promise<ToolShopProductDetailsPage> {
    if (!product.productName) {
      throw new Error('Rental product selection requires productName.');
    }

    await this.actions.click(this.rentalProductImage(product.productName));
    const detailsPage = new ToolShopProductDetailsPage(this.page);
    await detailsPage.waitUntilReady();
    return detailsPage;
  }

  private rentalProductImage(productName: string) {
    return this.page.getByRole('img', { name: productName });
  }
}

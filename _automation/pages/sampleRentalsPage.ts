import { BasePage } from '@your-org/playwright-base-framework';
import type { SampleProductModel } from '../models/sampleCheckoutModel.js';
import { SampleProductDetailsPage } from './sampleProductDetailsPage.js';

export class SampleRentalsPage extends BasePage {
  async openRentalProduct(product: SampleProductModel): Promise<SampleProductDetailsPage> {
    await this.actions.click(this.rentalProductImage(product.productName));

    const detailsPage = new SampleProductDetailsPage(this.page);
    await detailsPage.waitUntilReady();
    return detailsPage;
  }

  private rentalProductImage(productName: string) {
    return this.page.getByRole('img', { name: productName });
  }
}

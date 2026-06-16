// _automation/pages/googleAboutPage.ts
import { BasePage } from '@your-org/playwright-base-framework';
import { GoogleProductsPage } from './googleProductsPage.js';

export class GoogleAboutPage extends BasePage {
  private readonly productsLink = this.page.getByRole('link', { name: 'Products', exact: true });

  url(): string {
    return this.page.url();
  }

  async openProducts(): Promise<GoogleProductsPage> {
    await this.actions.click(this.productsLink);
    const productsPage = new GoogleProductsPage(this.page);
    await productsPage.waitUntilReady();
    return productsPage;
  }
}

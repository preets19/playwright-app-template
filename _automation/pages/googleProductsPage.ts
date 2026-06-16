// _automation/pages/googleProductsPage.ts
import { BasePage } from '@your-org/playwright-base-framework';
import { GoogleCompanyInfoPage } from './googleCompanyInfoPage.js';

export class GoogleProductsPage extends BasePage {
  private readonly companyInfoLink = this.page.getByRole('link', { name: 'Company Info' });

  url(): string {
    return this.page.url();
  }

  async openCompanyInfo(): Promise<GoogleCompanyInfoPage> {
    await this.actions.click(this.companyInfoLink);
    const companyInfoPage = new GoogleCompanyInfoPage(this.page);
    await companyInfoPage.waitUntilReady();
    return companyInfoPage;
  }
}

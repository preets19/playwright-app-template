// _automation/pages/googleCompanyInfoPage.ts
import { BasePage } from '@your-org/playwright-base-framework';
import { GoogleNewsPage } from './googleNewsPage.js';

export class GoogleCompanyInfoPage extends BasePage {
  private readonly newsLink = this.page.getByRole('link', { name: 'News' });

  url(): string {
    return this.page.url();
  }

  async openNews(): Promise<GoogleNewsPage> {
    const popupPromise = this.page.waitForEvent('popup');
    await this.actions.click(this.newsLink);
    const newsPage = await popupPromise;
    await newsPage.waitForLoadState('domcontentloaded');
    return new GoogleNewsPage(newsPage);
  }
}
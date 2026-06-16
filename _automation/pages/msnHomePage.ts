import { BasePage } from '@your-org/playwright-base-framework';
import { MsnNewsPage } from './msnNewsPage.js';

export class MsnHomePage extends BasePage {
  private readonly newsLink = this.page.getByRole('link', { name: 'News', exact: true });

  async open(): Promise<void> {
    await this.navigateTo('https://www.msn.com/');
  }

  async openNews(): Promise<MsnNewsPage> {
    const popupPromise = this.page.waitForEvent('popup');
    await this.actions.click(this.newsLink);
    const newsPage = await popupPromise;
    const msnNewsPage = new MsnNewsPage(newsPage);
    await msnNewsPage.waitUntilReady();
    return msnNewsPage;
  }
}

// _automation/pages/googleHomePage.ts
import { BasePage } from '@your-org/playwright-base-framework';
import { GoogleAboutPage } from './googleAboutPage.js';

export class GoogleHomePage extends BasePage {
  private readonly aboutLink = this.page.getByRole('link', { name: 'About' });

  async open(url: string): Promise<void> {
    await this.navigateTo(url);
  }

  async openAbout(): Promise<GoogleAboutPage> {
    await this.actions.click(this.aboutLink);
    const aboutPage = new GoogleAboutPage(this.page);
    await aboutPage.waitUntilReady();
    return aboutPage;
  }
}

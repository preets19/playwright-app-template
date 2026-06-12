// _automation/workflows/googleNavigationWorkflow.ts
import type { Page } from '@playwright/test';
import { GoogleHomePage } from '../pages/googleHomePage.js';

export class GoogleNavigationWorkflow {
  constructor(private readonly page: Page) {}

  async navigateThroughCompanyPages(homeUrl: string) {
    const homePage = new GoogleHomePage(this.page);
    await homePage.open(homeUrl);

    const aboutPage = await homePage.openAbout();
    const aboutUrl = aboutPage.url();
    const productsPage = await aboutPage.openProducts();
    const productsUrl = productsPage.url();
    const companyInfoPage = await productsPage.openCompanyInfo();
    const companyInfoUrl = companyInfoPage.url();
    const newsPage = await companyInfoPage.openNews();
    const newsUrl = newsPage.url();

    return {
      visitedUrls: {
        about: aboutUrl,
        products: productsUrl,
        companyInfo: companyInfoUrl,
        news: newsUrl
      },
      newsPage
    };
  }
}

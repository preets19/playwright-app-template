import type { Page } from '@playwright/test';
import { MsnHomePage } from '../pages/msnHomePage.js';
import { MsnNewsPage } from '../pages/msnNewsPage.js';

export class MsnNewsWorkflow {
  constructor(private readonly page: Page) {}

  async openNewsFromHome(): Promise<MsnNewsPage> {
    const homePage = new MsnHomePage(this.page);
    await homePage.open();
    return homePage.openNews();
  }
}

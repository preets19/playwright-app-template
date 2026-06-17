import { BasePage } from '@your-org/playwright-base-framework';
import { SampleRentalsPage } from './sampleRentalsPage.js';

export class SampleHomePage extends BasePage {
  private readonly categoriesNavigation = this.page.locator('[data-test="nav-categories"]');
  private readonly rentalsNavigation = this.page.locator('[data-test="nav-rentals"]');

  async open(): Promise<void> {
    await this.navigateTo('/');
    await this.waitUntilReady();
  }

  async openRentals(): Promise<SampleRentalsPage> {
    await this.actions.clickMenuItem(
      this.categoriesNavigation,
      this.rentalsNavigation,
      { description: 'Categories > Rentals' }
    );

    const rentalsPage = new SampleRentalsPage(this.page);
    await rentalsPage.waitUntilReady();
    return rentalsPage;
  }
}

import { BasePage } from '@your-org/playwright-base-framework';
import { ToolShopRentalsPage } from './toolShopRentalsPage.js';
import { ToolShopSearchResultsPage } from './toolShopSearchResultsPage.js';

export class ToolShopHomePage extends BasePage {
  private readonly searchInput = this.page.locator('[data-test="search-query"]');
  private readonly searchButton = this.page.locator('[data-test="search-submit"]');
  private readonly categoriesNavigation = this.page.locator('[data-test="nav-categories"]');
  private readonly rentalsNavigation = this.page.locator('[data-test="nav-rentals"]');

  async open(): Promise<void> {
    await this.navigateTo('/');
  }

  async searchForProduct(searchTerm: string): Promise<ToolShopSearchResultsPage> {
    await this.actions.clearAndFill(this.searchInput, searchTerm);
    await this.actions.click(this.searchButton);
    return new ToolShopSearchResultsPage(this.page);
  }

  async openRentals(): Promise<ToolShopRentalsPage> {
    await this.actions.click(this.categoriesNavigation);
    await this.actions.click(this.rentalsNavigation);
    return new ToolShopRentalsPage(this.page);
  }
}

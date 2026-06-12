// _automation/pages/googleNewsPage.ts
import { BasePage } from '@your-org/playwright-base-framework';

export class GoogleNewsPage extends BasePage {
  async title(): Promise<string> {
    return this.page.title();
  }

  url(): string {
    return this.page.url();
  }
}
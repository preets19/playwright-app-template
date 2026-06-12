// _automation/tests/ui/googleNavigation.spec.ts
import { expect, test } from '@your-org/playwright-base-framework';
import { googleNavigation } from '../../test-data/googleNavigation.js';
import { GoogleNavigationWorkflow } from '../../workflows/googleNavigationWorkflow.js';

test.describe('Smoke', () => {
  test('user can navigate through various Google pages', async ({ page }) => {
    const navigation = await new GoogleNavigationWorkflow(page)
      .navigateThroughCompanyPages(googleNavigation.homeUrl);

    await expect(navigation.visitedUrls.about).toContain(googleNavigation.expectedUrlParts.about);
    await expect(navigation.visitedUrls.products).toContain(googleNavigation.expectedUrlParts.products);
    await expect(navigation.visitedUrls.companyInfo).toContain(googleNavigation.expectedUrlParts.companyInfo);
    await expect(navigation.visitedUrls.news).toContain(googleNavigation.expectedUrlParts.news);
    await expect(await navigation.newsPage.title()).toContain(googleNavigation.expectedTitleParts.news);
  });
});

import { expect, test } from '@your-org/playwright-base-framework';
import { MsnNewsWorkflow } from '../../workflows/msnNewsWorkflow.js';

test.describe('MyFirstTest', () => {
  test('opens MSN News from the MSN home page', async ({ page }) => {
    const newsPage = await new MsnNewsWorkflow(page).openNewsFromHome();

    await expect(newsPage.url()).toContain('msn.com');
    await expect(await newsPage.title()).toContain('News');
  });
});

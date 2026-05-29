import { expect, test } from '@your-org/playwright-base-framework';
import { standardUser } from '../../test-data/users.js';
import { LoginWorkflow } from '../../workflows/loginWorkflow.js';

test.describe('Login', () => {
  test('standard user can log in to SauceDemo', async ({ page }) => {
    const homePage = await new LoginWorkflow(page).login(standardUser);

    await expect.soft(await homePage.isLoaded()).toBeTruthy();
    await expect(await homePage.pageTitleText()).toContain(standardUser.displayName);
  });
});

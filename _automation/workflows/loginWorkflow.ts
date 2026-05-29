import type { Page } from '@playwright/test';
import type { UserModel } from '../models/userModel.js';
import { HomePage } from '../pages/homePage.js';
import { LoginPage } from '../pages/loginPage.js';

export class LoginWorkflow {
  constructor(private readonly page: Page) {}

  async login(user: UserModel): Promise<HomePage> {
    const loginPage = new LoginPage(this.page);
    await loginPage.open();
    return loginPage.loginAs(user.username, user.password);
  }
}

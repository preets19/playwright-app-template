import type { Page } from '@playwright/test';
import type { SampleProductSelectionModel } from '../models/sampleProductSelectionModel.js';
import type { SampleCheckoutInformationModel } from '../models/sampleCheckoutInformationModel.js';
import { SampleCartPage } from '../pages/sampleCartPage.js';
import { SampleCheckoutCompletePage } from '../pages/sampleCheckoutCompletePage.js';
import { SampleCheckoutInformationPage } from '../pages/sampleCheckoutInformationPage.js';
import { SampleCheckoutOverviewPage } from '../pages/sampleCheckoutOverviewPage.js';

export interface SampleCheckoutWorkflowResult {
  checkoutOverviewProductName: string;
  checkoutOverviewProductPrice: string;
  checkoutCompleteHeading: string;
  orderConfirmationMessage: string;
}

export class SampleCheckoutWorkflow {
  constructor(private readonly page: Page) {}

  async placeOrder(
    checkoutInformation: SampleCheckoutInformationModel & {
      expectedInformationPageHeading: string;
      expectedOverviewPageHeading: string;
      expectedCompletePageHeading: string;
      expectedOrderConfirmationMessage: string;
    },
    product: SampleProductSelectionModel
  ): Promise<SampleCheckoutWorkflowResult> {
    const cartPage = new SampleCartPage(this.page);
    await cartPage.clickCheckout();

    const checkoutInformationPage = new SampleCheckoutInformationPage(this.page);
    await checkoutInformationPage.waitUntilReady();
    await checkoutInformationPage.waitForHeadingText(checkoutInformation.expectedInformationPageHeading);
    await checkoutInformationPage.enterInformation(checkoutInformation);
    await checkoutInformationPage.continueCheckout();

    const checkoutOverviewPage = new SampleCheckoutOverviewPage(this.page);
    await checkoutOverviewPage.waitUntilReady();
    await checkoutOverviewPage.waitForHeadingText(checkoutInformation.expectedOverviewPageHeading);

    const checkoutOverviewProductName = await checkoutOverviewPage.getProductName(product.productName);
    const checkoutOverviewProductPrice = await checkoutOverviewPage.getProductPrice(product.expectedPrice);

    await checkoutOverviewPage.finishOrder();

    const checkoutCompletePage = new SampleCheckoutCompletePage(this.page);
    await checkoutCompletePage.waitUntilReady();
    await checkoutCompletePage.waitForHeadingText(checkoutInformation.expectedCompletePageHeading);
    await checkoutCompletePage.waitForOrderConfirmationText(
      checkoutInformation.expectedOrderConfirmationMessage
    );

    return {
      checkoutOverviewProductName,
      checkoutOverviewProductPrice,
      checkoutCompleteHeading: await checkoutCompletePage.getHeadingText(),
      orderConfirmationMessage: await checkoutCompletePage.getOrderConfirmationText()
    };
  }
}
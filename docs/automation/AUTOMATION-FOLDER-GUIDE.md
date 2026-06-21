# Automation Folder Guide

Use this guide to understand what each folder under `_automation` is for.

The goal is to keep tests readable while keeping UI details, test data, and business flows in predictable places.

## Folder Relationship

```text
tests
  use workflows
    use pages
      use framework actions, waits, assertions, and fixtures

tests
  use test-data
    shaped by models
```

## Folder Map

| Folder | Purpose |
| --- | --- |
| `models` | TypeScript shapes for test data, such as users, accounts, orders, or search criteria |
| `test-data` | Actual data values used by tests |
| `pages` | Page objects for app screens and major UI areas |
| `workflows` | Reusable business journeys that combine page actions |
| `tests` | Executable test specs that verify app behavior |

## models

Models define the shape of data used by automation.

Illustrative model shape:

```ts
export interface GuestModel {
  email: string;
  firstName: string;
  lastName: string;
}
```

Use models when the same kind of data is passed through pages, workflows, or tests. They make data contracts clear and help TypeScript catch mistakes early.

## test-data

Test data contains the actual values used by tests.

Illustrative test-data shape:

```ts
export const guestCheckout: GuestCheckoutModel = {
  // product, guest, billing address, payment, and expected result
};
```

Use test data for users, accounts, product IDs, API payload examples, expected labels, or environment-neutral values. Avoid putting browser actions or assertions here.

## pages

Pages represent app screens or major UI areas.

Illustrative page-object behavior:

```ts
await this.actions.selectByValue(this.countrySelect, address.country);
await this.actions.clearAndFill(this.postalCodeInput, address.postalCode);
await this.actions.click(this.proceedToPaymentButton);
```

Use page classes for locators and screen-level actions. If a button selector changes, update the page file, not every test.

## workflows

Workflows combine page actions into business-level journeys.

Illustrative workflow composition:

```ts
const homePage = new HomePage(this.page);
await homePage.open();
const rentalsPage = await homePage.openRentals();
```

Use workflows when a test needs to express a business action such as logging in, creating an order, approving a request, or searching for a customer.

## tests

Tests are the executable specifications.

Illustrative test composition:

```ts
const checkout = await new CheckoutWorkflow(page)
  .checkoutProductAsGuest(guestCheckout);

await expect(checkout.paymentSuccessMessage).toContain(guestCheckout.expectedSuccessMessage);
```

Tests should focus on what behavior is being verified. They should use pages, workflows, and test data instead of repeating low-level UI steps.

## Where To Put Changes

| Change | Best Place |
| --- | --- |
| A locator changed | `pages` |
| A field was added to a test user | `models` and `test-data` |
| A password, username, or expected label changed | `test-data` |
| A business flow changed | `workflows` |
| A scenario or expected outcome changed | `tests` |
| A new app screen needs automation | `pages` |
| A new reusable journey is needed | `workflows` |

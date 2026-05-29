import { expect, test } from '@your-org/playwright-base-framework';

type SmokeResult = {
  Value: number;
};

test.describe('Database smoke', () => {
  test.skip(!process.env.RUN_DB_TESTS, 'Set RUN_DB_TESTS=true and configure appsettings.json database.connectionString to run this real database smoke test.');

  test('can execute a parameterized scalar query', async ({ dbClient }) => {
    const result = await dbClient.querySingle<SmokeResult>('SELECT @Value AS Value', { Value: 1 });

    expect(result?.Value).toBe(1);
  });
});

import { expect, test } from '@your-org/playwright-base-framework';
import { seriesTeamFilterCriteria } from '../../test-data/seriesTeamFilterCriteriaData.js';
import { CricinfoHomePage } from '../../pages/cricinfoHomePage.js';
import { FilterSeriesAndTeamWorkflow } from '../../workflows/filterSeriesAndTeamWorkflow.js';

const normalizeText = (value: string): string => value.replace(/\s+/g, ' ').trim();

test.describe('Regression', () => {
  test('Filter by Series and Team', async ({ page }) => {
    test.skip(!seriesTeamFilterCriteria.metadata.enabled, 'Series and team filter criteria test data is disabled');

    const baseUrl = 'https://www.cricinfo.com';

    const cricinfoHomePage = new CricinfoHomePage(page);
    await cricinfoHomePage.open(baseUrl);
    await cricinfoHomePage.waitUntilReady();
    await cricinfoHomePage.openSeriesMenu();

    const filterSeriesAndTeamWorkflow = new FilterSeriesAndTeamWorkflow(page);
    const filterResult = await filterSeriesAndTeamWorkflow.filterBySeriesAndTeam(seriesTeamFilterCriteria);

    expect(normalizeText(filterResult.schedulePageHeading)).toContain(
      normalizeText(seriesTeamFilterCriteria.expectedSchedulePageHeading)
    );
    expect(normalizeText(filterResult.filteredResultsText)).toContain(
      normalizeText(seriesTeamFilterCriteria.expectedFilteredTeamText)
    );
  });
});

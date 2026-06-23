import type { Page } from '@playwright/test';
import type { SeriesTeamFilterCriteriaModel } from '../models/seriesTeamFilterCriteriaModel.js';
import { CricinfoHomePage } from '../pages/cricinfoHomePage.js';
import { SeriesDetailPage } from '../pages/seriesDetailPage.js';
import { ScheduleFixturesPage } from '../pages/scheduleFixturesPage.js';

export interface FilterSeriesAndTeamWorkflowResult {
  schedulePageHeading: string;
  filteredResultsText: string;
}

export class FilterSeriesAndTeamWorkflow {
  constructor(private readonly page: Page) {}

  async filterBySeriesAndTeam(
    criteria: SeriesTeamFilterCriteriaModel
  ): Promise<FilterSeriesAndTeamWorkflowResult> {
    const cricinfoHomePage = new CricinfoHomePage(this.page);
    await cricinfoHomePage.selectSeries(criteria.seriesName);

    const seriesDetailPage = new SeriesDetailPage(this.page);
    await seriesDetailPage.waitUntilReady();
    await seriesDetailPage.openFixturesAndResults();

    const scheduleFixturesPage = new ScheduleFixturesPage(this.page);
    await scheduleFixturesPage.waitUntilReady();
    await scheduleFixturesPage.openTeamFilterPopover();
    await scheduleFixturesPage.searchTeam(criteria.teamSearchTerm);
    await scheduleFixturesPage.selectTeam(criteria.teamName);
    await scheduleFixturesPage.applyFilter();
    const schedulePageHeadingResult = await scheduleFixturesPage.getScheduleHeadingText();
    const filteredResultsTextResult = await scheduleFixturesPage.getFilteredResultsText();

    return {
      schedulePageHeading: schedulePageHeadingResult,
      filteredResultsText: filteredResultsTextResult
    };
  }
}

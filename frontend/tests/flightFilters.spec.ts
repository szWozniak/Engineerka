/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';
import { PAGE_URL, TEST_DRONE_NAME } from './constants';
import { thereIsAFlight } from './testHelpers';

test('gained elevation filter works', async ({ page }) => {
  await thereIsAFlight();

  await page.goto(PAGE_URL);

  await page.getByTestId("big-table-arrow-up-icon").click();

  await page.getByTestId(`show-flights-${TEST_DRONE_NAME}`).click()

  await page.getByTestId("toggle-filter").click();

  await page.getByTestId("elevation-gained-filter-min").fill("700")
  await page.getByTestId("apply-flights-filters").click();

  const bigTable = page.getByTestId("flights-table");

  await expect(bigTable.locator('tr')).toHaveCount(1);

  await page.getByTestId("elevation-gained-filter-max").fill("800")
  await page.getByTestId("apply-flights-filters").click();

  await expect(bigTable.locator('tr')).toHaveCount(0);

  await page.getByTestId("elevation-gained-filter-max").fill("2000")
  await page.getByTestId("apply-flights-filters").click();

  await expect(bigTable.locator('tr')).toHaveCount(1);
});

test('did landed toggle filter works', async ({ page }) => {
  await thereIsAFlight();

  await page.goto(PAGE_URL);

  await page.getByTestId("big-table-arrow-up-icon").click();

  await page.getByTestId(`show-flights-${TEST_DRONE_NAME}`).click()

  await page.getByTestId("toggle-filter").click();

  await page.getByTestId("apply-flights-filters").click();

  const bigTable = page.getByTestId("flights-table");
  await expect(bigTable.locator('tr')).toHaveCount(1);

  await page.getByTestId("did-landed-toggle").click();
  await page.getByTestId("apply-flights-filters").click();

  await expect(bigTable.locator('tr')).toHaveCount(1);

  await page.getByTestId("did-landed-toggle").click();
  await page.getByTestId("apply-flights-filters").click();

  await expect(bigTable.locator('tr')).toHaveCount(0);
});

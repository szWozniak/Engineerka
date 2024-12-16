/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';
import { PAGE_URL } from './constants';

test('registration filter works', async ({ page }) => {
  await page.goto(PAGE_URL);
  
  await page.getByTestId("toggle-filter").click();

  await page.getByTestId("registration-filter").fill("TEST123");

  await page.getByTestId("apply-drones-filters").click();

  await page.getByTestId("big-table-arrow-up-icon").click()

  const bigTable = page.getByTestId("big-table");
  
  const allRows = bigTable.locator('tr') 

  await expect(allRows).toHaveCount(1);

  await expect(allRows.first()).toContainText("TEST123");
});

test('altitude filter works', async ({ page }) => {
  await page.goto(PAGE_URL);
  
  await page.getByTestId("toggle-filter").click();

  await page.getByTestId("altitude-filter-min").fill("490");

  await page.getByTestId("apply-drones-filters").click();

  await page.getByTestId("big-table-arrow-up-icon").click()

  const bigTable = page.getByTestId("big-table");
  const allRows = bigTable.locator('tr') 
  
  await expect(allRows).toHaveCount(1);
  await expect(allRows.first()).toContainText("TEST123");

  await page.getByTestId("altitude-filter-max").fill("495");
  await page.getByTestId("apply-drones-filters").click();

  await expect(bigTable.locator('tr')).toHaveCount(0);

  await page.getByTestId("altitude-filter-max").fill("550");
  await page.getByTestId("apply-drones-filters").click();

  const newAllRows = bigTable.locator('tr') 
  
  await expect(newAllRows).toHaveCount(1);
  await expect(newAllRows.first()).toContainText("TEST123");
});

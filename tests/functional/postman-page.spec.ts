import { test, expect } from '@playwright/test';
import { PostmanPage } from './pages/PostmanPage';
import { MediumPage } from './pages/MediumPage';

test('Verify postman page has title', { 
  tag: ['@regression', '@ui'], 
}, async ({ page }) => {

  await page.goto(PostmanPage.url);
  await expect(page).toHaveTitle(/Automated API Testing/);
});

test('Verify learn more button redirect to medium.com', { 
  tag: ['@regression', '@ui'] 
}, async ({ page }) => {

  await page.goto(PostmanPage.url);
  // Start waiting for new page before clicking. Note no await.
  const pagePromise = page.context().waitForEvent('page');
  await page.locator(PostmanPage.learnMoreBtn).click();
  const mediumPage = await pagePromise;
  await expect(mediumPage.locator(MediumPage.title)).toBeVisible();
});

import AxeBuilder from '@axe-core/playwright';
import { test } from '@playwright/test';

// https://github.com/dequelabs/axe-core-npm/blob/develop/packages/playwright/README.md
test('Verify accessibility on Deque page', { 
  tag: ['@regression', '@axe'], 
}, async ({ page }) => {

  await page.goto('https://dequeuniversity.com/demo/mars/');
  try {
    const results = await new AxeBuilder({ page }).analyze();
    console.log(results);
  } catch (e) {
    // do something with the error
  }
});
import { test, expect } from '@playwright/test';

// Test: Add first product to cart and validate success message

test('Add first product to cart and validate success message', async ({ page }) => {
  // Navigate to the website
  await page.goto('https://automationexercise.com/');

  // Click on 'Products' in the navigation
  await page.getByRole('link', { name: 'Products' }).click();

  // Wait for products to load and select the first item
  const firstProduct = page.locator('.productinfo.text-center').first();
  await firstProduct.waitFor();

    // Remove ad iframes that block pointer events
    await page.evaluate(() => {
      document.querySelectorAll('iframe, ins.adsbygoogle').forEach(el => el.remove());
    });

    // Click 'Add to cart' for the first product
    await firstProduct.locator('a:has-text("Add to cart")').click();

    // Wait for modal to appear and validate its content
    const modal = page.locator('.modal-content');
    await modal.waitFor({ state: 'visible' });
    await expect(modal.locator('h4')).toHaveText('Added!');
    await expect(modal.getByText('Your product has been added to cart.')).toBeVisible();
  // Close browser and terminate session
  await page.context().close();
});

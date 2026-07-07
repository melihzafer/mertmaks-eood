import { test, expect } from "@playwright/test";

test.describe("Sanity Checks", () => {
  test("should load homepage and display hero content", async ({ page }) => {
    // Wait only for DOM content to avoid hanging on long-running Sanity live preview SSE streams
    await page.goto("/", { waitUntil: "domcontentloaded" });
    
    // Allow hydration to settle on slow dev server
    await page.waitForTimeout(3000);

    // Check title (auto-waits)
    await expect(page).toHaveTitle(/MERTMAX/i, { timeout: 15000 });

    // Check hero text using robust pattern - just verify that an H1 exists
    await expect(page.locator("h1")).toBeVisible();

    // Check navigation menu or header exists
    await expect(page.locator("header")).toBeVisible();
  });

  test("should navigate to store divisions", async ({ page, isMobile }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    
    // Allow hydration to settle on slow dev server
    await page.waitForTimeout(3000);

    if (isMobile) {
      // On mobile, just check that the stores section exists
      await expect(page.locator("#stores")).toBeVisible();
      return;
    }

    // Desktop navigation test - use specific stripe link class & href to avoid ambiguity
    const supermarketStripe = page.locator('.stripe[href="/supermarket"]');
    await expect(supermarketStripe).toBeVisible();
    await supermarketStripe.click();
    await expect(page).toHaveURL(/supermarket/, { timeout: 15000 });
    await expect(page.locator("h1")).toBeVisible();

    // Go back home
    await page.locator('a[href="/"]').first().click();
    await expect(page).toHaveURL(/\/$/, { timeout: 15000 });
    
    // Allow hydration to settle on return
    await page.waitForTimeout(3000);

    const constructionStripe = page.locator('.stripe[href="/construction"]');
    await expect(constructionStripe).toBeVisible();
    await constructionStripe.click();
    await expect(page).toHaveURL(/construction/, { timeout: 15000 });
    await expect(page.locator("h1")).toBeVisible();
  });
});

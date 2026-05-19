import { test, expect } from "@playwright/test";

test.describe("Sanity Checks", () => {
  test("should load homepage and display hero content", async ({ page }) => {
    await page.goto("/");

    // Check title
    await expect(page).toHaveTitle(/MERTMAX/i);

    // Check hero text using robust pattern
    await expect(
      page.getByRole("heading", { name: /МЕРТМАКС — Сърцето на Самуил/i }),
    ).toBeVisible();

    // Check navigation menu or header exists
    await expect(page.locator("header")).toBeVisible();
  });

  test("should navigate to store divisions", async ({ page, isMobile }) => {
    await page.goto("/");

    if (isMobile) {
      // On mobile, just check that the stores section exists
      await expect(page.locator("#stores")).toBeVisible();
      return;
    }

    // Desktop navigation test
    await page.getByRole("link", { name: /Супермаркет ежедневно/ }).click();
    await expect(page).toHaveURL(/supermarket/, { timeout: 15000 });
    await expect(
      page.getByRole("heading", { name: "Всичко за ежедневната трапеза." }),
    ).toBeVisible();

    // Go back home
    await page.locator('a[href="/"]').first().click();
    await expect(page).toHaveURL(/\/$/, { timeout: 15000 });

    await page.getByRole("link", { name: /Строителство материали/ }).click();
    await expect(page).toHaveURL(/construction/, { timeout: 15000 });
    await expect(
      page.getByRole("heading", {
        name: "Силен син магазин за сериозни ремонти.",
      }),
    ).toBeVisible();
  });
});

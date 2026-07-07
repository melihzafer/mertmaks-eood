import { test, expect } from "@playwright/test";

test.describe("Contact Page", () => {
  test("should load contact page and show form", async ({ page }) => {
    // Wait only for DOM content to avoid hanging on long-running Sanity live preview SSE streams
    await page.goto("/contact", { waitUntil: "domcontentloaded" });
    
    // Allow hydration to settle on slow dev server
    await page.waitForTimeout(3000);

    // Verify page content
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Verify form fields exist
    await expect(page.getByLabel("Име", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Имейл", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Телефон", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Относно", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Съобщение", { exact: true })).toBeVisible();

    // Verify submit button
    await expect(
      page.getByRole("button", { name: "Изпратете съобщение" }),
    ).toBeVisible();
  });
});

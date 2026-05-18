import { test, expect } from "@playwright/test";

test.describe("Contact Page", () => {
  test("should load contact page and show form", async ({ page }) => {
    await page.goto("/contact");

    // Verify page content
    await expect(
      page.getByRole("heading", { name: "Всички пътища водят към МЕРТМАКС." }),
    ).toBeVisible();

    // Verify form fields exist
    await expect(page.getByLabel("Име")).toBeVisible();
    await expect(page.getByLabel("Телефон")).toBeVisible();
    await expect(page.getByLabel("Относно")).toBeVisible();
    await expect(page.getByLabel("Съобщение")).toBeVisible();

    // Verify submit button
    await expect(
      page.getByRole("button", { name: "Подгответе съобщение" }),
    ).toBeVisible();
  });
});

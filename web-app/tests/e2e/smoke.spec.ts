import { expect, test } from '@playwright/test';

test('login page loads', async ({ page }) => {
  await page.goto('/login');

  await expect(page.getByRole('heading', { name: 'Ethio Agency Hub' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign in to dashboard' })).toBeVisible();
});

test('protected dashboard redirects to login without session', async ({ page }) => {
  await page.goto('/dashboard');

  await expect(page).toHaveURL(/\/login\?next=%2Fdashboard/);
});

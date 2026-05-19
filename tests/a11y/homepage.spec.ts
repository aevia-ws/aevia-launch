import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibilité WCAG 2.1 AA', () => {
  test('homepage passe axe-core', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('page templates passe axe-core', async ({ page }) => {
    await page.goto('/templates');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    // Log les violations mais ne bloque pas encore (mode warn)
    if (results.violations.length > 0) {
      console.warn('A11y violations:', JSON.stringify(results.violations.map(v => ({
        id: v.id, impact: v.impact, description: v.description
      })), null, 2));
    }
    // Seules les violations critiques bloquent
    const critical = results.violations.filter(v => v.impact === 'critical');
    expect(critical).toEqual([]);
  });
});

import { test, expect } from '@playwright/test';

test.describe('Users Flow', () => {

    test.beforeEach(async ({ page }) => {

        await page.goto('/');
        await page.waitForSelector('.card', { state: 'visible' });

    });

    test('should check the first card loads properly', async ({ page }) => {

        const card = await page.$('.card');
        const cardText = await card?.textContent();
        expect(card).not.toBeNull();
        expect(cardText).not.toBeNull();

    });

    test('should check clicking on the first card navigates to the user profile', async ({ page }) => {

        await page.click('.card');
        await page.waitForSelector('[data-test-id="user-profile"]', { state: 'visible' });
        const userProfile = await page.$('[data-test-id="user-profile"]');
        expect(userProfile).not.toBeNull();

    });

    test('should check when command and k are pressed, the search bar is focused', async ({ page }) => {

        await page.keyboard.press('Meta+K');
        const searchBar = await page.$('[data-test-id="search-input"]');
        const isFocused = await searchBar?.evaluate((el) => el === document.activeElement);
        expect(isFocused).toBe(true);

    });

});

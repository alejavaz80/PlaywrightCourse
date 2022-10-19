const {test, expect} = require('@playwright/test');

test('Visible items', async ({page})=>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
})
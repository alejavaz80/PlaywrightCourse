const {test, expect} = require('@playwright/test');

test('Browser Context as fixture', async ({page}) => {
    
    const userName = page.locator('#username');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');


    await userName.type('shetty');
    await page.fill('id=password', 'learning');
    await page.click('id=signInBtn');

    const message = await page.locator('[style*="block"]').textContent();
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect');

    await userName.fill("");
    await userName.type('rahulshettyacademy');


    await Promise.all(
        [
            page.waitForNavigation(),
            page.click('id=signInBtn')
        ]
    )
    const allTitles = await page.locator(".card-body a").allTextContents();
    console.log(allTitles);
});

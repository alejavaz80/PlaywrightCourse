const {test, expect} = require('@playwright/test');

test('Interaction with static Dropdown', async ({page}) => {

    const userName = page.locator('#username');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await userName.type('rahulshettyacademy');
    await page.fill('id=password', 'learning');
    
    //todas las opciones van a una constante
    const dropDown = await page.locator('select.form-control');
    //por valor
    await dropDown.selectOption({value: 'stud'})
    await dropDown.selectOption('teach');
    await dropDown.selectOption({index: 2});
    await dropDown.selectOption({label:'Student'});
})

test('Interaction with dynamic dropdown button', async({page})=>{
    const userName = page.locator('#username');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await userName.type('rahulshettyacademy');
    await page.fill('id=password', 'learning');

})

test('Interaction with Radio button', async({page})=>{
    const userName = page.locator('#username');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await userName.type('rahulshettyacademy');
    await page.fill('id=password', 'learning');

    
    await expect(page.locator('.blinkingText')).toHaveAttribute('class', 'blinkingText');

    //Las opciones se van a una variable
    const radios = await page.$$('.radiotextsty');
    for(let i=0; i < radios.length; i++){
        if(await radios[i].innerText() == 'User'){
            await radios[i].check();
            console.log(await radios[i].innerText());
            await radios[i].isChecked();
        }
    }      
})

test.only('Multiple windows',async({browser}) => {
    
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page.locator('.blinkingText')).toHaveAttribute('class', 'blinkingTexts');
    

    const [page2] = await Promise.all([
        context.waitForEvent('page'),
        await page.locator('.blinkingText').click()
    ])

    const text = await page2.locator('.red').textContent();
    const textArray = text.split('@');
    const email = textArray[1].split(' ')[0];
    console.log(email);
    await page.locator('#username').fill(email);
    await page.pause();
})

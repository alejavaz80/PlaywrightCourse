const {test, expect} = require('@playwright/test')

test('As user i have to be able to purchase & validate a product', async ({page}) => {

    
    const loginPageLink = page.goto('https://rahulshettyacademy.com/client');
    const createAccount = page.locator('.login-wrapper-footer-text');
    const userEmail = await page.locator('#userEmail').fill('ale.castro@hotmail.com');
    const userPass = await page.locator('#userPassword').fill('Rs@159357');
    const productWanted = "IPHONE 13 PRO";

    
    await loginPageLink;
    await createAccount.click();
    await page.locator('#firstName').fill('Alex');
    await page.locator('#lastName').fill('Davalos');
    await page.locator('#userEmail').fill('chespirito2@hotmail.com');
    await page.locator('#userMobile').fill('5565766448')
    await page.locator('#custom-select').selectOption({label:'Engineer'});

    const inputRadios = await page.$$('input[type="radio"]')
    for(let i=0; i<inputRadios.length; i++ ){
        if(inputRadios[i].textContent()==='Female'){
            await inputRadios[i].click();
        }
    }

    await page.locator('.userPassword').fill('Rs@159357');
    await page.locator('.confirmPassword').fill('Rs@159357');
    await page.locator('input[type="checkbox"]').check();
    await page.locator('#login').click();
    await expect(page.locator('.headcolor')).toContainText('Created Successfully');
    await page.locator('.btn').click();
    await userEmail;
    await userPass;
    await page.locator('#login').click();

    await page.waitForLoadState('networkidle');

    const options = page.locator('.card-body');
    const productsCount = await options.count();
    
    for (let i=0; i < productsCount; ++i){        
        if(await options.nth(i).locator('b').innerText() == productWanted){
            await options.nth(i).locator('i').nth(1).click();
        }
    }
    await page.locator('[routerlink*=cart]').click();
    await expect(page.locator('h1')).toContainText("My Cart");
    await expect(page.locator('.infoWrap h3')).toHaveText('iphone 13 pro');
    await page.locator('button:has-text("Checkout")').click();
    await expect(page.locator('.item__title')).toHaveText('iphone 13 pro');
    await expect(page.locator('.item__quantity')).toContainText('1');
    await page.locator('.input.ddl').nth(0).selectOption({label:"07"});
    await page.locator('.input.ddl').nth(1).selectOption({label:"27"});
    await page.locator('label:has-text("ale.castro@hotmail.com")');
    await page.locator('.input.txt').nth(1).fill('583');
    await page.locator('.input.txt').nth(2).fill('Alejandro');
    expect(page.locator('.user__name [type="text"]:first-child')).toHaveText('ale.castro@hotmail.com');
    await page.locator('[placeholder*="Country"]').type('ind', {delay:100});
    const countryOptions = page.locator('.ta-results');
    await countryOptions.waitFor();
    let count = await countryOptions.locator('button').count();
    for(let h=0; h<count; ++h){
        let text = await countryOptions.locator('button').nth(h).textContent();
        if(text === ' India'){
            countryOptions.locator('button').nth(h).click();
            break;
        }
    }
    await page.locator('.action__submit').click();
    expect(page.locator('.hero-primary')).toContainText('Thankyou');
    const orderNumberComplete = await page.locator('label.ng-star-inserted').textContent();
    const ordNumArray = orderNumberComplete.split(' ');
    const number = ordNumArray[2];
    await page.locator('.em-spacer-1 [routerlink*="myorders"]').click();

    await page.locator('h1:has-text("Your Orders")').waitFor({state: 'visible'});
    let confirmed = false;
    const orders = await page.locator('tbody tr');
    count = await orders.count();
    for ( let h=0; h < count; ++h ){
        if(await orders.locator('th').nth(h).textContent() == number){
            confirmed = true;
            break;
        }
    }
    await expect(confirmed).toBe(true);
})

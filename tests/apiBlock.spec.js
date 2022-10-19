
const {test, expect, request} = require('@playwright/test');
const loginPayload = {userEmail: "ale.castro@hotmail.com", userPassword: "Rs@159357"};
let token;
test.beforeAll( async ()=>{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
    {
        data: loginPayload
    })
    expect((await loginResponse).ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
});

test.beforeEach(()=>{

})

test('Test API', async ({page})=>{
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token );

    // ESCUCHA TODOS LOS REQUESTS Y LOS IMPRIME EN EL LOG
    page.on('request',request=> request.url())

    await page.goto('https://rahulshettyacademy.com/client');
    const productWanted = "IPHONE 13 PRO";
    await page.waitForLoadState('networkidle');
    const options = page.locator('.card-body');
    const productsCount = await options.count();
    for (let i=0; i < productsCount; ++i){        
        if(await options.nth(i).locator('b').innerText() == productWanted){
            await options.nth(i).locator('i').nth(1).click();
        }
    }
    await page.pause();
})
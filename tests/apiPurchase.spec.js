const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/apiUtils');

const loginPayload = {userEmail: "ale.castro@hotmail.com", userPassword: "Rs@159357"};
const orderPayload = {orders:[{country: "Tunisia", productOrderedId: "6262e990e26b7e1a10e89bfa"}]};
let token;
let orderID;


test.beforeAll( async ()=>{

    let apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext);

    token = apiUtils.getToken(loginPayload);
    orderID = apiUtils.createOrder(orderPayload,token);

});

test.beforeEach(()=>{
})

test('Test API', async ({page})=>{

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token );
    
    await page.goto('https://rahulshettyacademy.com/client');

    await page.locator('[routerlink*="/dashboard/myorders"]').click();
    await page.locator('h1:has-text("Your Orders")').waitFor({state: 'visible'});

    let confirmed = false;
    const orders = await page.locator('tbody tr');
    let count = await orders.count();
    for ( let h=0; h < count; ++h ){
        if(await orders.locator('th').nth(h).textContent() == orderID){
            confirmed = true;
            break;
        }
    }
    await expect(confirmed).toBe(true);
    await page.pause();

})
const {test, expect, request} = require('@playwright/test');
const loginPayloadAle = {userEmail: "ale.castro@hotmail.com", userPassword: "Rs@159357"};
const loginPayloadAlex = {userEmail: "a_vazquez_d@yahoo.com", userPassword: "Rs@159357"};
const orderAlePayload = {id: "634cabb8c4d0c51f4f3fbae4"};
let token;
test.beforeAll( async ()=>{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
    {
        data: loginPayloadAlex
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
    await page.goto('https://rahulshettyacademy.com/client');
    await page.waitForLoadState('networkidle');
    await page.locator('[routerlink="/dashboard/myorders"]').click();

    //ENVIO LA SOLICITUD PARA IR A CIERTA PAGINA
    //PRESIONO QUE VAYA A VER EL ITEM #1 DE EL CLIENTE 1
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=634e0a1ec4d0c51f4f40b2ed',
    
    //ANTES DE RECIBIR LA INFORMACION LE DIGO QUE SU RESPUESTA VAYA A OTRO LADO DISTINTO
    //LE DIGO QUE VAYA A VER EL ITEM #1 DE EL CLIENTE 2
    async route=> 
        route.continue({url: 'https://rahulshettyacademy.com/client/dashboard/order-details/634cac8cc4d0c51f4f3fbb2c'})
    );
    await page.locator('td button[class*="btn-primary"]').waitFor({state:'visible'})
    await page.locator('td button[class*="btn-primary"]').click();
    await page.pause();
})
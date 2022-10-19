
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

    await page.goto('https://rahulshettyacademy.com/client');


    // SOLICITAMOS LA RESPUESTA DEL END POINT QUE LE PEDIMOS LA INFO
    // PARA ESTE EJEMPLO LE PEDIMOS SABER SI HAY ORDENES CREADAS
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/634b0352c4d0c51f4f3ed609',
    route=>{
        //A: INTERCEPTAR LA RESPUESTA -> B: CAMBIAMOS LA RESPUESTA -> C: ENVIAMOS NUEVAMENTE LA RESPUESTA
        //A: CONTEXTO PAGE . CONTEXTO DE REQUEST DE API(linea 9) . HACEMOS FETCH DE LA INFO (DE LA VARIABLE ROUTE (LINEA 34) . DEL METODO REQUEST)
        let response = page.request.fetch(route.request());

        //B: CREAMOS LA RESPUESTA QUE QUEREMOS
        let fakeResponse = {data:[], message:"No Orders"};

        //C: YA QUE HICIMOS LO QUE QUISIMOS... ENVIAMOS LA RESPUESTA NUEVAMENTE AL BROWSER PARA QUE HAGA LO QUE QUERAMOS
        route.fulfill({
            //LA RESPUESTA (LINEA 38)
            response,
            //LA FAKE RESPONSE (LINEA 41)
            fakeResponse,
        })

    }
    );
    await page.waitForLoadState('networkidle');
    await page.locator('[routerlink="/dashboard/myorders"]').click();
    

    await page.pause();


})
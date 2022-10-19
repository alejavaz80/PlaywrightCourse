
// SE IMPORTA LA LIBRERIA DE REQUEST PARA PODER USAR LAS APIs
const {test, expect, request} = require('@playwright/test');

// SE CREA UNA VARIABLE GLOBAL QUE CONTENGA EL PAYLOAD QUE SE LE HARA AL REQUEST
const loginPayload = {userEmail: "ale.castro@hotmail.com", userPassword: "Rs@159357"};

//SE DECLARA UNA VARIABLE GLOBAL PARA ALMACENAR EL TOKEN EN CASO DE QUE CAMBIE
let token;


test.beforeAll( async ()=>{

    //SE CREA UN NUEVO CONTEXTO PARA API CON LA LIBRERIA DE REQUEST
    const apiContext = await request.newContext();

    //USAMOS UNA VARIABLE PARA ALMACENAR LE RESPUESTA.... USAMOS EL CONTEXTO PARA UN METODO POST Y PASAMOS COMO ARGUMENTOS
    // LA URL Y COMO OPCIONES (www.... , <opciones>)
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
    {
        //EL PAYLOAD QUE SE DECLARO ARRIBA (LINEA 6)
        data: loginPayload
    })

    //HACEMOS UN ASSERT PARA VALIDAR QUE LA RESPUESTA (LINEA 19) ES 'OK'
    expect((await loginResponse).ok()).toBeTruthy();

    //GUARDAMOS LA RESPUESTA EN FORMATO DE JSON EN UNA NUEVA VARIABLE
    const loginResponseJson = await loginResponse.json();

    //GUARDAMOS EL TOKEN DE LA RESPUESTA DE JSON.TOKEN
    token = loginResponseJson.token;
});

test.beforeEach(()=>{

})

test('Test API', async ({page})=>{

    //PARA USARLA... USAMOS LE METODO .addInitScript DE LA PAGINA DONDE LE ESTAMOS DICIENDO QUE VA A INYECTAR
    //EL VALUE DENTRO DE LA VENTANA -> LOCAL STORAGE ... LE VA A LLAMAR 'token' AL VALOR
    //Y EL ARGUMENTO QUE SE ENVIA A LA FUNCION ES LA VARIABLE GLOBAL 'token' (LINEA 6>46 )
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token );

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
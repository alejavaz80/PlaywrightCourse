const {test, expect} = require('@playwright/test')

const productWanted = "IPHONE 13 PRO";
let webContext;
//PARA QUE FUNCIONE EL CONTEXTO DEBE DE SER DE BROWSER.. NO DE PAGE
//EL CONTEXTO DE BROWSER DEBE DE JALAR TODA LA INFORMACION DE LA SESION
//NO DE LA PAGINA
test.beforeAll(async ({browser})=>{
    
    const context = await browser.newContext();
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('ale.castro@hotmail.com');
    await page.locator('#userPassword').fill('Rs@159357');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');

    //YA QUE TENEMOS LA INFO QUE QUEREMOS GUARDAR DEL CONTEXTO... 
    //LA GUARDAMOS EN UN ARCHIVO JSON CON EL STORAGESTATE
    await context.storageState({path: 'state.json'});

    //SE PUEDE GUARDAR EL CONTEXTO EN UNA VARIABLE.. ENTONCES SE PUEDE
    //USAR COMO UN CONTEXTO CON ESA INFORMACION
    webContext = await browser.newContext({storageState:'state.json'})


})

test('As user i have to be able to purchase & validate a product', async () => {

    //YA QUE TENEMOS UN CONTEXTO PERSONALIZADO YA LO PODEMOS USAR COMO UNA VARIABLE PARA
    //CREAR MAS PAGINAS CON ESA INFORMACION Y YA NO NECESITAMOS EL FIXTURE.
    const page = await webContext.newPage();
    const options = page.locator('.card-body');
    const productsCount = await options.count();
    
    for (let i=0; i < productsCount; ++i){        
        if(await options.nth(i).locator('b').innerText() == productWanted){
            await options.nth(i).locator('i').nth(1).click();
        }
    }
})

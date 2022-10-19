const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../../pageobjects/LoginPage');
const dataSet = require('../../utils/placeorder.json');

test.beforeAll(async ()=>{
})

test.describe.configure({mode:'parallel'});
test('As user i will be able to login into ecommmerce page1', async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.rahulUrl();
    await loginPage.validLogin(dataSet.data[0].username, dataSet.data[0].password);
    await loginPage.validLogin(dataSet.nodata[1].username,dataSet.nodata[0].password);
    await page.pause();
})

test('@this As user i will be able to login into ecommmerce page2', async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.rahulUrl();


    await loginPage.validLogin(dataSet.data[0].username, dataSet.data[0].password).screenshot({path:'elementscreenshot.png'});
    await page.screenshot({path: 'screenshot.png'});
    expect(await page.screenshot()).toMatchSnapshot('after.png');

    await loginPage.validLogin(dataSet.nodata[1].username,dataSet.nodata[0].password);
    await page.pause();
})

test('As user i will be able to login into ecommmerce page3', async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.rahulUrl();
    await loginPage.validLogin(dataSet.data[0].username, dataSet.data[0].password);
    await loginPage.validLogin(dataSet.nodata[1].username,dataSet.nodata[0].password);
    await page.pause();
})

test('@this As user i will be able to login into ecommmerce page4', async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.rahulUrl();
    await loginPage.validLogin(dataSet.data[0].username, dataSet.data[0].password);
    await loginPage.validLogin(dataSet.nodata[1].username,dataSet.nodata[0].password);
    await page.pause();
})




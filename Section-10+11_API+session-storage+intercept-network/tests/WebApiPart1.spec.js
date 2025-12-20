const {test, expect, request} = require('@playwright/test');
const {ApiUtils} = require('./utils/ApiUtils');
const loginPayload = {userEmail: "stiven@gmail.com", userPassword: "Awer123$"}
const orderPayload = {orders: [{country: "Canada", productOrderedId: "68a961459320a140fe1ca57a"}]}

let response 

test.beforeAll(async()=>{
    const apiContext = await request.newContext()
    const apiUtils = new ApiUtils(apiContext, loginPayload)
    response = await apiUtils.createOrder(orderPayload)
})


test('Client App login test', async({page})=>{

    //set token in local storage before page load
    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value)
    },response.token)

    // await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    // await page.locator("#userEmail").fill(email);
    // await page.locator("#userPassword").fill("Awer123$");
    // await page.locator("#login").click(); 
    // await page.waitForLoadState('networkidle'); // Wait for network to be idle


    await page.goto("https://rahulshettyacademy.com/client/")

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");

    for(let i=0; i< await rows.count(); i++){
        const rowOrderID = await rows.nth(i).locator("th").textContent()
        if(response.orderId.includes(rowOrderID)){
            await rows.nth(i).locator("button").first().click()
            break
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();


})
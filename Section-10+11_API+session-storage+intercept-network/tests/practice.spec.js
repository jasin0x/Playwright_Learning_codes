const {test, expect, request} = require('@playwright/test');
const {testApiUtils} = require('./utils/testApiUtils');
const loginPayload = {userEmail: "stiven@gmail.com", userPassword: "Awer123$"}
const orderPayload = {orders: [{country: "Canada", productOrderedId: "68a961459320a140fe1ca57a"}]}
let apiUtils
let orderId

test.beforeAll(async()=>{
    const apiContext = await request.newContext()
    apiUtils = new testApiUtils(apiContext, loginPayload)
    orderId = await apiUtils.createOrder(orderPayload)
})


test("Client app login test", async({page})=>{

    const authToken = await apiUtils.getToken()
    await page.addInitScript(value=>{
        window.localStorage.setItem("token",value)
    },authToken)


    await page.goto("https://rahulshettyacademy.com/client/")

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");

    for(let i=0; i< await rows.count(); i++){
        const rowOrderID = await rows.nth(i).locator("th").textContent()
        if(orderId.includes(rowOrderID)){
            await rows.nth(i).locator("button").first().click()
            break
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();


})
const {test, expect, request} = require('@playwright/test');
const {ApiUtils} = require('./utils/ApiUtils');
const loginPayload = {userEmail: "stiven@gmail.com", userPassword: "Awer123$"}
const orderPayload = {orders: [{country: "Canada", productOrderedId: "68a961459320a140fe1ca57a"}]}
const fakePayLoadOrders = { data: [], message: "No Orders" };

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

    await page.goto("https://rahulshettyacademy.com/client");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route =>{
            //grab the response of the request
            const response = await page.request.fetch(route.request())
            //manipulate the response and send fake response to browser
            let body = await JSON.stringify(fakePayLoadOrders)
            route.fulfill(
                {
                    response,
                    body
                }
            )
            //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
        }
    )


    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    //await page.locator(".mt-4").textContent();


})
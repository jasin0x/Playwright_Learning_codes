const { test, expect } = require('@playwright/test');
const POMmanager = require('../pageObjects/POManager');
const {customTest} = require('../utils/test-base');

// Json->string->object
const dataset = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')))

for(const data of dataset) {

    test(`Client App login ${data.productName}`, async ({ page }) => {
        const poManager = new POMmanager(page)
        // const productName = data.productName
        const products = page.locator(".card-body");
        // const email = data.username
        // const password = data.password

        // create object of LoginPage
        const loginPage = poManager.getLoginPage()

        await loginPage.goTo()
        await loginPage.validLogin(data.username, data.password)
        const dashboardPage = poManager.getDashboardPage()

        await dashboardPage.searchProductAddCart(data.productName)
        await dashboardPage.navigateToCart()
        await page.locator("div li").first().waitFor();

        // create object of CartPage
        const cartPage = poManager.getCartPage()
        // verify item is in cart
        const bool = await cartPage.verifyItemInCart(data.productName);
        expect(bool).toBeTruthy();
        await cartPage.Checkout()

        // create object of CheckoutPage
        const checkoutPage = poManager.getCheckoutPage()
        // fill checkout details
        await checkoutPage.fillCheckoutDetails("11", "15", "332", "Stive", "India")
        await expect(checkoutPage.email).toHaveText(data.username);

        // submit order and get order id
        const orderId = await checkoutPage.SubmitAndGetOrderId();
        console.log("Order ID is: " + orderId);

        // go to My Orders page and verify order id is present
        await dashboardPage.navigateToOrders()

        const orderHistoryPage = poManager.getOrderHistoryPage()
        await orderHistoryPage.searchOrderAndSelect(orderId)
        expect(orderId.includes(await orderHistoryPage.getOrderID())).toBeTruthy();

        //await page.pause(3000);

    })

}


customTest("Client App login", async ({ page, testDataForOrder }) => {
        const poManager = new POMmanager(page)
        // const productName = data.productName
        const products = page.locator(".card-body");
        // const email = data.username
        // const password = data.password

        // create object of LoginPage
        const loginPage = poManager.getLoginPage()

        await loginPage.goTo()
        await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password)
        const dashboardPage = poManager.getDashboardPage()

        await dashboardPage.searchProductAddCart(testDataForOrder.productName)
        await dashboardPage.navigateToCart()
        await page.locator("div li").first().waitFor();

        // create object of CartPage
        const cartPage = poManager.getCartPage()
        // verify item is in cart
        const bool = await cartPage.verifyItemInCart(testDataForOrder.productName);
        expect(bool).toBeTruthy();
        await cartPage.Checkout()

})
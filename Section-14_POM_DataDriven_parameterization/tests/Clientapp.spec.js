const {test, expect} = require('@playwright/test');
const POMmanager = require('../pageObjects/POManager');

test('Client App login test', async({page})=>{
    
    const poManager = new POMmanager(page)
    const productName = "ZARA COAT 3"
    const products = page.locator(".card-body");
    const email = "stiven@gmail.com" 
    const password = "Awer123$"

    // create object of LoginPage
    const loginPage = poManager.getLoginPage()

    await loginPage.goTo()
    await loginPage.validLogin(email, password)
    const dashboardPage = poManager.getDashboardPage()

    await dashboardPage.searchProductAddCart(productName)
    await dashboardPage.navigateToCart()
    await page.locator("div li").first().waitFor();

    // create object of CartPage
    const cartPage = poManager.getCartPage()

    // verify item is in cart
    const bool = await cartPage.verifyItemInCart("ZARA COAT 3");
    expect(bool).toBeTruthy();
    await cartPage.Checkout()

    // create object of CheckoutPage
    const checkoutPage = poManager.getCheckoutPage()
    // fill checkout details
    await checkoutPage.fillCheckoutDetails("11", "15", "332", "Stive", "India")
    await expect(checkoutPage.email).toHaveText(email)

    // submit order and get order id
    const orderId = await checkoutPage.SubmitAndGetOrderId();
    console.log("Order ID is: "+ orderId);

    // go to My Orders page and verify order id is present
    await dashboardPage.navigateToOrders()

    const orderHistoryPage = poManager.getOrderHistoryPage()
    await orderHistoryPage.searchOrderAndSelect(orderId)
    expect(orderId.includes(await orderHistoryPage.getOrderID())).toBeTruthy();

    //await page.pause(3000);

})
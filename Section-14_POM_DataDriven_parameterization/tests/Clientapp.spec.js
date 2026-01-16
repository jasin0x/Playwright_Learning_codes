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
    const bool = await cartPage.verifyItemInCart();
    expect(bool).toBeTruthy();
    await cartPage.Checkout()


    // create object of CheckoutPage
    const checkoutPage = poManager.getCheckoutPage()
    // fill checkout details
    await checkoutPage.fillCheckoutDetails("11", "15", "332", "Stive", " ind")
    await expect(checkoutPage.email).toHaveText(email)
    await checkoutPage.placeOrderButton.click();


    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);


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

    //await page.pause(3000);

})
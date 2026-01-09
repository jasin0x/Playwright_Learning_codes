const {test, expect} = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { DashboardPage } = require('../pageObjects/DashboardPage');

test('Client App login test', async({page})=>{
    const productName = "ZARA COAT 3"
    const products = page.locator(".card-body");
    const email = "stiven@gmail.com" 
    const password = "Awer123$"

    // create object of LoginPage
    const loginPage = new LoginPage(page)

    await loginPage.goTo()
    await loginPage.validLogin(email, password)
    const dashboardPage = new DashboardPage(page)

    await dashboardPage.searchProductAddCart(productName)
    await dashboardPage.navigateToCart()

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();

    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text= Checkout").click()

    const monthDropdown = page.locator("select.input.ddl").first();
    const dayDropdown = page.locator("select.input.ddl").last()

    await monthDropdown.selectOption("11");
    await dayDropdown.selectOption("15");
    await page.locator("(//input[@type='text'])[2]").fill("332");
    await page.locator("(//input[@type='text'])[3]").fill('Stive')

    await page.locator("[placeholder*='Select Country']").pressSequentially('ind') //input chracters with delay
    const dropdownOptions = page.locator(".ta-results");
    await dropdownOptions.waitFor();

    const optionsCount = await page.locator("button").count();
    for(let i=0; i<optionsCount; i++){
        const text = await dropdownOptions.locator("button").nth(i).textContent()
        if(text === " India"){
            await dropdownOptions.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email)
    await page.locator(".action__submit").click();
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
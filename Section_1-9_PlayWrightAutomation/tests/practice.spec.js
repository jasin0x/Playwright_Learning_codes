const {test, expect} = require('@playwright/test');

test('Client App login test', async({page})=>{
    const email = "stiven@gmail.com"
    const password = "Awer123$"
    const productName = "ZARA COAT 3"

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill(password);
    await page.getByRole("button",{name:"Login"}).click();
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor()
    const products = page.locator(".card-body");

    await page.locator(".card-body").filter({hasText: productName}).getByRole("button",{name:"Add To Cart"}).click();
    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click()
    await page.locator("div li").first().waitFor()
    await expect(page.getByText(productName)).toBeVisible()

    await page.getByRole("button",{name:"Checkout"}).click()
    await page.getByPlaceholder("Select Country").pressSequentially("ind")
    await page.getByRole("button",{name:"India"}).nth(1).click()
    await page.getByText("PLACE ORDER").click()

    await expect(page.getByText("Thankyou for the order.")).toBeVisible()
    const rawOrderIdText = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const orderID = rawOrderIdText.replace(/\|/g, '').trim();
    console.log(`Extracted Order ID: "${orderID}"`)

    await page.getByRole("button",{name:" ORDERS"}).click()
    await page.locator("tbody").waitFor()

    await page.locator("tbody tr").filter({hasText: orderID}).getByRole("button",{name:"View"}).click()
    await page.locator(".col-text.-main").first().waitFor({state : "visible"});
    await expect(page.locator(".col-text.-main")).toHaveText(orderID)

    await page.pause();
})
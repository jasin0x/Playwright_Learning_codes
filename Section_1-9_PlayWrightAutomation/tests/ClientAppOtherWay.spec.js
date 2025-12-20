const { test, expect } = require('@playwright/test');


test('@Webst Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "anshika@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole('button',{name:"Login"}).click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
    .getByRole("button",{name:"Add to Cart"}).click();
    
    await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
    
    //await page.pause();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    
    await page.getByRole("button",{name :"Checkout"}).click();
    
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    
    await page.getByRole("button",{name :"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
    
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();

    // const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    // console.log(orderId);


    // Original line: const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    // FIX: Clean the extracted orderId by removing pipe characters and trimming whitespace.
    const rawOrderIdText = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    // Use replace to remove all '|' characters and then trim any leading/trailing whitespace.
    const orderId = rawOrderIdText.replace(/\|/g, '').trim(); 
    
    console.log(`Extracted Order ID: "${orderId}"`); // Log to confirm the cleaned ID
 
    await page.getByRole("button", { name: " ORDERS" }).click();
    await page.locator("tbody").waitFor();
    // Use the cleaned orderId in the filter
    await page.locator("tbody tr").filter({ hasText: orderId }).getByRole("button", { name: "View" }).click();
 
    await page.locator(".col-text.-main").first().waitFor({state : "visible"});
    // await page.locator("//small/following-sibling::div").textContent();
    await expect(page.locator(".col-text.-main").first()).toHaveText(orderId);
    await page.pause();
});

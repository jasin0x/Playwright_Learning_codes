const {test, expect} = require('@playwright/test');

test('Browser context playwright test', async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator("#username");
    const password = page.locator("[type='password']");
    const signInBtn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-title a");
     
    // css selector
    await userName.fill("rahulshettyacademy1");
    await password.fill("learning000");
    await signInBtn.click();
    
    const errorText = await page.locator("[style*='block']").textContent()
    console.log(errorText);
    await expect(page.locator("[style*='block']")).toContainText(errorText);

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await signInBtn.click();
    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());

    const allTitles = await cardTitles.allTextContents()
    console.log(allTitles);
    
})

test('Page playwright test', async({page})=>{
    await page.goto("https://google.com");
    //get title
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

})



test('Basic Select dropdown interation', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const passWord = page.locator("//input[@id='password']")
    const dropDown = page.locator("select.form-control");
    const documentLink = page.locator("a[href*='documents-request']");

    await dropDown.selectOption("consult")
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked())
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click()
    await expect(page.locator("#terms")).toBeChecked()
    await page.locator("#terms").uncheck()
    expect(await page.locator("#terms").isChecked()).toBeFalsy()
    await expect(documentLink).toHaveAttribute("class","blinkingText");

    //await page.pause();
})


test.only("Child window handle", async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage()
    const userName = page.locator("#username");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']")

    const [newPage] = await Promise.all([
        context.waitForEvent("page"), //listen for new page event   pending, rejected, fulfilled
        documentLink.click() //click that opens new tab
    ]) //triggering action that opens new tab

    const text = await newPage.locator(".im-para.red").textContent();
    const arrayText = text.split("@");
    const u_name = arrayText[1].split(" ")[0].split(".")[0]
    console.log(u_name);

    await userName.fill(u_name)
    console.log(await page.locator("#username").inputValue())
    await page.pause();



})
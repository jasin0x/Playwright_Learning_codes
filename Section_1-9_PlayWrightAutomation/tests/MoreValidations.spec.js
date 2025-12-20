const {test,expect} = require('@playwright/test')


test("Popup validations",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")

    // await page.goto("https://google.com")
    // await page.goBack()
    // await page.goForward()

    await expect(page.locator("#displayed-text")).toBeVisible()
    await page.locator("#hide-textbox").click()
    await expect(page.locator("#displayed-text")).toBeHidden()

})

test("Alert/dialog validations",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")

    //alert popup, page.on() listen for event to occur
    await page.pause()
    page.on('dialog',dialog => dialog.accept())
    await page.locator("#alertbtn").click()
})

test("Mouse hover validations",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await page.pause()
    await page.locator("#mousehover").hover()
})

test.only("iFrame validations",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    const framesPage = page.frameLocator("#courses-iframe")
    await framesPage.locator("a[href*='/mentorship']").first().click()
    console.log(framesPage.locator(".text-lg").first().textContent())
    await page.pause()
    
})
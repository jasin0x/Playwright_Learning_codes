const {test,expect} = require('@playwright/test')



test.describe.configure({mode:"parallel"}) // test.describe() is used to group related tests together. By default, tests within a describe block run sequentially. However, by configuring the describe block with mode: "parallel", you can enable parallel execution of the tests within that block. This means that the tests will run concurrently, which can significantly reduce the overall test execution time, especially when you have a large number of tests or when the tests involve time-consuming operations like network requests or interactions with a web application.
//test.describe.configure({mode:"serial"}) // if one test fails, the rest of the tests in the describe block will be skipped. This is useful when you have tests that depend on each other or when you want to ensure that a certain setup is successful before running subsequent tests.

test("@Web Popup validations",async({page})=>{
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
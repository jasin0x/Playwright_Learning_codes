const {test,expect} = require('@playwright/test')


test("screenshot test", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await expect(page.locator("#displayed-text")).toBeVisible()
    await page.locator("#displayed-text").screenshot({path:"testPartialScreenshot.png"})
    await page.locator("#hide-textbox").click()
    await page.screenshot({path:"testFullscreenshot.png"})
    await expect(page.locator("#displayed-text")).toBeHidden()
})

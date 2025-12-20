const {test, expect} = require('@playwright/test')

test("Calender date picker test", async({page})=>{

    const monthNumber = "6"
    const day = "16"
    const year = "2022" 

    const expectedList = [monthNumber, day, year]

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
    await page.locator(".react-date-picker__calendar-button__icon").click()
    await page.locator(".react-calendar__navigation__label").click()
    await page.locator(".react-calendar__navigation__label").click()

    await page.getByText(year).click()
    await page.locator(".react-calendar__year-view__months__month").nth(parseInt(monthNumber)-1).click()
    await page.locator("//abbr[text()='"+day+"']").click()


    const inputs =  page.locator('.react-date-picker__inputGroup__input')
    for(let i =0; i<expectedList.length;i++)
    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
 
    }
 

    
}) 
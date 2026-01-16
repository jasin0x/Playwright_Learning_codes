const { expect } = require("@playwright/test");

class CheckoutPage {

    constructor(page) {
        this.page = page
        this.monthDropdown = this.page.locator("select.input.ddl").first();
        this.dayDropdown = this.page.locator("select.input.ddl").last()
        this.ccvInput = this.page.locator("(//input[@type='text'])[2]")
        this.nameInput = this.page.locator("(//input[@type='text'])[3]")
        this.countryInput = this.page.locator("[placeholder*='Select Country']")
        this.dropdownOptions = this.page.locator(".ta-results")
        this.email = this.page.locator(".user__name [type='text']").first()
        this.placeOrderButton = this.page.locator(".action__submit");
        this.orderConfirmationText = this.page.locator(".hero-primary")
        this.orderId =  this.page.locator(".em-spacer-1 .ng-star-inserted")
        //this.countryOptions = this.page.locator("button")
    }


    async fillCheckoutDetails(month, day, ccv, name, country) {
        await this.monthDropdown.selectOption(month)
        await this.dayDropdown.selectOption(day)
        await this.ccvInput.fill(ccv)
        await this.nameInput.fill(name)
        
        await this.countryInput.pressSequentially('ind') //input characters with delay
        await this.dropdownOptions.waitFor()

        const optionsCount = await this.dropdownOptions.locator("button").count();
        for (let i = 0; i < optionsCount; i++) {
            const text = await this.dropdownOptions.locator("button").nth(i).textContent()
            if (text.trim() === country) {
                await this.dropdownOptions.locator("button").nth(i).click();
                break;
            }
        }
    }

    async SubmitAndGetOrderId(){
        await this.placeOrderButton.click();
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
        return await this.orderId.textContent();
    }

}

module.exports = { CheckoutPage }
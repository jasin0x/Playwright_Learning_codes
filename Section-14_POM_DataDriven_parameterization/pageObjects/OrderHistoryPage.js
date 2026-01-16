class OrderHistoryPage {

    constructor(page) {
        this.page = page
        this.ordersTable = page.locator("tbody");
        this.rows = this.page.locator("tbody tr");
        this.orderIdDetails = this.page.locator(".col-text")
    }

    async searchOrderAndSelect(orderId) {
        await this.ordersTable.waitFor();
        const rows = await this.rows

        for (let i = 0; i < await rows.count(); i++) {
            const rowOrderID = await rows.nth(i).locator("th").textContent()
            if (orderId.includes(rowOrderID)) {
                await rows.nth(i).locator("button").first().click()
                break
            }
        }  
    }

    async getOrderID(){
        return await this.orderIdDetails.textContent();
    }




}

module.exports = { OrderHistoryPage }
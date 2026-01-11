class CartPage{

    constructor(page){
        this.page = page
        this.itemName = page.locator("h3:has-text('ZARA COAT 3')")
        this.checkOutButton = page.locator("text= Checkout")
    }

    async verifyItenInCart(){
        const bool = await this.itemName.isVisible();
        return bool;
    }

}

module.exports = {CartPage}
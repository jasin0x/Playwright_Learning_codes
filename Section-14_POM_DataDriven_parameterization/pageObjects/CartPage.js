class CartPage{

    constructor(page){
        this.page = page
        //this.productName = page.locator("h3:has-text('ZARA COAT 3')")
        this.checkOutButton = page.locator("text= Checkout")
    }

    async verifyItemInCart(productName){
        const bool = await this.getProductLoactor(productName).isVisible();
        return bool;
    }

    async Checkout(){
        await this.checkOutButton.click();
    }

    getProductLoactor(productName){
        return this.page.locator(`h3:has-text('${productName}')`)
    }

}

module.exports = {CartPage}
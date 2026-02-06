const {LoginPage} = require("./LoginPage");
const {DashboardPage} = require("./DashboardPage");
const {CartPage} = require("./CartPage");
const {CheckoutPage} = require("./CheckoutPage");
const {OrderHistoryPage} = require("./OrderHistoryPage");

// Page Object Manager Class to manage all page objects and provide access to them
class POMmanager{
    constructor(page){
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.dashboardPage = new DashboardPage(this.page)
        this.cartPage = new CartPage(this.page)
        this.checkoutPage = new CheckoutPage(this.page)
        this.orderHistoryPage = new OrderHistoryPage(this.page)
    }

    getLoginPage(){
        return this.loginPage
    }

    getDashboardPage(){
        return this.dashboardPage
    }

    getCartPage(){
        return this.cartPage
    }

    getCheckoutPage(){
        return this.checkoutPage
    }

    getOrderHistoryPage(){
        return this.orderHistoryPage
    }

}

module.exports = POMmanager
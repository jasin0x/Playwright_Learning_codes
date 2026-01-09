class LoginPage{

    constructor(page){
        this.page = page
        this.signInButton = page.locator("#login")
        this.userName = page.locator("#userEmail")
        this.password = page.locator("#userPassword")
    }

    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    }

    async validLogin(userName, password){
        await this.userName.fill(userName)
        await this.password.fill(password)
        await this.signInButton.click()
        await this.page.waitForLoadState('networkidle'); // Wait for network to be idle
    }

}

module.exports = {LoginPage}
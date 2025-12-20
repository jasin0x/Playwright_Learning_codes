class testApiUtils{

    constructor(apiContext, loginPayload){
        this.apiContext = apiContext
        this.loginPayload = loginPayload
    }

    async getToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {data: this.loginPayload}
        )
        const loginResponseJson  = await loginResponse.json()
        const token = loginResponseJson.token
        return token
    }

    async createOrder(orderPayload){
        
        const createOrderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {data: orderPayload,
                headers:{
                    "Authorization": await this.getToken(),
                    "Content-Type":"application/json"
                }
            }
        )
        const createOrderResponseJson = await createOrderResponse.json()
        const orderId = createOrderResponseJson.orders[0]
        return orderId

    }


}

module.exports = {testApiUtils}
class ApiUtils{

    constructor(apiContext,loginPayload){
        this.apiContext=apiContext
        this.loginPayload=loginPayload
    }

    async getToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
                {data: this.loginPayload}
            )

            //parse json response
            const loginResponseJson = await loginResponse.json()
            const token = loginResponseJson.token
            console.log("Token: "+ token);
            return token;
    }

    async createOrder(orderPayload){
        //
        let response = {}
        response.token = await this.getToken()
        //send post request to create order endpoint
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers:{
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }  
        })
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;

        return response;
        }


}

module.exports = {ApiUtils}
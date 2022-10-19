class APIUtils{

    constructor(apiContext){
        this.apiContext = apiContext;
    }

    async getToken(loginPayload){

        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data: loginPayload
        })
        expect((await loginResponse).ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        return token = loginResponseJson.token;
    }

    async createOrder(orderPayload,token){
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
    {
        data: orderPayload, 
        headers:{
            'Authorization' : token,
            'Content-Type': 'application/json'
        },
    })    
        const orderResponseJson = await orderResponse.json();
        return orderID = orderResponseJson.orders[0];

    }



}

export {APIUtils};
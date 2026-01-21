const base = require('@playwright/test')

exports.customTest = base.test.extend({
    testDataForOrder: {
        username: "stiven@gmail.com",
        password: "Awer123$",
        productName: "ZARA COAT 3"
    }
    
})
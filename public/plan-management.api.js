document.addEventListener("alpine:init", () => {

    Alpine.data('phonePlans', () => {
        return {

            title: 'Xmobile Price Plans',
            plans: [],
            bill: '',
            cartPizzas: [],
            planID: '',
            paymentAmount: 0,
            message: '',
            planName: '',
            smsPrice: '',
            callPrice: '',



            init() {
                axios
                    .get('/api/price_plans/')
                    .then(result => {
                        this.plans = result.data.plans;
                        console.log(result.data)
                        console.log(result.data.plans)

                    });


            },

            createPlan(planName, smsPrice, callPrice) {
                
                return axios
                    .post('/api/price_plan/create ', {
                        "plan_name": `${planName}`,
                        "sms_price": `${smsPrice}`,
                        "call_price": `${callPrice}`

                    })
                    //.then(result => { this.showCartData() })

            },

            updatePlan(planName,  smsPrice, callPrice) {
                
                return axios
                    .post('/api/price_plan/create ', {
                        "plan_name": `${planName}`,
                        "sms_price": `${smsPrice}`,
                        "call_price": `${callPrice}`

                    })
                    //.then(result => { this.showCartData() })

            },

            deletePlan(planID) {
                
                return axios
                    .post('/api/price_plan/delete', {
                        
                            "id" : `${planID}`
                        
                    })
                    //.then(result => { this.showCartData() })
            },

            pay(amount) {
                return axios
                    .post('https://pizza-api.projectcodex.net/api/pizza-cart/pay', {
                        "cart_code": "AaaCpfsnf8",
                        amount
                    })
                    .then(result => {
                        if (result.data.status == 'failure') {
                            this.message = result.data.message;
                            setTimeout(() => this.message = '', 3000)
                        }
                        else {
                            this.message = 'Payment successful';
                            setTimeout(() => {
                                this.message = '';
                                this.cartPizzas = [];
                                this.cartTotal = 0;
                                this.paymentAmount = 0.00;
                                this.cartId = ''
                            }, 5000)

                        }
                    })
            },



        }
    });



});
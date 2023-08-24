document.addEventListener("alpine:init", () => {

    Alpine.data('pizzaCart', () => {
        return {

            title: 'Pizza Cart API',
            plans: [],
            username: 'Lind-code419',
            cartId: '',
            cartPizzas: [],
            cartTotal: 0.00,
            paymentAmount: 0,
            message: '',
            createCart() {
                const createCartUrl = 'https://pizza-api.projectcodex.net/api/pizza-cart/create?username=Lind-code419';
                return axios.get(createCartUrl);
            },

            getCart() {
                const getCartUrl = 'https://pizza-api.projectcodex.net/api/pizza-cart/AaaCpfsnf8/get'
                return axios
                    .get(getCartUrl);
            },

            showCartData() {
                this.getCart().then(result => {
                    const cartData = result.data;
                    this.cartPizzas = cartData.pizzas;
                    this.cartTotal = cartData.total.toFixed(2);
                    message = this.cartId;
                    // this.cartPizzas = result.data.pizzas;
                });

            },

            init() {
                axios
                    .get('/api/price_plans/')
                    .then(result => {
                        console.log(result.data)
                        this.plans = result.data.plans;
                    });
                

            },

            createPlan(pizzaID) {
                //alert(pizzaID);
                return axios
                    .post('/api/price_plan/create ', {
                        "plan_name" : "sms_kick_201",
                        "sms_price": 0.45,
                        "call_price" : 2.65
                        
                    })
                    .then(result => { this.showCartData() })

            },
            deletePlan(pizzaID) {
                //alert(pizzaID);
                return axios
                    .post('https://pizza-api.projectcodex.net/api/pizza-cart/remove', {
                        "cart_code": "AaaCpfsnf8",
                        "pizza_id": pizzaID

                    })
                    .then(result => { this.showCartData() })
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
                        else {this.message = 'Payment successful';
                        setTimeout(()=>{
                            this.message='';
                            this.cartPizzas = [];
                            this.cartTotal = 0;
                            this.paymentAmount = 0.00;
                            this.cartId =''}, 5000)
                    
                    }
                    })
            },

          /*  payForCart() {
                // alert("pay now! R" + this.paymentAmount);
                this
                    .pay(this.paymentAmount)
                    
            }*/



        }
    });



});
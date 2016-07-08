var payment = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://yoururl.com/execute",
        "cancel_url": "http://yoururl.com/cancel"
    },
    "transactions": [{
        "amount": {
            "total": "5.00",
            "currency": "USD"
        },
        "description": "My awesome payment"
    }]
};

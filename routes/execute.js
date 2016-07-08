exports.execute = function(req, res) {
    var paymentId = req.session.paymentId;
    var payerId = req.param('PayerID');

    var details = { "payer_id": payerId };
    paypal.payment.execute(paymentId, details, function (error, payment) {
        if (error) {
            console.log(error);
            res.render('error', { 'error': error});
        } else {
            res.render('execute', {'payment': payment});
        }
    });
};

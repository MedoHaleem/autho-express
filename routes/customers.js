module.exports = app => {
    const Customer = app.models.customer;
    //Usually I don't write any business logic inside routes file instead  I use a controller to verify the params get result from service file and send the response, the service file which handle the business logic/ call db models
    // ex:
    // app.route('/customers/')
    //     .all(app.auth.authenticate())
    //     .get(CustomerController.getAllCustomers)
    app.get("/customers", app.auth.authenticate(), app.auth.authorize('sales_rep'), (req, res) => {
        Customer.findAll().then(customers => res.json({customers: customers}));
    });

};
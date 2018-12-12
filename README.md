
## How To run the application

after running ``npm install``, copy .env file in root folder and simpley run ``npm start`` for whatever reason if babel node is giving any trouble you can run ``npm run deploy`` or ``npm run deploy-linux``
one for windows and the other is for linux.

## Testing

The app is simple and don't have anything test, can't write integration test as  we don't connect to any db, and we don't have any kind of business logic to write unit test so that leave us accpetance test
and can be one case and done with simple refactor

We can't stub auth in my current code middleware, the function is the default export - there’s nothing to stub it on. This is because you can’t stub modules themselves.
The best way to get around this is to change my export to an object with the middleware function as a property.                                      
 
```
in auth.js we remove function export to object and functions as property

import config from './libs/config'
module.exports = {
    authenticate: () => {
        return jwt({
            secret: jwksRsa.expressJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `https://${config.authDomain}/.well-known/jwks.json`
            }),
            audience: config.auth0Audience,
            issuer: `https://${config.authDomain}/`,
            algorithms: ["RS256"]
        });
    },
    authorize: (role) => {
        return function (req, res, next) {
            const roles = req.user["http://localhost:3000/roles"];
            if (Array.isArray(roles) && roles.includes(role)) {
                return next();
            } else {
                return res.status(401).send("User is not authorized");
            }
        };
    }
};


in server.js we remove auth from the include

consign()
    .include("libs/config.js")
    .then("models")
    .then("libs/middlewares.js")
    .then("routes")
    .then("libs/boot.js")
    .into(app);



in routes/customer.js, we no longer reference through app.auth so we import auth from the file

import {authorize, authenticate} from "../auth";

module.exports = app => {
    const Customer = app.models.customer;
    app.get("/customers", authenticate(), authorize('sales_rep'), (req, res) => {
        Customer.findAll().then(customers => res.json({customers: customers})).catch(err => res.status(500).send({error: err}));
    });

};

in test/customer.test.js

    describe("GET Success 200", () => {
        before(() => {
            return sinon.stub(auth, 'authenticate').callsFake((req, res, next) => {
                req.user = {"http://localhost:3000/roles": "sales_rep"};
                next();
            });
        })
        it("return 200 with array of customers", async () => {
            let customers = await Customer.findAll()
            request.get("/customers")
                .set('Authorization', `Bearer ${token}`)
                .expect(200).end((err, res) => {
                 expect(res.body.customers).to.eql(customers);
            });
        });
    });

```

regardless the way I write unit tests for models, you know validate creation with valid attributes, throw error if unvalid and write tests for functions of services,
then in the integration test, I write test for the controllers where I stub res.json / res.status check if they were called ..etc
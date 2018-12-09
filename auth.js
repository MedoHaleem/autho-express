import jwksRsa from 'jwks-rsa';
import jwt from 'express-jwt';

module.exports = app => {
    return {
        authenticate: () => {
            return jwt({
                secret: jwksRsa.expressJwtSecret({
                    cache: true,
                    rateLimit: true,
                    jwksRequestsPerMinute: 5,
                    jwksUri: `https://${app.libs.config.authDomain}/.well-known/jwks.json`
                }),
                audience: app.libs.config.auth0Audience,
                issuer: `https://${app.libs.config.authDomain}/`,
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
};
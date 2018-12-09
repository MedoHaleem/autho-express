import jwksRsa from 'jwks-rsa';
import jwt from 'express-jwt';

module.exports = app => {
    console.log(app.libs.config)
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
        }
    };
};
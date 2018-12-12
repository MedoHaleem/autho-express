module.exports = app => {
    app.listen(app.libs.config.port, () => {
        console.log(`Customer Service API - Port ${app.libs.config.port}`);
    });
};
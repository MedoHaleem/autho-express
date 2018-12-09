module.exports = app => {
    app.listen(app.get("port"), () => {
        console.log(`Customer Service API - Port ${app.get("port")}`);
    });
};
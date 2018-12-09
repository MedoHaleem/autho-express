module.exports = app => {
    app.set("port", app.libs.config.port);
    app.set("json spaces", 4);
};
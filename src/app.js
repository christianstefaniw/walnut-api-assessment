const express = require("express");
const app = express();
const router = express.Router()

const pingServer = require("./controllers/ping_server");
const queryBlogPosts = require("./controllers/query_blog_posts");


function initApp() {
    initRoutes()
}


function initRoutes() {
    router.get('/ping', pingServer);
    router.get('/posts', queryBlogPosts);

    app.use('/api', router);
}


initApp();

module.exports = app;
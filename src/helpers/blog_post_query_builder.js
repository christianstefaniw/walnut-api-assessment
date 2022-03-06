const ApiConstants = require("../constant/api_constants");

class BlogPostQueryBuilder {
    _url = ApiConstants.BLOG_POSTS;

    constructor() {
        this._url += '?';
    }

    _addAndSign() {
        this._url += '&';
    }

    addTag(tag) {
        this._url += `tag=${tag}`;
    }

    addSortBy(sortBy) {
        this._addAndSign();
        this._url += `sortBy=${sortBy}`;
    }

    addDirection(direction) {
        this._addAndSign();
        this._url += `directon=${direction}`;
    }

    build() {
        return this._url;
    }
}

module.exports = BlogPostQueryBuilder;
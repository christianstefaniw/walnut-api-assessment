const { StatusCodes } = require("http-status-codes");

const BlogPostQueryBuilder = require("../helpers/blog_post_query_builder");
const Cache = require("../helpers/cache");
const parseBlogPostsQuery = require("../helpers/parse_blog_posts_query");
const ApiService = require("../services/api");

async function queryBlogPosts(req, res) {
    let parsedQuery = parseBlogPostsQuery(req.query);
    let posts = [];

    if (parsedQuery.error)
        return res.status(StatusCodes.BAD_REQUEST).json({ 'error': parsedQuery.error })

    let promises = []
    for (let tag of parsedQuery.tags) {
        const query = getQueryString(tag, parsedQuery);
        promises.push(getSetOfPosts(query, posts));
    }

    await Promise.all(promises);

    res.status(StatusCodes.OK).json({ 'posts': removeDuplicatePosts(posts) });
}

// get query string for the external api based on the tag and the passed in query
function getQueryString(tag, parsedQuery) {
    let queryBuilder = new BlogPostQueryBuilder();

    queryBuilder.addTag(tag);

    if (parsedQuery.sortBy)
        queryBuilder.addSortBy(parsedQuery.sortBy);
    if (parsedQuery.direction)
        queryBuilder.addDirection(parsedQuery.direction);

    return queryBuilder.build();
}

// get set of posts with certian tag and add to the all posts list
function getSetOfPosts(query, allPosts) {
    return new Promise(async function (resolve, _) {
        const postsFromCache = getPostsFromCache(query);
        if (postsFromCache)
            allPosts.push(...postsFromCache);
        else {
            const getPostsresponse = await ApiService.get(query);
            const posts = getPostsresponse.data.posts;
            Cache.cached[query] = posts;
            allPosts.push(...posts);
        }
        resolve();
    })
}

function getPostsFromCache(query) {
    return Cache.cached[query];
}

function removeDuplicatePosts(posts) {
    // O(N) time complexity
    let seenPosts = {}
    let filteredPosts = []

    for (let post of posts) {
        if (seenPosts[post.id])
            continue;

        filteredPosts.push(post);
        seenPosts[post.id] = true;
    }

    return filteredPosts;
}

module.exports = queryBlogPosts;
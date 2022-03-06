const DirectionValidator = require("../validators/direction");
const SortByValidator = require("../validators/sort_by");

function parseBlogPostsQuery(query) {
    let parsed = {}

    if (query.tags)
        parsed['tags'] = query.tags.split(',');
    else
        return { error: 'Tags parameter is required' }


    if (query.sortBy) {
        const validationError = SortByValidator.run(query.sortBy);
        if (validationError)
            return { error: validationError }

        parsed['sortBy'] = query.sortBy;
    }
    
    if (query.direction) {
        const validationError = DirectionValidator.run(query.direction);
        if (validationError)
            return { error: validationError }

        parsed['direction'] = query.direction;
    }

    return parsed;
}

module.exports = parseBlogPostsQuery;
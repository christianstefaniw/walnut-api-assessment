class SortByValidator {
    static _validSorts = ['id', 'reads', 'likes', 'popularity'];

    static run(sortBy) {
        if (!SortByValidator._validSorts.includes(sortBy))
            return "sortBy parameter is invalid";
    }
}

module.exports = SortByValidator;
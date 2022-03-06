class DirectionValidator {
    static _validDirections = ['desc', 'asc'];

    static run(direction) {
        if (!DirectionValidator._validDirections.includes(direction))
            return "direction parameter is invalid";
    }
}

module.exports = DirectionValidator;
const axios = require('axios');

class ApiService {
    static async get(url) {
        const response = await axios.get(
            url
        )
            .then((response) => response)
            .catch((err) => ({ error: err.response }));

        return response;
    }
}

module.exports = ApiService;
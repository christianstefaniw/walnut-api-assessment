const { StatusCodes } = require('http-status-codes');

function pingServer(req, res) {
    res.status(StatusCodes.OK).json({success: true})
}

module.exports = pingServer;
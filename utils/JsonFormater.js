function generateJsonResponse(statusCode, responseData) {
    return {
        code: statusCode,
        data: responseData
    }
}

module.exports.generateJsonResponse = generateJsonResponse;
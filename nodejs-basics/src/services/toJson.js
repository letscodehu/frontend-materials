module.exports = function(response) {
    return function(result) {
        response.setHeader("Content-Type", "application/json")
        response.end(JSON.stringify(result))
    }
}

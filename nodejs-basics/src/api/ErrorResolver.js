module.exports = function(response) {
    return function(err) {
        if (err.message) {
            response.end(err.message)
        } else {
            response.end(err)
        }
    }
}

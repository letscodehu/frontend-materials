const fs = require('fs').promises;
function home(req, res) {
    fs.readFile(__dirname + "/../assets/index.html").then(data => {
        res.writeHead(200)
        res.end(data)
    })
        .catch(err => {
            res.writeHead(404);
            console.log(err)
            res.end("Not found!")
        })
}
module.exports = home;

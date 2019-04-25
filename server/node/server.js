var http = require('http')
function start(route) {
    function onRequest(request, response) {
        route(request,response)
    }
    http.createServer(onRequest).listen(8903)
}
exports.start = start
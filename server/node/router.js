var url = require('url')
var util = require('util')
var hello = require('./hello')
function route(request,response) {
  response.writeHead(200, {"Content-Type": "application/json"})
  var pathname = url.parse(request.url).pathname;
  if(pathname === '/user'){
    hello.user(request,response)
  }
}

exports.route = route;
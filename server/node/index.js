var server = require("./server")
var router = require("./router")

//开启接口监听
server.start(router.route)

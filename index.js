let express = require('express')
let app = express()
//to make a http server
let http = require('http')
let httpServer = http.createServer(app)
let io = require('socket.io')(httpServer)

app.use(express.static("public"))



let PORT = process.env.PORT || 8080
httpServer.listen(PORT, () =>{
    console.log(`Listening at port ${PORT}`)
})
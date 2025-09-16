let express = require('express')
let app = express()
//to make a http server
let http = require('http')
let httpServer = http.createServer(app)
let io = require('socket.io')(httpServer)

let connections = []

io.on("connect", (socket) => {
    connections.push(socket);
    console.log(`${socket.id} has connected successfully`)

    socket.on("disconnect" , (reason) => {
        connections = connections.filter((con) => con.id !== socket.id);
        console.log(`${socket.id} has dissconnected`)
    })

})


app.use(express.static("public"))

let PORT = process.env.PORT || 8080
httpServer.listen(PORT, () =>{
    console.log(`Listening at port ${PORT}`)
})
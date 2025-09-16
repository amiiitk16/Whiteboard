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

    socket.on("draw", (data) => {
        connections.forEach((con) => {
            if (con.id !== socket.id) {
                con.emit("ondraw", {x: data.x, y: data.y}) //send to all except socket id
                
            }
        })
    })

    socket.on("down", (data) => {
        connections.forEach((con) => {
            if (con.id !== socket.id) {
                con.emit("ondown", {x: data.x, y: data.y}) 
            }
        })
    })




    socket.on("disconnect" , (reason) => {
        connections = connections.filter((con) => con.id !== socket.id);
        console.log(`${socket.id} has disconnected`)
    })

})


app.use(express.static("public"))

let PORT = process.env.PORT || 8080
httpServer.listen(PORT, () =>{
    console.log(`Listening at port ${PORT}`)
})
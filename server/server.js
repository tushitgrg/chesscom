const io = require('socket.io')(2000, {
    cors: {
        origin: "*",
        methods: ['POST', 'GET']
    }
});
const data = {}
const numbers = {}
io.on("connection", (socket) => {
    console.log("User connected");

 
    socket.on("joinRoom", (roomname) => {
        console.log(`Joined room: ${roomname}`);

       
        // if(numbers[roomname]){
        //     socket.emit("val",2)
        // } 
        // else{
        //     numbers[roomname] = 1;
        //     socket.emit("val",1)
        // } 
      


        socket.join(roomname);
        socket.emit("val",io.sockets.adapter.rooms.get(roomname).size)
        if(data[roomname]){
            io.to(roomname).emit("message", data[roomname]);
        }
     
    });
socket.on("left",(roomname)=>{
    if(numbers[roomname]) numbers[roomname]-=1;
    else numbers[roomname] = 1;
})
   
    socket.on("message", (message, roomname) => {
        console.log(`Message: ${message}, Room: ${roomname}`);
        data[roomname] = message
       
        io.to(roomname).emit("message", message);
        console.log(data)
    });

   
    socket.on("disconnect", (roomname) => {
        console.log("User disconnected");
       
    });

    socket.on("gameover",(roomname)=>{
        numbers[roomname] = null;
        data[roomname] = null;
    })
});

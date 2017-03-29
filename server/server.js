const path=require('path');
const http=require('http')
const express=require('express');
const socketIO=require('socket.io');

var publicPath=path.join(__dirname,'../public');
var port=process.env.PORT || 3000
var app=express();
var server=http.createServer(app);

app.use(express.static(publicPath));
var io=socketIO(server);//open a connection from server to the client which allows server to send and listen to data from client sides(browsers)

io.on('connection',(socket)=>{
    console.log('a new user is connected');

    socket.on('createMessage',(message)=>{
        console.log(message);
    })

    socket.emit('newMessage',{from: 'jimoh',text: 'Bingo is here',createdAt: 123});


    socket.on('disconnect',()=>{
        console.log('user disconnected');
    });
})

server.listen(port,(err)=>{
    if(err) return console.error(err);
    console.log(`server is running on port ${port}`);
});

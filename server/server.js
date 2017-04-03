const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');

const {generateMessage, generateLocationMessage}=require('./utils/message');
const {isRealString} =require('./utils/validation');
const {Users}=require('./utils/users');

const publicPath=path.join(__dirname,'../public');
var port=process.env.PORT || 3000;
var app=express();
var server=http.createServer(app);

app.use(express.static(publicPath));
var io=socketIO(server);//open a connection from server to the client which allows server to send and listen to data from client sides(browsers)
var chatUsers=new Users();

io.on('connection',(socket)=>{
    console.log('a new user is connected');

    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Display name and Room name required!');
        }
        socket.join(params.room);
        chatUsers.removeUser(socket.id);
        chatUsers.addUsers(socket.id,params.name,params.room);

        io.to(params.room).emit('updateUserList',chatUsers.getUserList(params.room));
        //socket.leave(params.room) //to leave a room
        socket.emit('newMessage',generateMessage('Admin','welcome to the chat'));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} joined the chat`));
        callback();
    });

    socket.on('createMessage',(message,callback)=>{
        var user=chatUsers.getUser(socket.id);

        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
        }
        callback();
    });
    socket.on('createLocationMessage',(coord)=>{
        var user=chatUsers.getUser(socket.id);

        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,coord.latitude,coord.longitude));
        }
    })


    socket.on('disconnect',()=>{
        var user=chatUsers.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList',chatUsers.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
        }
        console.log('user disconnected');
    });
});

server.listen(port,(err)=>{
    if(err) return console.error(err);
    console.log(`server is running on port ${port}`);
});

/**
 * Created by ILYASANATE on 29/03/2017.
 */
var socket=io();
socket.on('connect',function(){
    console.log('connected to server');

    socket.emit('createMessage',{to: 'ovenje@gmail.com',text: "how far u"})
});

socket.on('disconnect',function(){
    console.log('disconnected from server');
});
socket.on('newMessage',function(message){
    //console.log('hello '+JSON.stringify(data,undefined,2));
    console.log(message);
})
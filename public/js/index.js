/**
 * Created by ILYASANATE on 29/03/2017.
 */
var socket=io();
socket.on('connect',function(){
    console.log('connected to server');

    //socket.emit('createMessage',{from: 'ovenje@gmail.com',text: "how far u"})
    //do this from chrome developer's console

    socket.on('welcomeMessage',function(messageData){
        console.log(messageData);
    });
    socket.on('newUserMessage',function(data){
        console.log(data.name+' '+data.text);
    });

});

socket.on('disconnect',function(){
    console.log('disconnected from server');
});
socket.on('newMessage',function(message){
    console.log(message);
})
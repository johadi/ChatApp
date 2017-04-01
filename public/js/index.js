/**
 * Created by ILYASANATE on 29/03/2017.
 */
var socket=io();
socket.on('connect',function(){
    console.log('connected to server');

    //socket.emit('createMessage',{from: 'ovenje@gmail.com',text: "how far u"})
    //do this from chrome developer's console
});

socket.on('disconnect',function(){
    console.log('disconnected from server');
});
socket.on('newMessage',function(message){
    var li=jQuery('<li></li>');
    li.text(`${message.from} : ${message.text}`);
    jQuery('#messages').append(li);
});
// socket.emit('createMessage',{from: 'ovenje@gmail.com',text: "how far u"},function(data){
//     console.log(data);
// });

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
        },
        function(data){
        console.log(data);
    });
});
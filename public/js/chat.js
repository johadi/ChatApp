/**
 * Created by ILYASANATE on 29/03/2017.
 */
var socket=io();

//function that performs the scrolling to bottom automatically as messages trickles in
function scrollToBottom(){
    //selectors
    var messages=jQuery('#messages');

    var newMessage=messages.children('li:last-child');

    //heights
    var clientHeight=messages.prop('clientHeight');
    var scrollTop=messages.prop('scrollTop');
    var scrollHeight=messages.prop('scrollHeight');
    var newMessageHeight=newMessage.innerHeight();
    var lastMessageHeight=newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight+ lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect',function(){
    var params=jQuery.deparam(window.location.search);//convert your url query string (i.e ?name=jo&age=20) to object

    socket.emit('join',params,function(err){//join a room by the username and room you choose
        if(err){
            alert(err);
            window.location.href='/';
        }else{
            console.log('all is working well');
        }
    })
});

socket.on('disconnect',function(){
    console.log('disconnected from server');
});

socket.on('updateUserList',function(usersList){//where active users are displayed
    var ol=jQuery('<ol></ol>');
    usersList.forEach(function(userList){
        ol.append(jQuery('<li></li>').text(userList));
    });
    jQuery('#users').html(ol);
    jQuery('#online').text('| online: '+usersList.length);
});

socket.on('newMessage',function(message){//where coming messages are appended
    var formattedTime=moment(message.createdAt).format('h:mm a');
    var template=jQuery('#message-template').html();
    var output=Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(output);
    scrollToBottom();
});

socket.on('newLocationMessage',function(message){//where user locations are appended
    var formattedTime=moment(message.createdAt).format('h:mm a');
    var template=jQuery('#location-message-template').html();
    var output=Mustache.render(template,{
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(output);
    scrollToBottom();
    // var li=jQuery('<li></li>');
    // var a=jQuery('<a target="_blank">My Current Location</a>');
    //
    // li.text(`${message.from} : ${formattedTime} `);
    // a.attr('href',message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
});
jQuery('#message-form').on('submit',function(e){//handles the message form field
    e.preventDefault();//prevents the form from reloading on submit

    var messageTextBox=jQuery('[name=message]');//get the message box id
    socket.emit('createMessage', {
        text: messageTextBox.val()
        },
        function(){
            messageTextBox.val('');//empty the message field once the user sent it
        }
        );
});

var locationButton=jQuery('#send-location');

locationButton.on('click',function(){//handles the location button using geolocation available in our browsers
    if(!navigator.geolocation){
        return alert('Geolocation not supported for your browser');
    }

    locationButton.attr('disabled','disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    },function(){
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location');
    })
});
$(document).ready(function() {


var socket = io.connect('http://localhost:3000', {'forceNew': true});

socket.on('messages', function (outputData) {

   console.log(outputData);
   $('#place_holder').append($('<li>').text(outputData));
   
   });


$('#send_but').click(function() {

        socket.emit('messages', $('#text_box').val());


      });


});//----jQuery
 

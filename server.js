var express = require('express'),
    mongo = require('mongodb'),
    mc = mongo.MongoClient,
    url = 'mongodb://localhost:27017/chat_data',
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);

//--------App Routes-----------//

app.use(express.static('public'));

app.get('/hello', function (req, res) {

	console.log('User online');
    res.status(200).send('hola');

});

//--------Server and client connection-----------//

io.on('connection', function (socket) {
	
	console.log('User in sockets');

    socket.on('messages', function (dataReceiver) {

       var emitData = dataReceiver;
        
        io.emit('messages', dataReceiver);

//--------Mongo DB connection-----------//   

var  chatData = {

    message: emitData

}; 


mc.connect(url, function (err, db) {

        if (err) {

            console.log('Error connecting to DB', err.code);

        } else {

            console.log('success connecting to DB');

     var userDb = db.collection('Users');

userDb.insert(chatData, function (err, records) {

          if (err) {
           
           console.log('Data was save succes but still one error to fix', err.code);

          } else {
              
              console.log('Success inserting to the DB');

          }

       });

   db.close();

  }

});//-------End mongoDB connection---//   

});//-------End sockets connection---//   

});//-------End sockets connection---//   

server.listen(3000, function() {

   console.log('Server listen at localhost:3000');

});


var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	request = require("request"),
	users = {};

app.use(express.static('public'))
server.listen(3000);


app.get('/',function(req,res){
	res.sendfile(__dirname + '/index.html');
});

// function makeRequest(data, socket.nickname) {
// 	if( /^[a-zA-Z( )]+$/.test( data )) data = data;
// 		else if ((data) == "") data = 'empty message';
// 		else data = 'empty message';
// 		var url = "http://noobg1.pythonanywhere.com/q/"+data, senti, sentiParsed

// 		request(url, function(error, response, body) {
// 			if(error) {
// 				console.log("Api call failed!")
// 				io.sockets.emit('new message',{msg : data, nick : socket.nickname, sentiment : ""});
// 			}
// 				else {
// 			 senti = JSON.parse(body)
// 			 sentiParsed = String(senti['result'])
// 			console.log(sentiParsed);
// 		  io.sockets.emit('new message',{msg : data, nick : socket.nickname, sentiment : sentiParsed});
// 		}
// 		});
// }

io.sockets.on('connection',function(socket){
	socket.on('new user',function(data, callback){
		if(data in users){
			callback(false);
		}else{
			callback(true);
			socket.nickname = data;
			users[socket.nickname] = socket;
			updateNicknames();
		}
	});

	socket.on('send message',function(data, callback){
		data = data.trim();
		if(data.substr(0,3) === '/w '){
			data = data.substr(3);
			let ind = data.indexOf(" ");
			if(ind != -1){
				let name = data.substring(0, ind);
				data = data.substring(ind + 1);
				if(name in users){
					users[name].emit('whisper',{msg : data, nick : socket.nickname} );
					//users[name].emit('whisper',{msg : data, nick : name } );
					console.log("whisper")
				}
				else {
					callback('Error! Enter valid User!');
				}
			}else {
				callback('Please enter a message!');
			}
		}else {
			if( /^[a-zA-Z( )]+$/.test( data )) data = data;
			else if ((data) == "") data = 'empty message';
			else data = 'empty message';
			var url = "http://noobg1.pythonanywhere.com/q/"+data, senti, sentiParsed

			request(url, function(error, response, body) {
				if(error) {
					console.log("Api call failed!")
					io.sockets.emit('new message',{msg : data, nick : socket.nickname, sentiment : ""});
				}
					else {
				senti = JSON.parse(body)
				sentiParsed = String(senti['result'])
				console.log(sentiParsed);
				io.sockets.emit('new message',{msg : data, nick : socket.nickname, sentiment : sentiParsed});
				}
			});
		}

	});

	function updateNicknames(){
		io.sockets.emit('usernames',Object.keys(users));
	}

	socket.on('disconnect',function(data){
		if(!socket.nickname) return;
		delete users[socket.nickname];
		updateNicknames();
	})

});
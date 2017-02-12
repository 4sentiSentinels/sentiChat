const express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	request = require('request'),
	mongoose = require('mongoose');
	users = {};

const bodyParser = require('body-parser')
const stringSimilarity = require('string-similarity');

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static('public'))
server.listen(3000);

mongoose.connect('mongodb://localhost/chat', function(error) {
	if(error){
		consoel.log(error);
	}	else {
		console.log('connected to db');
	}
});

let chatSchema = mongoose.Schema({
	nick: String,
	msg: String,
	created: {type: Date, default: Date.now}
});

let Chat = mongoose.model('Message', chatSchema);

function getUserMessages (docs) {
	let userMessages = [];
	var userSet = new Set();
	for(let iter = 0; iter < docs.length - 1; iter++){
		userSet.add(docs[iter].nick)
	}
	
	for( item of userSet) 
	{	var msg = ''
		for(jter = 0 ; jter < docs.length; jter++ )
		{
			if(item === docs[jter].nick){
				msg = msg + docs[jter].msg + ' ';
			}
		}
		userMessages.push({user: item, msg: msg})
	}
	console.log(userMessages)
	return userMessages;
}

app.get('/',function(req,res){
	res.sendfile(__dirname + '/index.html');
});

app.get('/match',function(req,res){
	let query = Chat.find({});
	let stats = [];
	query.sort('-created').exec(function(error, docs) {
		if(error) throw error;
		console.log('loaded');
		let userMessages = getUserMessages(docs);
		
		for( let iter = 0; iter < userMessages.length; iter++) {
			for( let jter = 0; jter < userMessages.length; jter++){
				console.log(userMessages[iter], userMessages[jter])
				if( userMessages[iter] !== undefined &&  userMessages[jter] !== undefined) {
					let polarity = stringSimilarity.compareTwoStrings(userMessages[iter].msg, userMessages[jter].msg);
					stats.push({ first : userMessages[iter].user, second: userMessages[jter].user,  polarity});
				}
					
			}
		}
		console.log(stats);
		res.render(__dirname + '/views/match', { stats: stats})
	});
	
	//res.sendfile(__dirname + '/match.html');
});


io.sockets.on('connection',function(socket){
	let query = Chat.find({});
	query.sort('-created').limit(4).exec(function(error, docs) {
		if(error) throw error;
		console.log('loaded');
		socket.emit('load old messages', docs);
	});

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
			let newMsg = new Chat({msg: data, nick: socket.nickname});
			newMsg.save(function(error) {
				if(error) throw error;
				if( /^[a-zA-Z0-9( )]+$/.test( data )) data = data;
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
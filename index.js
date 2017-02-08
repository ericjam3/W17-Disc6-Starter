var bodyParser = require('body-parser')
var express = require("express");
var fs = require("fs");
var path = require("path");

var messagesJs = require("./messages.js");
var Message = messagesJs.Message;
var messageDb = messagesJs.messageDb;

var app = express();
app.use(bodyParser.json());
app.use("/static", express.static("static"));

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "static/messenger.html"));
});

app.get("/api/v1/messages", function(req, res) {
	res.send(JSON.stringify({
		messages: messageDb.getMessages()
	}));
});

app.post("/api/v1/messages", function(req, res) {
	var message = new Message(req.body.username, req.body.content);
	messageDb.addMessage(message);
	res.send(JSON.stringify({}));
});

app.get("/test/messages", function(req, res) {
	const TEST_USER = "zuckmarkerberg";
	const TEST_MSG = "i've never used facebook";
	
	var testMessage = new Message(TEST_USER, TEST_MSG);
	if (testMessage.username !== TEST_USER || testMessage.content !== TEST_MSG) {
		throw new Error("Message object is incorrect!")
	}

	var msg_list = messageDb.getMessages();
	if (msg_list.length !== 0) {
		throw new Error("getMessages() is incorrect!");
	}

	messageDb.addMessage(testMessage);
	console.log(msg_list);
	msg_list = messageDb.getMessages();
	if (msg_list.length !== 1 || msg_list[0].username !== TEST_USER || msg_list[0].content !== TEST_MSG) {
		throw new Error("messageDb is incorrect!");
	}

	res.send("Message and messageDb are correct!");
});

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log("App listening at http://%s:%s", host, port);
});
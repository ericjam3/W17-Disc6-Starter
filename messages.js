module.exports = {
	Message: Message,
	messageDb: messageDb()
}

function Message(username, content) {
	this.username = username;
	this.content = content;
}

function messageDb() {
	var messages = [];

	return {
		addMessage: function(message){
			messages.push(message);
		},
		getMessages: function(){
			return messages;
		}
	}
}

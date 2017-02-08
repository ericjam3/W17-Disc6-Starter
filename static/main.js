function sendMessage() {
	// YOUR CODE HERE
}

function getMessages() {
	var messages;
	$.ajax("/api/v1/messages", {
		type: "GET",
		success: function(data, textStatus, jqXHR) {
			messages = JSON.parse(data).messages;
		}
	});

	writeToDOM(messages);
}

function writeToDOM(messages) {
	// YOUR CODE HERE

	// Scrolling down when we get a new message is annoying, so this'll just scroll down for you
	var messageDiv = document.getElementById("messages");
	messageDiv.scrollTop = messageDiv.scrollHeight;
}

$(function() {
	$("#message_form").submit(function(event) {
		event.preventDefault();
		sendMessage();
	});

	setInterval(getMessages, 250);
});
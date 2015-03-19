var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test_mongodb', function(err){
	if(err){
		console.error("Failed to connect to MongoDB");
		console.log(err);
	}
	else
		console.log("Successfully connection to MongoDB");
});

mongoose.connection.db.executeDbCommand({
			dropDatabase: 1
});

var testUser = function(){
	require('./tests/testUser.js');
};

var testEvent = function(){
	require('./tests/testEvent.js');
};

var testCommands = function(){
	require('./tests/testCommands.js');
};

var testLinkModels = function(){
	require('./tests/testLinkModels.js');
};

var testImage = function(){
	require('./tests/testImage.js');
};

var testTicket = function(){
	require('./tests/testTicket.js');
};

testUser();
testEvent();
testCommands();
testImage();
testTicket();
//testLinkModels();
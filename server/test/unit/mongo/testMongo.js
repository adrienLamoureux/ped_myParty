var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test_mongodb', function(err){
	if(err){
		console.error("Failed to connect to MongoDB");
		console.log(err);
	}
	else
	"Successfully connection to MongoDB";
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

var testLinkUserEventCommands = function(){
	require('./tests/testLinkUserEventCommands.js');
};

var testImage = function(){
	require('./tests/testImage.js');
};

testUser();
//testEvent();
//testCommands();
//testLinkUserEventCommands();
//testImage();
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

require('./tests/testUser.js');
require('./tests/testEvent.js');
require('./tests/testCommands.js');
require('./tests/testUserEvent.js');
require('./tests/testUserCommands.js');
require('./tests/testImage.js');
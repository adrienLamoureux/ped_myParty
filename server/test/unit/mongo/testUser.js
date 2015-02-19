var mongoose = require('mongoose');

describe('Create a instance of userModel', function() {
	
	beforeEach(function() {
		mongoose.connect('mongodb://localhost:27017/test_mongodb');
	});
	
	afterEach(function() {/*
		mongoose.connection.db.executeDbCommand({
			dropDatabase: 1
		}, function(err, result) {
			console.log(err);
			console.log(result);
			process.exit(0);
		});*/
	});

	it('launched ?', function() {
		console.log("first test !");
	});
});
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var userEvent = require('./../../../models.js').userEvent;
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
var mongo = require('mongodb').MongoClient;

console.log("Connecting to the database ...");

var checkDb = function(db){
	db.collection('userModel', function(err, userCollection){
		userCollection.find().toArray(function(err, userDocs){
			console.log('userDocs');
			console.log(userDocs);
		});
	});
	db.collection('eventModel', function(err, eventCollection){
		eventCollection.find().toArray(function(err, eventDocs){
			console.log('eventDocs');
			console.log(eventDocs[0]);
		});
	});
	db.collection('commandsModel', function(err, commandsCollection){
		commandsCollection.find().toArray(function(err, commandsDocs){
			console.log('commandsDocs');
			console.log(commandsDocs);	
		});
	});
	db.collection('ticketTypeModel', function(err, ticketTypeCollection){
		ticketTypeCollection.find().toArray(function(err, ticketTypeDocs){
			console.log('ticketTypeDocs');
			console.log(ticketTypeDocs);
		});
	});
};

mongo.connect('mongodb://localhost:27017/mongodb', function(err, db) {
	if (err) { console.log("\t--> Connection failure !\n"); return false; }
	console.log("\t--> Successfully connected to the database!\n");

	checkDb(db);
});
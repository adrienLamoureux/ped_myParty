var mongo = require('mongodb').MongoClient;

console.log("Connecting to the database ...");

var checkDb = function(db){
	db.collection('user', function(err, userCollection){
		userCollection.find().toArray(function(err, userDocs){
			console.log('userDocs');
			console.log(userDocs);
		});
	});
	db.collection('event', function(err, eventCollection){
		eventCollection.find().toArray(function(err, eventDocs){
			console.log('eventDocs');
			console.log(eventDocs);
		});
	});
	db.collection('commands', function(err, commandsCollection){
		commandsCollection.find().toArray(function(err, commandsDocs){
			console.log('commandsDocs');
			console.log(commandsDocs);	
		});
	});
	db.collection('img', function(err, imgCollection){
		imgCollection.find().toArray(function(err, imgDocs){
			console.log('imgDocs');
			console.log(imgDocs);	
		});
	});
	db.collection('ticket', function(err, ticketCollection){
		ticketCollection.find().toArray(function(err, ticketDocs){
			console.log('ticketDocs');
			console.log(ticketDocs);	
		});
	});
};

mongo.connect('mongodb://localhost:27017/mongodb', function(err, db) {
	if (err) { console.log("\t--> Connection failure !\n"); return false; }
	console.log("\t--> Successfully connected to the database!\n");

	checkDb(db);
});
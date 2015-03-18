var mongo = require('mongodb').MongoClient;

console.log("Connecting to the database ...");

var initTicket = function(db){
	console.log("Inserting new documents in 'ticket' ...");
	db.collection('ticket', function(err, collection) {
		collection.insert(
			[{
				userID: null,
				ownerID: null,
				eventID: null,
				ticketTypeID: null,
				expirationDate: '1524339270481',
				used: false
			}], function (err, result) {
			if (err) { console.log("\t--> Cannot insert documents in 'ticket'\n"); return false; }
			console.log("\t--> New documents have been added to 'ticket'!\n"+
				"\t    Collection length : "+result.length+'\n');
			console.log(JSON.stringify(result, null, 4));
			console.log("\nDatabase successfully initialized!");
		});
});
};

mongo.connect('mongodb://localhost:27017/mongodb', function(err, db) {
	if (err) { console.log("\t--> Connection failure !\n"); return false; }
	console.log("\t--> Successfully connected to the database!\n");

	initTicket(db);
});

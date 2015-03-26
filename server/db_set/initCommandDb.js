var mongo = require('mongodb').MongoClient;
var mongoAdress = require('./../../config.js').mongoAdress;

console.log("Connecting to the database ...");

var initCommands = function(db){
	console.log("Inserting new documents in 'commands' ...");
	db.collection('commands', function(err, collection) {
		collection.insert([{
			dateBuy: '1424339270481',
			totalAmount: null,
			eventTickets: [{
				eventID: null,
				tickets: null
			}],
			canceled: false,
			partiallyCanceled: false,
			charge_id: "",
			buy: false
		}], function (err, result) {
			if (err) { console.log("\t--> Cannot insert documents in 'commands'\n"); return false; }
			console.log("\t--> New documents have been added to 'commands'!\n"+
				"\t    Collection length : "+result.length+'\n');
			console.log(JSON.stringify(result, null, 4));
			console.log("\nDatabase successfully initialized!");
		});
	});
};

mongo.connect(mongoAdress, function(err, db) {
	if (err) { console.log("\t--> Connection failure !\n"); return false; }
	console.log("\t--> Successfully connected to the database!\n");

	initCommands(db);
});

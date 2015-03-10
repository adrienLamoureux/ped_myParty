var mongo = require('mongodb').MongoClient;

console.log("Connecting to the database ...");

var initUser = function(db){
	console.log("Inserting new documents in 'user' ...");
	db.collection('user', function(err, collection) {
		collection.insert([
			{
				apiID: 'swiPjk21RqmEPu21KVi84w',
				inscriptionDate: '1424339270481',
				eventsID: [],
				commandsID: null,
				basket : []
			}
			], function (err, result) {
			if (err) { console.log("\t--> Cannot insert documents in 'user'\n"); return false; }
			console.log("\t--> New documents have been added to 'user'!\n"+
				"\t    Collection length : "+result.length+'\n');
			console.log(JSON.stringify(result, null, 4));
			console.log("\nDatabase successfully initialized!");
		});
});
};

mongo.connect('mongodb://localhost:27017/mongodb', function(err, db) {
	if (err) { console.log("\t--> Connection failure !\n"); return false; }
	console.log("\t--> Successfully connected to the database!\n");

	initUser(db);
});

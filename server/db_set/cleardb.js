var mongo = require('mongodb').MongoClient;
var mongoAdress = require('./../../config.js').mongoAdress;

console.log("Connecting to the database ...");

var clearUser = function(db){
		db.collection('user', function(err, collection) {
		if (collection) {
			collection.remove({}, function(err,removed) {
				if (!removed) {
					console.log("\t--> collection could not be cleared!\n");
					throw err; return false; }
			});
		};
	});
};

var clearEvent = function(db){
		db.collection('event', function(err, collection) {
		if (collection) {
			collection.remove({}, function(err,removed) {
				if (!removed) {
					console.log("\t--> collection could not be cleared!\n");
					throw err; return false; }
			});
		};
	});
};

var clearCommands = function(db){
	db.collection('commands', function(err, collection) {
		if (collection) {
			collection.remove({}, function(err,removed) {
				if (!removed) {
					console.log("\t--> collection could not be cleared!\n");
					throw err; return false; }
			});
		};
	});
};

var clearImg = function(db){
	db.collection('img', function(err, collection) {
		if (collection) {
			collection.remove({}, function(err,removed) {
				if (!removed) {
					console.log("\t--> collection could not be cleared!\n");
					throw err; return false; }
			});
		};
	});
};

var clearTicket = function(db){
	db.collection('ticket', function(err, collection) {
		if (collection) {
			collection.remove({}, function(err,removed) {
				if (!removed) {
					console.log("\t--> collection could not be cleared!\n");
					throw err; return false; }
			});
		};
	});
};

mongo.connect(mongoAdress, function(err, db) {
	if (err) { console.log("\t--> Connection failure !\n"); return false; }
	console.log("\t--> Successfully connected to the database!\n");

	clearImg(db);
	clearCommands(db);
	clearUser(db);
	clearEvent(db);
	clearTicket(db);
});
var mongo = require('mongodb').MongoClient;

console.log("Connecting to the database ...");

var initUser = function(db){
		db.collection('user', function(err, collection) {
		if (collection) {
			collection.remove({}, function(err,removed) {
				if (!removed) {
					console.log("\t--> collection could not be cleared!\n");
					throw err; return false; }
			});
		};

		console.log("Inserting new documents in 'user' ...");

		collection.insert([
			{
				email: 'toto@gmail',
				password: 'toto',
				name: 'bob',
				firstName: 'bobby',
				phoneNumber: '00000000',
				inscriptionDate: new Date('Jun 20, 2014'),
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

var initEvent = function(db){
		db.collection('event', function(err, collection) {
		if (collection) {
			collection.remove({}, function(err,removed) {
				if (!removed) {
					console.log("\t--> collection could not be cleared!\n");
					throw err; return false; }
			});
		};

		console.log("Inserting new documents in 'event' ...");
		collection.insert([
			{
				ownerID: null,
				title: 'Great',
				description: 'Super party',
				country: 'France',
				county: 'Aquitaine',
				city: 'Bordeaux',
				zipCode: '33000',
				street: 'cours de la liberation', 
				image: 'http://www.designtour.fr/media/bordeaux-86613421.jpg',
				tickets: [],
				ticketsType: [],
				uniqueTicketID: 0,
				dateStarting: new Date('Jun 23, 2014'),
				dateEnding: new Date('Jun 24, 2014'),
				online: false
			}
			], function (err, result) {
			if (err) { console.log("\t--> Cannot insert documents in 'event'\n"); return false; }
			console.log("\t--> New documents have been added to 'event'!\n"+
						"\t    Collection length : "+result.length+'\n');
			console.log(JSON.stringify(result, null, 4));
			console.log("\nDatabase successfully initialized!");
		});
	});
};

var initTicket = function(db){
	db.collection('ticketType', function(err, collection) {
		if (collection) {
			collection.remove({}, function(err,removed) {
				if (!removed) {
					console.log("\t--> collection could not be cleared!\n");
					throw err; return false; }
			});
		};

	console.log("Inserting new documents in 'ticketType' ...");
		collection.insert([
			{
				description: 'ticket',
				ticketLeft: 5,
				sold: 0,
				price: 50,
				type: 'Prenium',
				image: 'http://www.designtour.fr/media/bordeaux-86613421.jpg'
			}
			], function (err, result) {
			if (err) { console.log("\t--> Cannot insert documents in 'ticketType'\n"); return false; }
			console.log("\t--> New documents have been added to 'ticketType'!\n"+
						"\t    Collection length : "+result.length+'\n');
			console.log(JSON.stringify(result, null, 4));
			console.log("\nDatabase successfully initialized!");
		});
	});
};

var initCommands = function(db){
	db.collection('commands', function(err, collection) {
		if (collection) {
			collection.remove({}, function(err,removed) {
				if (!removed) {
					console.log("\t--> collection could not be cleared!\n");
					throw err; return false; }
			});
		};
	console.log("Inserting new documents in 'commands' ...");
		collection.insert([
			{
				commands: [],
				dateBuy: new Date('Jun 22, 2014')
			}
			], function (err, result) {
			if (err) { console.log("\t--> Cannot insert documents in 'commands'\n"); return false; }
			console.log("\t--> New documents have been added to 'commands'!\n"+
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
	initCommands(db);
	initUser(db);
	initEvent(db);
});
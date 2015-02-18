var mongo = require('mongodb').MongoClient;

console.log("Connecting to the database ...");

var initUser = function(db){
		db.collection('userModel', function(err, collection) {
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
				events: [],
				commandsID: null,
				panner : []
			},
			{
				email: 'tata@gmail',
				password: 'tata',
				name: 'stalker',
				firstName: 'johny',
				phoneNumber: '00000000',
				inscriptionDate: new Date('Jun 20, 2014'),
				events: [],
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
		db.collection('eventModel', function(err, collection) {
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
				owner: null,
				description: 'Super party',
				country: 'France',
				county: 'Aquitaine',
				city: 'Bordeaux',
				zipCode: '33000',
				street: 'cours de la liberation', 
				image: 'http://www.designtour.fr/media/bordeaux-86613421.jpg',
				tickets: [],
				ticketSelled: 0,
				uniqueTicketID: 0,
				dateStarting: new Date('Jun 23, 2014'),
				dateEnding: new Date('Jun 24, 2014'),
				avaible: false
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
	db.collection('ticketTypeModel', function(err, collection) {
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
				selled: 0,
				price: 50,
				avaible: true,
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
	db.collection('commandsModel', function(err, collection) {
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

	/*initTicket(db);
	initCommands(db);
	initUser(db);
	initEvent(db);*/
});
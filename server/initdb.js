var mongo = require('mongodb').MongoClient;

console.log("Connecting to the database ...");

var initUser = function(db){
	console.log("Inserting new documents in 'user' ...");
	db.collection('user', function(err, collection) {
		collection.insert([
		{
			email: 'toto@gmail',
			password: 'toto',
			name: 'bob',
			firstName: 'bobby',
			phoneNumber: '00000000',
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

var initEvent = function(db){
	console.log("Inserting new documents in 'event' ...");
	db.collection('event', function(err, collection) {
		collection.insert([
			{
				ownerID: null,
				title: 'Great event 1',
				description: 'Super party',
				country: 'France',
				county: 'Aquitaine',
				city: 'Bordeaux',
				zipCode: '33000',
				street: 'cours de la liberation', 
				image: 'http://previews.123rf.com/images/gubh83/gubh830912/gubh83091200010/6032929-grunge-background-with-party-couple-silhouette-with-stars.jpg',
				tickets: [],
				ticketsType: [{
					uniqueID: 0,
					description: 'Short description',
					ticketLeft: 5,
					sold: 0,
					price: 50,
					type: 'Preminum',
					image: null
				},
				{
					uniqueID: 1,
					description: 'Long description',
					ticketLeft: 12,
					sold: 0,
					price: 50,
					type: 'Bouffon',
					image: null
				}
				],
				uniqueTicketID: 0,
				dateStarting: '1424339270481',
				dateEnding: '1524339270481',
				online: true
			},
			{
				ownerID: null,
				title: 'Great event 2 (out of date)',
				description: 'Super party',
				country: 'France',
				county: 'Aquitaine',
				city: 'Bordeaux',
				zipCode: '33000',
				street: 'cours de la liberation', 
				image: 'http://previews.123rf.com/images/gubh83/gubh830912/gubh83091200010/6032929-grunge-background-with-party-couple-silhouette-with-stars.jpg',
				tickets: [],
				ticketsType: [{
					uniqueID: 0,
					description: 'Short description',
					ticketLeft: 5,
					sold: 0,
					price: 50,
					type: 'Preminum',
					image: null
				}],
				uniqueTicketID: 0,
				dateStarting: '1424339270481',
				dateEnding: '1424339270481',
				online: true
			},
			{
				ownerID: null,
				title: 'Great event 3 (not online)',
				description: 'Super party',
				country: 'France',
				county: 'Aquitaine',
				city: 'Bordeaux',
				zipCode: '33000',
				street: 'cours de la liberation', 
				image: 'http://previews.123rf.com/images/gubh83/gubh830912/gubh83091200010/6032929-grunge-background-with-party-couple-silhouette-with-stars.jpg',
				tickets: [],
				ticketsType: [{
					uniqueID: 0,
					description: 'Short description',
					ticketLeft: 5,
					sold: 0,
					price: 50,
					type: 'Preminum',
					image: null
				}],
				uniqueTicketID: 0,
				dateStarting: '1424339270481',
				dateEnding: '1524339270481',
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

var initCommands = function(db){
	console.log("Inserting new documents in 'commands' ...");
	db.collection('commands', function(err, collection) {
		collection.insert([
		{
			commands: [],
			dateBuy: '1424339270481'
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

	initCommands(db);
	initUser(db);
	initEvent(db);
});
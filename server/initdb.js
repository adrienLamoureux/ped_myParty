var mongo = require('mongodb').MongoClient;

console.log("Connecting to the database ...");

var clearDb = function(collectionName){
	db.collection(collectionName, function(err, collection) {
		if (collection) { // 'quizz' collection exists, so clear it before filling
			collection.remove({}, function(err,removed) {
				if (!removed) {
					console.log("\t--> collection could not be cleared!\n");
					throw err; return false; }
			});
		}
	})
}

var insertUser = function(){
		console.log("Inserting new documents in 'user' ...");
		userModel.insert([
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
			}
			], function (err, result) {
			if (err) { console.log("\t--> Cannot insert documents in 'user'\n"); return false; }
			console.log("\t--> New documents have been added to 'user'!\n"+
						"\t    Collection length : "+result.length+'\n');
			console.log(JSON.stringify(result, null, 4));
			console.log("\nDatabase successfully initialized!");
		});
};

var insertEvent = function(){
		console.log("Inserting new documents in 'event' ...");
		eventModel.insert([
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
};

var insertTicket = function(){
	console.log("Inserting new documents in 'ticketType' ...");
		ticketTypeModel.insert([
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
};

var insertCommands = function(){
	console.log("Inserting new documents in 'commands' ...");
		commandsModel.insert([
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
};

mongo.connect('mongodb://localhost:27017/mongodb', function(err, db) {
	if (err) { console.log("\t--> Connection failure !\n"); return false; }
	console.log("\t--> Successfully connected to the database!\n");

	clearDb('userModel');
	clearDb('eventModel');
	clearDb('ticketTypeModel');
	clearDb('commandsModel');

	insertUser();
	insertEvent();
	insertTicket();
	insertCommands();

		
});
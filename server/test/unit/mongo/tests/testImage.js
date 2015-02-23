var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var eventModel = require('./../../../../models.js').eventModel;


describe('Test suite for image management', function() {
	
	beforeEach(function() {
		var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
		mongoclient.open(function(err, mongoclient) {
			var db = mongoclient.db("test_mongodb");
			db.collection('event', function(err, collection) {
				if (collection) {
					collection.remove({}, function(err,removed) {
					if (!removed) {
						console.log("\t--> collection could not be cleared!\n");
						throw err; return false; }
					});
					collection.insert([
					{
						ownerID: null,
						title: "Miku party",
						description: "Concert of vocaloid ^^",
						country: "Japan",
						county: "Dont't care",
						city: "Osaka",
						zipCode: "idk",
						street: "idk", 
						image: null,
						imageSmall: null,
						tickets: [],
						ticketsType: [{
							uniqueID: 0,
							description: "default ticket",
							ticketLeft: 50,
							sold: 0,
							price: 40,
							type: "normal",
							image: null
						}],
						uniqueTicketID: 0,
						dateStarting: null,
						dateEnding: null,
						online: false
					}
					], function (err, result) {})
				};
			});
		});
	});

	afterEach(function() {
		var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
		mongoclient.open(function(err, mongoclient) {
			var db = mongoclient.db("test_mongodb");
			db.collection('event', function(err, eventCollection){
				eventCollection.find().toArray(function(err, eventDocs){
					console.log('');
					console.log('End of a test');
					console.log(eventDocs);
				});
			});
		});
	});	


	it('add image to event', function(){
		
	});

	it('remove image to event', function(){
		
	});
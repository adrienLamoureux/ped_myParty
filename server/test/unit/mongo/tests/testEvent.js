var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var eventModel = require('./../../../../models.js').eventModel;


describe('Test suite for eventModel', function() {
	
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


	it('launched ?', function() {
		console.log("first test !");
	});


	it('find an event', function(){
		eventModel.find(function (err, coll) {
			expect(err).toBeNull();
			eventModel.findOne({_id: coll[0]._id}, function (err, result){
				expect(err).toBeNull();
				expect(result._id).toEqual(coll[0]._id);
			});
		});
	});


	it('find all events', function(){
		eventModel.find(function (err, coll) {
			expect(err).toBeNull();
			expect(coll.length).not.toEqual(0);
		});
	});


	it('inserting a new event', function(){
		var eventBody = {
			ownerID: null,
			title: "Miku party",
			description: "Concert of vocaloid ^^",
			country: "USA",
			county: "Dont't care",
			city: "NY",
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
		};

		newEvent = new eventModel(eventBody);
				
		expect(newEvent).not.toBeNull(); 
		
		newEvent.save(function(err, results) {
			expect(err).toBeNull();
			eventModel.findOne({_id: newEvent._id}, function (err, result) {
				expect(err).toBeNull();
				expect(result._id).toEqual(newEvent._id);
			});
		});
	});

	
	it('updating an event', function(){
		var eventBody = {
			ownerID: null,
			title: "Miku party",
			description: "Concert of vocaloid ^^",
			country: "Japan",
			county: "Dont't care",
			city: "Tokyo",
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
		};

		eventModel.find(function (err, coll) {
			eventModel.findOneAndUpdate({_id: coll[0]._id}, eventBody, function (err, result) {
				expect(err).toBeNull();
				console.log('result');
				console.log(result);
				expect(result.city).toBe('Tokyo');
			});
		});
	});


	it('remove an event', function(){
		eventModel.find(function (err, coll) {
			eventModel.remove({_id: coll[0]._id}, function (err, result){
				expect(err).toBeNull();
				eventModel.findOne({_id: coll[0]._id}, function (err, result){
					expect(err).toBeNull();
					expect(result).toBeNull();
				});
			});
		});
	});
});
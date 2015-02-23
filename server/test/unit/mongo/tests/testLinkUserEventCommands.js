var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var userModel = require('./../../../../models.js').userModel;
var eventModel = require('./../../../../models.js').eventModel;
var commandsModel = require('./../../../../models.js').commandsModel;


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
	db.collection('user', function(err, collection) {
		if (collection) {
			collection.remove({}, function(err,removed) {
			if (!removed) {
				console.log("\t--> collection could not be cleared!\n");
				throw err; return false; }
			});
			collection.insert([
			{
				email: 'toto@gmail',
				password: 'toto',
				name: 'bob',
				firstName: 'bobbyDEDEDE',
				phoneNumber: '00000000',
				inscriptionDate: '1424339270481',
				eventsID: [],
				commandsID: null,
				basket : []
			}
			], function (err, result) {})
		};
	});	
	db.collection('commands', function(err, collection) {
		if (collection) {
			collection.remove({}, function(err,removed) {
			if (!removed) {
				console.log("\t--> collection could not be cleared!\n");
				throw err; return false; }
			});
			collection.insert([
			{
				commands: 
				[
					{
						eventTickets: 
						[
							{
							eventID: null,
							tickets: 
							[
								{
									uniqueID: 0,
									userID: null,
									ticketTypeNb: 1,
									used: false
								}
							]
							}
						],
						dateBuy: null
					}
				]
			}
			], function (err, result) {})
		};
	});
});


describe('Test suite for user linked to event ', function() {

	beforeEach(function() {
		var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
		mongoclient.open(function(err, mongoclient) {
			var db = mongoclient.db("test_mongodb");
			db.collection('user', function(err, userCollection){
				userCollection.find().toArray(function(err, userDocs){
					db.collection('event', function(err, eventCollection){
						eventCollection.find().toArray(function(err, eventDocs){
							db.collection('commands', function(err, commandsCollection){
								commandsCollection.find().toArray(function(err, commandsDocs){

									eventCollection.update({_id:eventDocs[0]._id},{$set:{
										ownerID:userDocs[0]._id,
										tickets:[{
											uniqueID: eventDocs[0].uniqueTicketID,
											userID: userDocs[0]._id,
											ticketTypeNb: eventDocs[0].ticketsType[0].uniqueID,
											used: true
										}]
									}}, function(err, result){});
									
									userCollection.update({_id:userDocs[0]._id},{$set: {
										eventsID:[eventDocs[0]._id],
										commandsID:[commandsDocs[0]._id]
									}}, function(err, result){});
									
									commandsCollection.update({_id:commandsDocs[0]._id}, {$set: {
										commands: 
										[{
											eventTickets: 
											[
											{
												eventID: eventDocs[0]._id,
												tickets: [eventDocs[0].tickets[0]]
											}
											],
											dateBuy: '1424339270481'
										}]
									}}, function(err, result){});
								});
							});
						});
					});
				});
			});
		});
	});

	afterEach(function() {
		var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
		mongoclient.open(function(err, mongoclient) {
			var db = mongoclient.db("test_mongodb");
			db.collection('commands', function(err, commandsCollection){
				commandsCollection.find().toArray(function(err, commandsDocs){
					console.log('');
					console.log('End of a test');
					console.log(commandsDocs);
				});
			});
		});
	});

	it('find the owner event', function() {
		eventModel.find(function (err, coll) {
			expect(err).toBeNull();
			eventModel.findOne({_id: coll[0]._id}, function (err, event){
				expect(err).toBeNull();
				expect(event._id).toEqual(coll[0]._id);
				userModel.findOne({_id:event.ownerID}, function (err, user){
					expect(err).toBeNull();
					console.log('user')
					console.log(user)
					console.log('event')
					console.log(event)
					expect(user._id).toEqual(event.ownerID);
					expect(user.eventsID[0]).toEqual(event._id);
				});
			});
		});
	});

	it('find the event whose a user participated', function() {
		userModel.find(function (err, users) {
			expect(err).toBeNull();
			commandsModel.findOne({_id:users[0].commandsID}, function (err, commands){
				expect(err).toBeNull();
				expect(users[0].commandsID).toEqual(commands._id)
				eventModel.findOne({_id:commands.commands[0].eventTickets[0].eventID}, function (err, event){
					expect(err).toBeNull();
					expect(commands.commands[0].eventTickets[0].eventID).toEqual(event._id);
					expect(event.tickets[0].userID).toEqual(users[0]._id);
				});
			});
		});
	});
});




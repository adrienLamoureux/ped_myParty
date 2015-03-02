var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var userModel = require('./../../../../models.js').userModel;
var eventModel = require('./../../../../models.js').eventModel;
var commandsModel = require('./../../../../models.js').commandsModel;
var assert = require("assert");
var ObjectID = require('mongodb').ObjectID;

var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
mongoclient.open(function(err, mongoclient) {
	var db = mongoclient.db("test_mongodb");
	db.collection('event', function(err, collection) {
		if (collection) {
			collection.remove({}, function(err,removed) {
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

var linkData = function(done){
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
								done();
							});
						});
					});
				});
			});
		});
	});
};

describe('Test suite for user linked to event and commands', function() {

	it('starting test', function(done){
		linkData(done);
	});

	/*afterEach(function() {
		var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
		mongoclient.open(function(err, mongoclient) {
			var db = mongoclient.db("test_mongodb");
			db.collection('user', function(err, userCollection){
				console.log('');
				console.log('End of a test');
				userCollection.find().toArray(function(err, userDocs){
					console.log('userDocs');
					console.log(userDocs);
				});
			});
			db.collection('event', function(err, eventCollection){
				eventCollection.find().toArray(function(err, eventDocs){
					console.log('eventDocs');
					console.log(eventDocs);
				});
			});
			db.collection('commands', function(err, commandsCollection){
				commandsCollection.find().toArray(function(err, commandsDocs){
					console.log('commandsDocs');
					console.log(commandsDocs);	
				});
			});
		});
	});*/


	describe('finding test', function(){
		it('find the owner event', function(done) {
			eventModel.find(function (err, coll) {
				assert.equal(err, null);
				eventModel.findOne({_id: coll[0]._id}, function (err, event){
					assert.equal(err, null);
					assert.ok(event._id.equals(coll[0]._id));
					userModel.findOne({_id:event.ownerID}, function (err, user){
						assert.equal(err, null);
						assert.ok(user._id.equals(event.ownerID));
						assert.ok(user.eventsID[0].equals(event._id));
						done();
					});
				});
			});
		});

		it('find the event whose a user participated', function(done) {
			userModel.find(function (err, users) {
				assert.equal(err, null);
				commandsModel.findOne({_id:users[0].commandsID}, function (err, commands){
					assert.equal(err, null);
					assert.ok(users[0].commandsID.equals(commands._id));
					eventModel.findOne({_id:commands.commands[0].eventTickets[0].eventID}, function (err, event){
						assert.equal(err, null);
						assert.ok(commands.commands[0].eventTickets[0].eventID.equals(event._id));
						assert.ok(event.tickets[0].userID.equals(users[0]._id));
						done();
					});
				});
			});
		});
	});
});




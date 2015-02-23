var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var eventModel = require('./../../../../models.js').eventModel;
var assert = require("assert");
var ObjectID = require('mongodb').ObjectID;

var clearDb = function(done){
	var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db("test_mongodb");
		db.collection('event', function(err, collection) {
			if (collection) {
				collection.remove({}, function(err,removed) {
					done();
				});
			};
		});
	});
};

var insertDb = function(done){
	var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db("test_mongodb");
		db.collection('event', function(err, collection) {
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
			], function (err, result) {done();});
		});
	});
};

describe('Test suite for eventModel', function() {

	it('starting test', function(done){
		clearDb(done);
		insertDb(done);
	});

	/*afterEach(function() {
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
	});*/

	describe('finding test', function(){
		it('find an event', function(done){
			eventModel.find(function (err, coll) {
				assert.equal(err, null);
				eventModel.findOne({_id: coll[0]._id}, function (err, result){
					assert.equal(err, null);
					assert.ok(result._id.equals(coll[0]._id));
					done();
				});
			});
		});
		it('find all events', function(done){
			eventModel.find(function (err, coll) {
				assert.equal(err, null);
				assert.notEqual(coll.length,0);
				done();
			});
		});
	});
	

	describe('updating test', function(){
		it('inserting a new event', function(done){
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
					
			assert.notEqual(newEvent, null); 
			
			newEvent.save(function(err, results) {
				assert.equal(err, null);
				eventModel.findOne({_id: newEvent._id}, function (err, result) {
					assert.equal(err, null);
					assert.ok(result._id.equals(newEvent._id));
					done();
				});
			});
		});
		it('updating an event', function(done){
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
					assert.equal(err, null);
					assert.equal(result.city, 'Tokyo');
					done();
				});
			});
		});
		afterEach(function(done){
			clearDb(done);
			insertDb(done);
		});
	});
	
/*
	describe('deleting tests', function(){
		it('remove an event', function(){
			eventModel.find(function (err, coll) {
				eventModel.remove({_id: coll[0]._id}, function (err, result){
					assert.equal(err, null);
					eventModel.findOne({_id: coll[0]._id}, function (err, result){
						assert.equal(err, null);
						assert.equal(result, null);
					});
				});
			});
		});
		afterEach(function(){
			insertDb();
		});
	});
*/
	it('next', function(){
		//require('./testCommands.js');
	})
});
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var ticketModel = require('./../../../../models.js').ticketModel;
var assert = require("assert");
var ObjectID = require('mongodb').ObjectID;

var clearDb = function(done){
	var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db("test_mongodb");
		db.collection('ticket', function(err, collection) {
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
		db.collection('ticket', function(err, collection) {
			collection.insert([
			{
				userID: null,
				eventID: null,
				ticketTypeID: null,
				expirationDate: '1524339270481',
				used: false
			}
			], function (err, result) {done();});
		});
	});
};

describe('Test suite for ticketModel', function() {

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
		it('find a ticket', function(done){
			ticketModel.find().exec().then(function (coll) {
				ticketModel.findOne({_id: coll[0]._id}).exec().then(function (result){
					assert.ok(result._id.equals(coll[0]._id));
					done();
				}, function(failed){
					console.error(failed);
					done();
				});
			}, function(failed){
				console.error(failed);
				done();
			});
		});
		it('find all tickets', function(done){
			ticketModel.find().exec().then(function (coll) {
				assert.notEqual(coll.length,0);
				done();
			}, function(failed){
				console.error(failed);
				done();
			});
		});
	});
	

	describe('updating test', function(){
		it('inserting a new ticket', function(done){
			var ticketBody = {
				userID: null,
				eventID: null,
				ticketTypeID: null,
				expirationDate: '1524339270481',
				used: false
			};

			newTicket = new ticketModel(ticketBody);
					
			assert.notEqual(newTicket, null); 
			
			newTicket.save(function(err, results) {
				browser.sleep(500);
				assert.equal(err, null);
				ticketModel.findOne({_id: newTicket._id}).exec().then(function (result) {
					assert.ok(result._id.equals(newTicket._id));
					done();
				}, function(failed){
					console.error(failed);
					done();
				});
			});
		});

		it('updating a ticket', function(done){
			ticketModel.find().exec().then(function (coll) {
				ticketModel.update({_id: coll[0]._id}, {$set:{used:true}}, function (err, affected, result) {
					assert.equal(err, null);
					assert.equal(affected, 1);
					done();
				});
			}, function(failed){
				console.error(failed);
				done();
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
			ticketModel.find(function (err, coll) {
				ticketModel.remove({_id: coll[0]._id}, function (err, result){
					assert.equal(err, null);
					ticketModel.findOne({_id: coll[0]._id}, function (err, result){
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
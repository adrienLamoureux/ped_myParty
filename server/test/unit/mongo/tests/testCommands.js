var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var commandsModel = require('./../../../../models.js').commandsModel;
var assert = require("assert");
var ObjectID = require('mongodb').ObjectID;

var clearDb = function(done){
	var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db("test_mongodb");
		db.collection('commands', function(err, collection) {
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
		db.collection('commands', function(err, collection) {
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
			], function (err, result) {done();});
		});
	});
};

describe('Test suite for commandsModel', function() {

	it('starting test', function(done){
		clearDb(done);
		insertDb(done);
	});

	/*afterEach(function() {
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
	});*/


	describe('finding test', function(){
		it('find a commands', function(done){
			commandsModel.find(function (err, coll) {
				assert.equal(err, null);
				commandsModel.findOne({_id: coll[0]._id}, function (err, result){
					assert.equal(err, null);
					assert.ok(result._id.equals(coll[0]._id));
					done();
				});
			});
		});
		it('find all commands', function(done){
			commandsModel.find(function (err, coll) {
				assert.equal(err, null);
				assert.notEqual(coll.length,0);
				done();
			});
		});
	});

	describe('updating test', function(){
		it('inserting a new commands', function(done){
			var commandsBody = 
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
									uniqueID: 1,
									userID: null,
									ticketTypeNb: 5,
									used: false
								}
							]
							}
						],
						dateBuy: null
					}
				]
			};

			newCommands = new commandsModel(commandsBody);
					
			assert.notEqual(newCommands, null); 
			
			newCommands.save(function(err, results) {
				assert.equal(err, null);
				commandsModel.findOne({_id: newCommands._id}, function (err, result) {
					assert.equal(err, null);
					assert.ok(result._id.equals(newCommands._id));
					done();
				});
			});
		});

		
		it('updating an commands', function(done){
			var commandsBody = {
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
									used: true
								}
							]
							}
						],
						dateBuy: null
					}
				]
			};

			commandsModel.find(function (err, coll) {
				commandsModel.findOneAndUpdate({_id: coll[0]._id}, commandsBody,function (err, result) {
					assert.equal(err, null);
					assert.equal(result.commands[0].eventTickets[0].tickets[0].used, true);
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
		it('remove an commands', function(){
			commandsModel.find(function (err, coll) {
				commandsModel.remove({_id: coll[0]._id}, function (err, result){
					assert.equal(err, null);
					commandsModel.findOne({_id: coll[0]._id}, function (err, result){
						assert.equal(err, null);
						expect(result).toBeNull();
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
		//require('./testLinkUserEventCommands');
	});
});
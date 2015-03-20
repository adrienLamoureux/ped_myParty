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
			collection.insert([{
			commands:[{
				dateBuy: '1424339270481',
				totalAmount: null,
				eventTickets: [{
					eventID: null,
					tickets: null
				}],
				canceled: false,
				partiallyCanceled: false	
			}]
		}], function (err, result) {done();});
		});
	});
};

describe('Test suite for commandsModel', function() {

	it('starting test', function(done){
		clearDb(done);
		insertDb(done);
	});

	describe('finding test', function(){
		it('find a commands', function(done){
			commandsModel.find().exec().then(function (coll) {
				commandsModel.findOne({_id: coll[0]._id}).exec().then(function (result){
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
		it('find all commands', function(done){
			commandsModel.find().exec().then(function (coll) {
				assert.notEqual(coll.length,0);
				done();
			}, function(failed){
				console.error(failed);
				done();
			});
		});
	});

	describe('updating test', function(){
		it('inserting a new commands', function(done){
			var commandsBody = {
			commands:[{
				dateBuy: '1424339270481',
				totalAmount: null,
				eventTickets: [{
					eventID: null,
					tickets: null
				}],
				canceled: false,
				partiallyCanceled: false	
			}]
			};

			newCommands = new commandsModel(commandsBody);
					
			assert.notEqual(newCommands, null); 
			
			newCommands.save(function(err, results) {
				browser.sleep(500);
				assert.equal(err, null);
				commandsModel.findOne({_id: newCommands._id}).exec().then(function (result) {
					assert.ok(result._id.equals(newCommands._id));
					done();
				}, function(failed){
					console.error(failed);
					done();
				});
			});
		});

		
		it('updating an commands', function(done){
			var commandsBody = {
			commands:[{
				dateBuy: '1424339270482',
				totalAmount: null,
				eventTickets: [{
					eventID: null,
					tickets: null
				}],
				canceled: false,
				partiallyCanceled: false
			}]
			};
			commandsModel.find().exec().then(function (coll) {
				commandsModel.update({_id: coll[0]._id}, {$set:{commands:commandsBody}}, function (err, affected, result) {
					assert.equal(err, null);
					assert.equal(affected, 1);
					done();
				});
			},function(failed){
				console.error(failed);
				done();
			});
		});
		
		afterEach(function(done){
			clearDb(done);
			insertDb(done);
		});
	});
});
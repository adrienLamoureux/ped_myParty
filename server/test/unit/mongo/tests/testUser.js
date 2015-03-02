var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var userModel = require('./../../../../models.js').userModel;
var assert = require("assert");
var ObjectID = require('mongodb').ObjectID;

var clearDb = function(done){
	var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
	mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db("test_mongodb");
		db.collection('user', function(err, collection) {
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
		db.collection('user', function(err, collection) {
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
			], function (err, result) {done();});
		});
	});
};

describe('Test suite for userModel', function() {

	it('starting test', function(done){
		clearDb(done);
		insertDb(done);
	});

	/*afterEach(function() {
		var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
		mongoclient.open(function(err, mongoclient) {
			var db = mongoclient.db("test_mongodb");
			db.collection('user', function(err, userCollection){
				userCollection.find().toArray(function(err, userDocs){
					console.log('');
					console.log('End of a test');
					console.log(userDocs);
				});
			});
		});
	});	*/

	describe('finding tests', function(){
		it('find a user', function(done){
			userModel.find(function (err, coll) {
				assert.equal(err, null);
				userModel.findOne({_id: coll[0]._id}, function (err, result){
					assert.equal(err, null);
					assert.ok(result._id.equals(coll[0]._id));
					done();
				});
			});
		});
		it('find all users', function(done){
			userModel.find(function (err, coll) {
				assert.equal(err, null);
				assert.notEqual(coll.length, 0);
				done();
			});
		});
	});


	describe('updating tests', function(){
		it('inserting a new user', function(done){
			var userBody = {
				email:'toto@gmail',
				password: 'toto',
				name:'plop',
				firstName: 'bobby0000000',
				phoneNumber: '00000000',
				inscriptionDate: '1424339270481',
				eventsID: [],
				commandsID: null,
				basket: []
			};

			newUser = new userModel(userBody);
					
			assert.notEqual(newUser, null); 
			
			newUser.save(function(err, results) {
				assert.equal(err, null);
				userModel.findOne({_id: newUser._id}, function (err, result) {
					assert.equal(err, null);
					assert.ok(result._id.equals(newUser._id));
					done();
				});
			});
		});
		it('updating a user', function(done){
			var userBody = {
				email:'tata@gmail',
				password: 'toto',
				name:'plop',
				firstName: 'bobby0000000',
				phoneNumber: '00000000',
				inscriptionDate: '1424339270481',
				eventsID: [],
				commandsID: null,
				basket: []
			};

			userModel.find(function (err, coll) {
				userModel.findOneAndUpdate({_id: coll[0]._id}, userBody,function (err, result) {
					assert.equal(err, null);
					assert.equal(result.email, 'tata@gmail');
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
		it('remove a user', function(done){
			userModel.find(function (err, coll) {
				userModel.remove({_id: coll[0]._id}, function (err, result){
					assert.equal(err, null);
					userModel.findOne({_id: coll[0]._id}, function (err, result){
						assert.equal(err, null);
						assert.equal(result, null);
						done();
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
		//require('./testEvent.js');
	});
});
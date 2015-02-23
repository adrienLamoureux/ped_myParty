var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var userModel = require('./../../../../models.js').userModel;


describe('Test suite for userModel', function() {
	
	beforeEach(function() {
		var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
		mongoclient.open(function(err, mongoclient) {
			var db = mongoclient.db("test_mongodb");
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
		});
	});

	afterEach(function() {
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
	});	


	it('launched ?', function() {
		console.log("first test !");
	});


	it('find a user', function(){
		userModel.find(function (err, coll) {
			userModel.findOne({_id: coll[0]._id}, function (err, result){
				expect(err).toBeNull();
				expect(result._id).toEqual(coll[0]._id);
			});
		});
	});


	it('find all users', function(){
		userModel.find(function (err, coll) {
			expect(err).toBeNull();
			expect(coll.length).not.toEqual(0);
		});
	});


	it('inserting a new user', function(){
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
				
		expect(newUser).not.toBeNull(); 
		
		newUser.save(function(err, results) {
			expect(err).toBeNull();
			userModel.findOne({_id: newUser._id}, function (err, result) {
				expect(result._id).toEqual(newUser._id);
			});
		});
	});

	
	it('updating a user', function(){
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
				expect(err).toBeNull();
				expect(result.email).toBe('tata@gmail');
			});
		});
	});
	

	it('remove a user', function(){
		userModel.find(function (err, coll) {
			userModel.remove({_id: coll[0]._id}, function (err, result){
				expect(err).toBeNull();
				userModel.findOne({_id: coll[0]._id}, function (err, result){
					expect(err).toBeNull();
					expect(result).toBeNull();
				});
			});
		});
	});
});
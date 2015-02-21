var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var userModel = require('./../../../models.js').userModel;
var eventModel = require('./../../../models.js').eventModel;
var commandsModel = require('./../../../models.js').commandsModel;
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test_mongodb', function(err){
	if(err){
		console.error("Failed to connect to MongoDB");
		console.log(err);
	}
	else
	"Successfully connection to MongoDB";
});

mongoose.connection.db.executeDbCommand({
			dropDatabase: 1
});


describe('Create a instance of userModel', function() {
	
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
		});
	});
	
	it('updating a user', function(){

	});

	it('find a user', function(){

	});

	it('find all users', function(){
		
	});

});
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var commandsModel = require('./../../../../models.js').commandsModel;


describe('Test suite for commandsModel', function() {

	beforeEach(function() {
		var mongoclient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
		mongoclient.open(function(err, mongoclient) {
		var db = mongoclient.db("test_mongodb");	
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


	it('launched ?', function() {
		console.log("first test !");
	});


	it('find a commands', function(){
		commandsModel.find(function (err, coll) {
			expect(err).toBeNull();
			commandsModel.findOne({_id: coll[0]._id}, function (err, result){
				expect(err).toBeNull();
				expect(result._id).toEqual(coll[0]._id);
			});
		});
	});


	it('find all commands', function(){
		commandsModel.find(function (err, coll) {
			expect(err).toBeNull();
			expect(coll.length).not.toEqual(0);
		});
	});


	it('inserting a new commands', function(){
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
				
		expect(newCommands).not.toBeNull(); 
		
		newCommands.save(function(err, results) {
			expect(err).toBeNull();
			commandsModel.findOne({_id: newCommands._id}, function (err, result) {
				expect(err).toBeNull();
				expect(result._id).toEqual(newCommands._id);
			});
		});
	});

	
	it('updating an commands', function(){
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
				expect(err).toBeNull();
				expect(result.commands[0].eventTickets[0].tickets[0].used).toBe(true);
			});
		});
	});


	it('remove an commands', function(){
		commandsModel.find(function (err, coll) {
			commandsModel.remove({_id: coll[0]._id}, function (err, result){
				expect(err).toBeNull();
				commandsModel.findOne({_id: coll[0]._id}, function (err, result){
					expect(err).toBeNull();
					expect(result).toBeNull();
				});
			});
		});
	});
});
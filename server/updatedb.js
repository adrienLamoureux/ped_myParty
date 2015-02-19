var mongo = require('mongodb').MongoClient;

console.log("Connecting to the database ...");

var updateRefID = function(db){
	db.collection('user', function(err, userCollection){
		userCollection.find().toArray(function(err, userDocs){
			db.collection('event', function(err, eventCollection){
				eventCollection.find().toArray(function(err, eventDocs){
					db.collection('commands', function(err, commandsCollection){
						commandsCollection.find().toArray(function(err, commandsDocs){
							commandsCollection.update({_id:commandsDocs[0]._id}, {$set: {
								commands: [eventDocs[0]._id]}
							}, function(err, result){});
							
							userCollection.update({_id:userDocs[0]._id},{$set: {
								eventsID:[eventDocs[0]._id], commandsID:[commandsDocs[0]._id]}
							}, function(err, result){});
							
							eventCollection.update({_id:eventDocs[0]._id},{$set:{
								ownerID:userDocs[0]._id,
								tickets:[{
									uniqueID: eventDocs[0].uniqueTicketID,
									userID: userDocs[0]._id,
									ticketTypeNb: eventDocs[0].ticketsType[0].uniqueID,
									used: false
								}]
								}
							}, function(err, result){});
						});
					});
				});
			});
		});
	});
};

mongo.connect('mongodb://localhost:27017/mongodb', function(err, db) {
	if (err) { console.log("\t--> Connection failure !\n"); return false; }
	console.log("\t--> Successfully connected to the database!\n");

	updateRefID(db);
});
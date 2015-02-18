var mongo = require('mongodb').MongoClient;

console.log("Connecting to the database ...");

var updateRefID = function(db){
	db.collection('userModel', function(err, userCollection){
		userCollection.find().toArray(function(err, userDocs){
			db.collection('eventModel', function(err, eventCollection){
				eventCollection.find().toArray(function(err, eventDocs){
					db.collection('commandsModel', function(err, commandsCollection){
						commandsCollection.find().toArray(function(err, commandsDocs){
							db.collection('ticketTypeModel', function(err, ticketTypeCollection){
								ticketTypeCollection.find().toArray(function(err, ticketTypeDocs){
									
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
											ticketTypeID: ticketTypeDocs[0]._id,
											used: false
										}],
										ticketsType: ticketTypeDocs		
										}
									}, function(err, result){});
								});
							});
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
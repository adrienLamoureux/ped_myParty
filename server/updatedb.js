var mongo = require('mongodb').MongoClient;

console.log("Connecting to the database ...");

var updateRefID = function(db){
	db.collection('user', function(err, userCollection){
		userCollection.find().toArray(function(err, userDocs){
			db.collection('event', function(err, eventCollection){
				eventCollection.find().toArray(function(err, eventDocs){
					db.collection('commands', function(err, commandsCollection){
						commandsCollection.find().toArray(function(err, commandsDocs){
							db.collection('img', function(err, imgCollection){
								imgCollection.find().toArray(function(err, imgDocs){
									imgCollection.update({_id:imgDocs[0]._id}, {$set: {
										eventID: eventDocs[0]._id}
									}, function(err, result){});

									imgCollection.update({_id:imgDocs[2]._id}, {$set: {
										eventID: eventDocs[1]._id}
									}, function(err, result){});

									imgCollection.update({_id:imgDocs[1]._id}, {$set: {
										eventID: eventDocs[2]._id}
									}, function(err, result){});
									
									commandsCollection.update({_id:commandsDocs[0]._id}, {$set: {
										commands: [eventDocs[0]._id]}
									}, function(err, result){});
									
									userCollection.update({_id:userDocs[0]._id},{$set: {
										eventsID:[eventDocs[0]._id, eventDocs[1]._id,eventDocs[2]._id], commandsID:[commandsDocs[0]._id]}
									}, function(err, result){});
									
									eventCollection.update({_id:eventDocs[0]._id},{
										$set:{
											ownerID:userDocs[0].apiID,
											tickets:[{
												qRCodeUniqueID: eventDocs[0].uniqueTicketID,
												userID: userDocs[0].apiID,
												ticketTypeID: eventDocs[0].ticketsType[0].uniqueID,
												used: false
											}],
											ticketType:[{			
												uniqueID: 0,
												description: 'Ticket valide pour les 3 jours du festival',
												ticketLeft: 99999,
												sold: 1,
												price: 150,
												type: 'Pass 3 Jours',
												expirationDate: '1524339270481'
											}]
										}
									}, function(err, result){});

									eventCollection.update({_id:eventDocs[1]._id},{
										$set:{
											ownerID:userDocs[0].apiID
										}
									}, function(err, result){});

									eventCollection.update({_id:eventDocs[2]._id},{
										$set:{
											ownerID:userDocs[0].apiID
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
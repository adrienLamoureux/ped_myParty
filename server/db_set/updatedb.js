var mongo = require('mongodb').MongoClient;
var mongoAdress = require('./../../config.js').mongoAdress;

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
									db.collection('ticket', function(err, ticketCollection){
										ticketCollection.find().toArray(function(err, ticketDocs){

											imgCollection.update({_id:imgDocs[0]._id}, {
												$set: {
													eventID: eventDocs[0]._id
												}
											}, function(err, result){});

											imgCollection.update({_id:imgDocs[2]._id}, {
												$set: {
													eventID: eventDocs[1]._id
												}
											}, function(err, result){});

											imgCollection.update({_id:imgDocs[1]._id}, {
												$set: {
													eventID: eventDocs[2]._id
												}
											}, function(err, result){});
											
											userCollection.update({_id:userDocs[0]._id},{
												$set: {
													eventsID:[eventDocs[0]._id, eventDocs[1]._id, eventDocs[2]._id],
													commandsID:[commandsDocs[0]._id]
												}
											}, function(err, result){});
											
											eventCollection.update({_id:eventDocs[0]._id},{
												$set:{
													ownerID:userDocs[0].apiID,
													tickets:[ticketDocs[0]._id],
													ticketsType:[{			
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

											commandsCollection.update({_id:commandsDocs[0]._id}, {
												$set: {
													dateBuy: '1424339270481',
													totalAmount: 150,
													eventTickets: [{
														eventID: eventDocs[0]._id,
														tickets: ticketDocs[0]._id
													}],
													canceled: false,
													partiallyCanceled: false,
													charge_id: "",
													buy: false
												}
											}, function(err, result){});

											ticketCollection.update({_id:ticketDocs[0]._id}, {
												$set: {
													userID: userDocs[0].apiID,
													ownerID: userDocs[0].apiID,
													eventID: eventDocs[0]._id,
													ticketTypeID: eventDocs[0].ticketsType[0].uniqueID,
													expirationDate: '1524339270481',
													used: false,
													canceled: false
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
		});
	});
};

mongo.connect(mongoAdress, function(err, db) {
	if (err) { console.log("\t--> Connection failure !\n"); return false; }
	console.log("\t--> Successfully connected to the database!\n");

	updateRefID(db);

	console.log("\t--> update success!\n");
});
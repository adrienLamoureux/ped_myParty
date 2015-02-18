'use strict'

// Module dependencies.
var application_root = __dirname,
    express = require('express'), //Web framework
    path = require('path'), //Utilities for dealing with file paths
    bodyParser  = require('body-parser'),
    mongoose = require('mongoose');

//Create server
var app = express();

// Configure server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(application_root ,'../client/')));
//Show all errors in development

//Start server
var port = 4711;
app.listen(port, function () {
    'use strict'
    console.log('Express server listening on port %d in %s mode', port, app.settings.env)
});

mongoose.connect('mongodb://localhost:27017/mongodb', function(err){
	if(err){
		console.error("Failed to connect to MongoDB");
		console.log(err);
	}
	else
		"Successfully connection to MongoDB";
});


// Schema
var Schema = mongoose.Schema;

// Association ticket for event
var eventTicket = new Schema({
	eventID: {type: mongoose.Schema.Types.ObjectId, ref:'eventModel'},
	tickets: [ticketSchema]
})

var cmdSchema = new Schema({
	eventTickets: [eventTicket],
	dateBuy: Date
});

var commandsSchema = new Schema({
	commands: [cmdSchema]
});

// ticket sold to user for an event
var ticketSchema = new Schema({
	uniqueID: Number,
	userID: {type: mongoose.Schema.Types.ObjectId, ref:'userModel'},
	ticketTypeID: {type: mongoose.Schema.Types.ObjectId, ref:'ticketTypeModel'},
	used: {type: Boolean, default: false}
});

// Virtual ticket
var ticketTypeSchema = new Schema({
	description: String,
	ticketLeft: Number,
	sold: Number,
	price: Number,
	type: String,
	image: String
});

var userSchema = new Schema({
	email: String,
	password: String,
	name: String,
	firstName: String,
	phoneNumber: String,
	inscriptionDate: Date,
	eventsID: [{type: mongoose.Schema.Types.ObjectId, ref: 'eventModel'}],
	commandsID: {type: mongoose.Schema.Types.ObjectId, ref:'commandsModel'},
	basket : [cmdSchema]
});

var eventSchema = new Schema({
	ownerID: {type: mongoose.Schema.Types.ObjectId, ref:'userModel'},
	title: String,
	description: String,
	country: String,
	county: String,
	city: String,
	zipCode: String,
	street: String, 
	image: String,
	tickets: [ticketSchema],
	ticketsType: [ticketTypeSchema],
	uniqueTicketID: Number,
	dateStarting: Date,
	dateEnding: Date,
	online: {type: Boolean, default: false},
});

// Model

var userModel = mongoose.model('userModel', userSchema);
var eventModel = mongoose.model('eventModel', eventSchema);
var commandsModel = mongoose.model('commandsModel', commandsSchema);
var ticketTypeModel = mongoose.model('ticketTypeModel', ticketTypeSchema);


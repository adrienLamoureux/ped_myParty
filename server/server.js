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
app.use(express.static(path.join(application_root ,'../client/app/')));
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

var myAdress = mongoose.Schema({
	country: String,
	county: String,
	city: String,
	zipCode: String,
	street: String 
})

var userSchema = mongoose.Schema({
	email: String,
	password: String,
	name: String,
	firstName: String,
	phoneNumber: String,
	inscriptionDate: Date,
	events: [mongoose.Schema.Types.ObjectId]
});

var eventSchema = mongoose.Schema({
	owner: mongoose.Schema.Types.ObjectId,
	description: String,
	adress: myAdress,
	image: String,
	tickets: [ticketSchema],
	ticketSelled: Number,
	uniqueTicketID: Number,
	dateStarting: Date,
	dateEnding: Date,
	avaible: {type: boolean, default: true}
});

var commandsSchema = mongoose.Schema({
	commands: [cmdSchema],
	dateBuy: Date
});

var pannerSchema = mongoose.Schema({
	commands: [cmdSchema]
});

var cmdSchema = mongoose.Schema({
	eventID: mongoose.Schema.Types.ObjectId,
	tickets: [mongoose.Schema.Types.ObjectId]
});

var ticketSchema = mongoose.Schema({
	id: Number,
	userID: mongoose.Schema.Types.ObjectId,
	ticketTypeID: mongoose.Schema.Types.ObjectId
});

var ticketTypeSchema = mongoose.Schema({
	selled: Number,
	price: Number,
	avaible: {type:boolean, default:true},
	image: String
});



// Model

var userModel = mongoose.Model('userModel', userSchema);
var eventModel = mongoose.Model('eventModel', eventSchema);
var commandsModel = mongoose.Model('commandsModel' commandsSchema);
var ticketTypeModel = mongoose.Model('ticketTypeModel', ticketTypeSchema);
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
/*
var myAdress = new Schema({
	country: String,
	county: String,
	city: String,
	zipCode: String,
	street: String 
});
*/
var cmdSchema = new Schema({
	eventID: {type: mongoose.Schema.Types.ObjectId, ref:'eventModel'},
	tickets: [{type: mongoose.Schema.Types.ObjectId, ref:'userModel'}]
});
/*
var pannerSchema = new Schema({
	commands: [cmdSchema]
});
*/
var commandsSchema = new Schema({
	commands: [cmdSchema],
	dateBuy: Date
});

var ticketSchema = new Schema({
	id: Number,
	userID: {type: mongoose.Schema.Types.ObjectId, ref:'userModel'},
	ticketTypeID: {type: mongoose.Schema.Types.ObjectId, ref:'ticketTypeModel'}
});

var ticketTypeSchema = new Schema({
	selled: Number,
	price: Number,
	avaible: {type: Boolean, default:true},
	image: String
});

var userSchema = new Schema({
	email: String,
	password: String,
	name: String,
	firstName: String,
	phoneNumber: String,
	inscriptionDate: Date,
	events: [{type: mongoose.Schema.Types.ObjectId, ref: 'eventModel'}],
	commandsID: {type: mongoose.Schema.Types.ObjectId, ref:'commandsModel'},
//	panner: pannerSchema
	panner : [cmdSchema]
});

var eventSchema = new Schema({
	owner: {type: mongoose.Schema.Types.ObjectId, ref:'userModel'},
	description: String,
	//adress: myAdress,
	country: String,
	county: String,
	city: String,
	zipCode: String,
	street: String, 
	image: String,
	tickets: [ticketSchema],
	ticketSelled: Number,
	uniqueTicketID: Number,
	dateStarting: Date,
	dateEnding: Date,
	avaible: {type: Boolean, default: true}
});

// Model

var userModel = mongoose.model('userModel', userSchema);
var eventModel = mongoose.model('eventModel', eventSchema);
var commandsModel = mongoose.model('commandsModel', commandsSchema);
var ticketTypeModel = mongoose.model('ticketTypeModel', ticketTypeSchema);

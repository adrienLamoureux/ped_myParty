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
}, {collection: 'eventTicket'});

var cmdSchema = new Schema({
	eventTickets: [eventTicket],
	dateBuy: Date
}, {collection: 'cmd'});

var commandsSchema = new Schema({
	commands: [cmdSchema]
}, {collection: 'commands'});

// ticket sold to user for an event
var ticketSchema = new Schema({
	uniqueID: Number,
	userID: {type: mongoose.Schema.Types.ObjectId, ref:'userModel'},
	ticketTypeNb: Number,
	used: {type: Boolean, default: false}
}, {collection: 'ticket'});

// Virtual ticket
var ticketTypeSchema = new Schema({
	uniqueID: Number,
	description: String,
	ticketLeft: Number,
	sold: Number,
	price: Number,
	type: String,
	image: String
}, {collection: 'ticketType'});

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
}, {collection: 'user'});

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
	online: {type: Boolean, default: false}
}, {collection: 'event'});

// Model

var userModel = mongoose.model('user', userSchema);
var eventModel = mongoose.model('event', eventSchema);
var commandsModel = mongoose.model('commands', commandsSchema);

// Event

app.get('/api/event', function (req, res, next) {
  console.log('get events');
  eventModel.find(function (err, coll) {
    if (!err) {
        return res.send(coll);
    } else {
        console.log(err);
        next(err);
	}
  });
});

app.get('/api/event/:id', function (req, res, next) {
  console.log('get event '+req.params.id);
  eventModel.findOne({_id: req.params.id}, function (e, result) {
   	if (e) return next(e);
   		console.log(result);
    	res.send(result);
  });
});

app.post('/api/event', function (req, res, next){
	console.log('new event : '+req.body);
	var newEvent = new eventModel(req.body);
	newEvent.save(function (e, results){
        if (e) return next(e);
        res.send(results);
    });
});

app.put('/api/event:id', function (req, res, next)
{
  delete req.body._id; //duplicate id bug
  console.log('put event : '+req.body);
  eventModel.findOneAndUpdate({_id: req.params.id}, req.body, function (err, result){
    if (err) return next(err);
    res.send(result);
  });
});

app.delete('/api/event/:id', function (req, res, next)
{
	eventModel.remove({_id: req.params.id}, function (err, result){
		if (err) return next(err);
	});
});


// User

app.get('/api/user', function (req, res, next) {
  console.log('get users');
  userModel.find(function (err, coll) {
    if (!err) {
        return res.send(coll);
    } else {
        console.log(err);
        next(err);
	}
  });
});

app.get('/api/user/:id', function (req, res, next) {
  console.log('get user '+req.params.id);
  userModel.findOne({_id: req.params.id}, function (e, result) {
  	if (e) return next(e);
    res.send(result);
  });
});

app.post('/api/user', function (req, res, next){
	console.log('new user : '+req.body);
	var newUser = new userModel(req.body);
	newUser.save(function (e, results){
        if (e) return next(e);
        res.send(results);
    });
});

app.put('/api/user/:id', function (req, res, next)
{
  delete req.body._id; //duplicate id bug
  console.log('put user : '+req.body);
  userModel.findOneAndUpdate({_id: req.params.id}, req.body, function (err, result){
    if (err) return next(err);
    res.send(result);
  });
});

app.delete('/api/user/:id', function (req, res, next)
{
	userModel.remove({_id: req.params.id}, function (err, result){
		if (err) return next(err);
		res.send(result);
	});
});

/*
app.get('/api/usr/:id/event', function(req,res){
	console.log('get events for user : '+req.params.id);
	userModel.findOne({_id: req.params.id}, function (e, result){
		if(e) return next(e);
		for(var i=0; i<result.body.eventID.length; i++){
			eventModel.findOne({_id: req.params.id}, function(err, coll){

			});
		}
	})
})
*/


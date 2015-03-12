var mongoose = require('mongoose');

// Schema
var Schema = mongoose.Schema;

// Association ticket for event
var eventTicket = new Schema({
	eventID: {type: mongoose.Schema.Types.ObjectId, ref:'eventModel'},
	tickets: [{type: mongoose.Schema.Types.ObjectId, ref: 'ticketModel'}]
}, {collection: 'eventTicket'});

var cmdSchema = new Schema({
	dateBuy: Date,
	eventTickets: [eventTicket]
}, {collection: 'cmd'});

var commandsSchema = new Schema({
	commands: [cmdSchema]
}, {collection: 'commands'});

// ticket sold to user for an event
var ticketSchema = new Schema({
	userID: String,
	eventID: {type: mongoose.Schema.Types.ObjectId, ref:'eventModel'},
	ticketTypeID: Number,
	expirationDate: Date,
	used: {type: Boolean, default: false}
}, {collection: 'ticket'});

var imgSchema = new Schema({
	eventID: {type: mongoose.Schema.Types.ObjectId, ref: 'eventModel'},
	backgroundImg: {
		filetype: String,
		filename: String,
		filesize: Number,
		base64: String
	},
	ticketImg:{
		filetype: String,
		filename: String,
		filesize: Number,
		base64: String
	}
}, {collection:'img'});

// Virtual ticket
var ticketTypeSchema = new Schema({
	uniqueID: Number,
	description: String,
	ticketLeft: Number, // tickets restants
	sold: Number,  // tickets vendus
	price: Number,
	type: String,
	expirationDate: Date
}, {collection: 'ticketType'});

var userSchema = new Schema({
	apiID: String,
	photo: {
		filetype: String,
		filename: String,
		filesize: Number,
		base64: String
	},
	eventsID: [{type: mongoose.Schema.Types.ObjectId, ref: 'eventModel'}],
	commandsID: {type: mongoose.Schema.Types.ObjectId, ref:'commandsModel'},
	basket : [cmdSchema]
}, {collection: 'user'});

var eventSchema = new Schema({
	ownerID: String,
	title: String,
	description: String,
	country: String,
	county: String,
	city: String,
	zipCode: String,
	street: String, 
	imageSmall: {
		filetype: String,
		filename: String,
		filesize: Number,
		base64: String
	},
	tickets: [{type: mongoose.Schema.Types.ObjectId, ref: 'ticketModel'}],
	ticketsType: [ticketTypeSchema],
	dateStarting: Date,
	dateEnding: Date,
	online: {type: Boolean, default: false}
}, {collection: 'event'});

// Model

var userModel = mongoose.model('user', userSchema);
var eventModel = mongoose.model('event', eventSchema);
var commandsModel = mongoose.model('commands', commandsSchema);
var ticketModel = mongoose.model('ticket', ticketSchema);
var imageModel = mongoose.model('img', imgSchema);

module.exports = {
  userModel: userModel,
  eventModel: eventModel,
  commandsModel: commandsModel,
  ticketModel: ticketModel,
  imageModel: imageModel
};
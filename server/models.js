var mongoose = require('mongoose');

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
	qRCodeUniqueID: Number,
	userID: String,
	ticketTypeID: Number,
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
	ticketLeft: Number,
	sold: Number,
	price: Number,
	type: String,
	expirationDate: Date
}, {collection: 'ticketType'});

var userSchema = new Schema({
	apiID: String,
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
	tickets: [ticketSchema],
	ticketsType: [ticketTypeSchema],
	uniqueTicketID: Number, // pour la génération du QRCode
	dateStarting: Date,
	dateEnding: Date,
	online: {type: Boolean, default: false}
}, {collection: 'event'});

// Model

var userModel = mongoose.model('user', userSchema);
var eventModel = mongoose.model('event', eventSchema);
var commandsModel = mongoose.model('commands', commandsSchema);
var imageModel = mongoose.model('img', imgSchema);

module.exports = {
  userModel: userModel,
  eventModel: eventModel,
  commandsModel: commandsModel,
  imageModel: imageModel
};
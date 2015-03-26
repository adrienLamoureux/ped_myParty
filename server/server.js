'use strict'

var mongoAdress = require('./../config.js').mongoAdress;
var serverPort = require('./../config.js').serverPort;
var apiID = require('./../config.js').apiID;
var stripeKey = require('./../config.js').stripeKey;
var mailToContact = { mail : require('./../config.js').mailToContact };

// Module dependencies.
var application_root = __dirname,
	express = require('express'), //Web framework
	path = require('path'), //Utilities for dealing with file paths
	bodyParser  = require('body-parser'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	UserAppStrategy = require('passport-userapp').Strategy,
	stripe = require("stripe")(stripeKey);


var APP_ID = apiID;

//Create server
var app = express();

app.set('port', (process.env.PORT || serverPort));

// Configure server
app.use(bodyParser.json({limit:'16mb'}));
app.use(bodyParser.urlencoded({limit:'16mb', extended: true}));
app.use(express.static(path.join(application_root ,'../client/')));

//Start server
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

app.get('/', function(request, response) {
  response.send('Hello World!');
});

mongoose.connect(mongoAdress, function(err){
  if(err){
    console.error("Failed to connect to MongoDB");
    console.log(err);
  }
  else
    console.log("Successfully connection to MongoDB");
});


var userModel = require('./models.js').userModel;
var eventModel = require('./models.js').eventModel;
var commandsModel = require('./models.js').commandsModel;
var ticketModel = require('./models.js').ticketModel;
var imageModel = require('./models.js').imageModel;

app.post('/charge', function(request, res, next){
	var stripeToken = request.body.id;
	var mAmount = request.body.price;
	var user = request.body.user;

	var charge = stripe.charges.create({
		amount: mAmount, 
		currency: "eur",
		source: stripeToken,
		description: user
	}, function(err, charge) {
		if (err && err.type === 'StripeCardError') {
			console.log(JSON.stringify(err, null, 2));
		}
		else{
			res.send("Paiement effectué!", charge);
		}});
});


app.post('/refund', function(request, res, next){

	var charge_id = request.body.charge_id;
	var optionalAmount = request.body.optionalA;

	stripe.charges.createRefund(charge_id,{
		"amount": optionalAmount
	},function(err, refund) {
		if (err) {
			console.log(err);
			res.send(err)
		}else{
			res.send("Remboursement effectué"); 
		}
	});
});

/********* PASSPORT **********/
passport.use(new UserAppStrategy({
	appId: APP_ID
},
function (userprofile, done) {
	Users.findOrCreate(userprofile, function(err,user) {
		if(err) return done(err);
		return done(null, user);
	});
}
));

app.get('/api/contact', function (req, res, next) {
	return res.send(mailToContact);
});

// Event
app.get('/api/event', function (req, res, next) {
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
	eventModel.findOne({_id: req.params.id}, function (e, result) {
		if (e) return next(e);
		res.send(result);
	});
});

app.post('/api/event', function (req, res, next){
	var newEvent = new eventModel(req.body);
	newEvent.save(function (e, results){
		if (e) return next(e);
		userModel.findOne({apiID:results.ownerID}, function (e, user){
			if(e) return next(e);
			user.eventsID.push(results._id);
			userModel.update({_id:user._id}, {$set:{eventsID:user.eventsID}}, function (e, numberAffected, newUser){
				if(e) return next(e);
				res.send(newEvent);
			});
		});
	});
});

app.put('/api/event/:id', function (req, res, next){
	delete req.body._id; //duplicate id bug
	eventModel.findOneAndUpdate({_id: req.params.id}, req.body, function (err, result){
		if (err) return next(err);
		res.send(result);
	});
});

app.delete('/api/event/:id', function (req, res, next){
	eventModel.remove({_id: req.params.id}, function (err, result){
		if (err) return next(err);
	});
});

//images for an event
app.get('/api/event/:id/images', function (req, res, next) {
	imageModel.findOne({eventID: req.params.id}, function (e, result) {
		if (e) return next(e);
		res.send(result);
	});
});

app.post('/api/event/images', function (req, res, next){
	var newImage = new imageModel(req.body);
	newImage.save(function (e, results){
		if (e) return next(e);
		res.send(results);
	});
});

app.put('/api/event/:id/images', function (req, res, next){
	delete req.body._id; //duplicate id bug
	imageModel.findOneAndUpdate({_id: req.params.id}, req.body, function (err, result){
		if (err) return next(err);
		res.send(result);
	});
});

app.delete('/api/event/:id/images', function (req, res, next){
	imageModel.remove({_id: req.params.id}, function (err, result){
		if (err) return next(err);
	});
});

// User
app.get('/api/user', passport.authenticate('userapp'),
	function(req, res) {
		res.send({ user: req.user });
	});


app.get('/api/user/:id', function (req, res, next){
	userModel.findOne({apiID:req.params.id}, function (err, user){
		res.send(user);
	});
});


app.get('/api/user/:id/event', function (req, res, next){
	userModel.findOne({apiID:req.params.id}, function (err, user){
		eventModel.find({_id:{$in:user.eventsID}}, function (e, events){
			res.send(events);
		});
	});
});

app.get('/api/user/:id/command', function (req, res, next){
	userModel.findOne({apiID:req.params.id}, function (err, user){
		commandModel.findOne({_id:user.commandsID}, function (e, command){
			res.send(command);
		});
	});
});

app.post('/api/user', function (req, res, next){
	var newUser = new userModel(req.body);
	newUser.save(function (e, results){
		if (e) return next(e);
		res.send(results);
	});
});

app.put('/api/user/:id', function (req, res, next){
	delete req.body._id; //duplicate id bug
	userModel.findOneAndUpdate({apiID: req.params.id}, req.body, function (err, result){
		if (err) return next(err);
		res.send(result);
	});
});

app.delete('/api/user/:id', function (req, res, next){
	userModel.remove({apiID: req.params.id}, function (err, result){
		if (err) return next(err);
	});
});


// Ticket
app.get('/api/ticket/:id', function (req, res, next) {
	ticketModel.findOne({_id: req.params.id}, function (e, result) {
		if (e) return next(e);
		res.send(result);
	});
});

app.post('/api/ticket', function (req, res, next){
	var newTicket = new ticketModel(req.body);
	newTicket.save(function (e, results){
		if (e) return next(e);
		res.send(results);
	});
});

app.put('/api/ticket/:id', function (req, res, next){
	delete req.body._id; //duplicate id bug
	ticketModel.findOneAndUpdate({_id: req.params.id}, req.body, function (err, result){
		if (err) return next(err);
		res.send(result);
	});
});

app.delete('/api/ticket/:id', function (req, res, next){
	ticketModel.remove({_id: req.params.id}, function (err, result){
		if (err) return next(err);
	});
});

// Ticket cancel
app.get('/api/ticket/:id/cancel', function (req, res, next) {
	ticketModel.findOneAndUpdate({_id:req.params.id}, {$set:{canceled:true}}, function (err, result){
		if (err) return next(err);
		res.send(result);
	}); 
});

// Command
app.get('/api/command/:id', function (req, res, next) {
	commandsModel.findOne({_id: req.params.id}, function (e, result) {
		if (e) return next(e);
		res.send(result);
	});
});

app.post('/api/command', function (req, res, next){
	var newCommand = new commandsModel(req.body);
	newCommand.save(function (e, results){
		if (e) return next(e);
		res.send(results);
	});
});

app.put('/api/command/:id', function (req, res, next){
	delete req.body._id; //duplicate id bug
	commandsModel.findOneAndUpdate({_id: req.params.id}, req.body, function (err, result){
		if (err) return next(err);
		res.send(result);
	});
});

app.delete('/api/command/:id', function (req, res, next){
	commandsModel.remove({_id: req.params.id}, function (err, result){
		if (err) return next(err);
		res.send(result);
	});
});

/* Validation Ticket */
app.get('/api/:idOwner/event/:id/ticket/:idt/validate', function (req, res, next){
	var response = {valide: false, code: 200};
	ticketModel.findOne({_id:req.params.idt}, function (error, ticket){
		if (ticket.ownerID == req.params.idOwner){
			if (ticket.eventID == req.params.id){
				if(ticket.expirationDate > (new Date)){
					if (ticket.canceled == false){
						if(ticket.used == false){
							response.valide = true;
						} else {
							response.code = 405;
						};// Ajout du cas ou le ticket est déjà utilisé
					} else {
						response.code = 410;
					};
				} else {
					response.code = 412;
				};
			} else {
				response.code = 403;
			};
		} else {
			response.code = 401;
		};
		res.send(response);
	});
});

app.get('/api/:idOwner/event/:id/ticket/:idt/validate/:toValide', function (req, res, next){
	delete req.body._id; //duplicate id bug
	var response= {status: false}
	ticketModel.findOne({_id:req.params.idt}, function (error, ticket){
		if (ticket.ownerID == req.params.idOwner){
			if (ticket.eventID == req.params.id){
				if(ticket.used == false){
					ticket.used = true;
					ticketModel.update({_id:req.params.idt}, {$set:{used:ticket.used}}, function (err, numberAffected, raw){
						response.status = true;
						res.send(response);
					});
				};
			};
		};
	});
});

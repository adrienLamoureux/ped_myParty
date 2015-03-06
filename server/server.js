'use strict'

// Module dependencies.
var application_root = __dirname,
    express = require('express'), //Web framework
    path = require('path'), //Utilities for dealing with file paths
    bodyParser  = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
	UserAppStrategy = require('passport-userapp').Strategy;

var APP_ID = "54f5bfbac1eb6";

//Create server
var app = express();

// Configure server
app.use(bodyParser.json({limit:'16mb'}));
app.use(bodyParser.urlencoded({limit:'16mb', extended: true}));
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


var userModel = require('./models.js').userModel;
var eventModel = require('./models.js').eventModel;
var commandsModel = require('./models.js').commandsModel;
var imageModel = require('./models.js').imageModel;

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
        console.log(results);
       /* userModel.findOne({_id:results.ownerID}, function (e, user){
        	if(e) return;
        	console.log(user);
        	user.eventsID.push(results._id);
        	userModel.findOneAndUpdate({_id:user._id}, user, function (e, newUser){
        		if(e) return;
        		console.log(newUser);
        	});
        });*/
    });
});

app.put('/api/event/:id', function (req, res, next)
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

//images for an event
app.get('/api/event/:id/images', function (req, res, next) {
  console.log('get images '+req.params.id);
  imageModel.findOne({eventID: req.params.id}, function (e, result) {
    if (e) return next(e);
      console.log(result);
      res.send(result);
  });
});

app.post('/api/event/images', function (req, res, next){
  console.log('new images : '+req.body);
  var newImage = new imageModel(req.body);
  newImage.save(function (e, results){
        if (e) return next(e);
        res.send(results);
        console.log(results);
    });
});

app.put('/api/event/:id/images', function (req, res, next)
{
  delete req.body._id; //duplicate id bug
  console.log('put images : '+req.body);
  imageModel.findOneAndUpdate({_id: req.params.id}, req.body, function (err, result){
    if (err) return next(err);
    res.send(result);
  });
});

app.delete('/api/event/:id/images', function (req, res, next)
{
  imageModel.remove({_id: req.params.id}, function (err, result){
    if (err) return next(err);
  });
});


// User
app.get('/api/user', passport.authenticate('userapp'),
  function(req, res) {
    res.send({ user: req.user });
 });


app.get('/api/user/:id/event', function (req, res, next){
  console.log('get event of user '+req.params.id);
  userModel.findOne({apiID:req.params.id}, function (err, user){
    eventModel.find({_id:{$in:user.eventsID}}, function (e, events){
          console.log(events);
          res.send(events);
    });
  });
});

app.get('/api/user/:id/command', function (req, res, next){
	console.log('get command of user '+req.params.id);
  userModel.findOne({apiID:req.params.id}, function (err, user){
  	commandModel.findOne({_id:user.commandsID}, function (e, command){
  		console.log(command);
  		res.send(command);
  	});
  });
});

app.put('/api/user/:id', function (req, res, next)
{
	delete req.body._id; //duplicate id bug
  console.log('put user : '+req.body);
  userModel.findOneAndUpdate({apiID: req.params.id}, req.body, function (err, result){
    if (err) return next(err);
    res.send(result);
  });
});

app.delete('/api/user/:id', function (req, res, next)
{
	//delete user
});


// Command

app.get('/api/command', function (req, res, next){
	console.log('get commands');
	commandsModel.find(function (e, result){
		if (!err) {
        return res.send(coll);
    } else {
        console.log(err);
        next(err);
	}
	});
});

app.get('/api/command/:id', function (req, res, next) {
  console.log('get command '+req.params.id);
  commandsModel.findOne({_id: req.params.id}, function (e, result) {
  	if (e) return next(e);
    res.send(result);
  });
});

app.post('/api/command', function (req, res, next){
	console.log('new command : '+req.body);
	var newCommand = new commandsModel(req.body);
	newCommand.save(function (e, results){
        if (e) return next(e);
        res.send(results);
    });
});

app.put('/api/command/:id', function (req, res, next)
{
  delete req.body._id; //duplicate id bug
  console.log('put command : '+req.body);
  commandsModel.findOneAndUpdate({_id: req.params.id}, req.body, function (err, result){
    if (err) return next(err);
    res.send(result);
  });
});

app.delete('/api/command/:id', function (req, res, next)
{
	commandsModel.remove({_id: req.params.id}, function (err, result){
		if (err) return next(err);
		res.send(result);
	});
});

app.get('/api/event/:id/ticket/:idt/validate', function (req, res, next){
  eventModel.findOne({id: req.params.id}, function (err, result){
    if (e) return next(e);
    var index = result.tickets.map(function(e){return e.qRCodeUniqueID;}).indexOf(req.params.idt);
    if(index > -1){
      if(result.tickets[index].used == false){
        var indexV = result.ticketsType.map(function(e){return e.uniqueID}).indexOf(result.tickets[index].ticketTypeID);
        if(indexV > -1){
          if(result.ticketsType[indexV].expirationDate > (new Date)){
            res.send(true);
            return;
          };
        };
      };
    };
    res.send(false);
    return;
  });
});

app.put('/api/event/:id/ticket/:idt/validate', function (req, res, next){
  eventModel.findOne({id: req.params.id}, function (err, result){
    if (e) return next(e);
    var index = result.tickets.map(function(e){return e.qRCodeUniqueID;}).indexOf(req.params.idt);
    if(index > -1){
      if(result.tickets[i].used == false){
        result.tickets[i].used = true;
      };
    };
  });
});

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var morgan = require('morgan');

var app = express();

var boat = [];
var id = 0;

var updateId = function(req, req, next) {
	if (!req.body.id) {
		id++;
		req.body.id = id + '';
	}
	next();
};

// Global middleware
app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
	if (err) {
		res.status(500).send(error);
	}
});

app.param('id', function(req, res, next, id) {
	var boat = _.find(boats, { id: id });
	if (boat) {
		req.boat = boat;
		next();
	} else {
		res.send();
	}
});

//routes

// GET the entire boats collection
app.get('/boats', (req, res) => {
	res.json(boats);
});

//GET a boat record by its ID
app.get('/boats/:id', (req, res) => {
	res.json(boat || {});
});

//Add a new boat record to the collection
app.post('/boats', updateId, (req, res) => {
	var boat = req.body;
	boats.push(boat);
	res.json(boat);
});

//Update a particular boat record by its ID
app.put('/boats/:id', (req, res) => {
	var update = req.body;
	if (update.id) {
		delete update.id;
	}
	var boat = _.findIndex(boats, { id: req.params.id });
	if (!boats[boat]) {
		res.send();
	} else {
		var updateBoat = _.assign(boat[boat], update);
		res.json(updateBoat);
	}
});

//Delete a boat record by its ID
app.delete('/boats/id:', (req, res) => {
	var boat = _.findIndex(boats, { id: req.params.id });
	if (!boats[boat]) {
		res.send();
	} else {
		var deletedBoat = boats[boat];
		boats.splice(boat, 1);
		res.json(deletedBoat);
	}
});

app.listen(3000, () => {
	console.log('Listening on Port 3000');
});

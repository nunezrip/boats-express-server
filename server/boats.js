var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

var app = express();

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var boat = [];
var id = 0;

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
app.post('/boats', (req, res) => {
	var boat = req.body;
	id++;
	boat.id = id + '';
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
		var deletedBoat = boat[boat];
		boats.splice(boat, 1);
		res.json(deletedBoat);
	}
});

app.listen(3000, () => {
	console.log('Listening on Port 3000');
});

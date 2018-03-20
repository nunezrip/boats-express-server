var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

var app = express();

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var lions = [];
var id = 0;

// routes
app.get('/lions', (req, res) => {
	res.json(lions);
});
app.get('/lions/:id', (req, res) => {
	var lion = _.find(lions, { id: req.params.id });
	res.json(lion || {});
});

app.post('/lions', (req, res) => {
	var lion = req.body;
	id++;
	lion.id = id + '';

	lions.push(lion);

	res.json(lion);
});

app.put('/lions/id:', (req, res) => {
	var update = req.body;
	if (update.id) {
		delete update.id;
	}

	var lion = _.findIndex(lions, { id: req.params.id });
	if (!lions[lion]) {
		res.send();
	} else {
		var updateLion = _.assign(lion[lion], update);
		res.json(updateLion);
	}
});

app.delete('/lions/id:', (req, res) => {
	var lion = _.findIndex(lions, { id: req.params.id });
	if (!lions[lion]) {
		res.send();
	} else {
		var deletedLion = lions[lion];
		lions.splice(lion, 1);
		res.json(deletedLion);
	}
});

app.listen(3000, () => {
	console.log('Listening on Port 3000');
});

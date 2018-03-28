var lionRouter = require('express').Router();

const Lion = require('../models/lions');

// var lions = [];
// var id = 0;

// var updateId = function(req, res, next) {
// 	if (!req.body.id) {
// 		id++;
// 		req.body.id = id + '';
// 	}
// 	next();
// };

// lionRouter.param('id', function(req, res, next, id) {
// 	var lion = lions.find(lions => lion.id == id);

// 	if (lion) {
// 		req.lion = lion;
// 		next();
// 	} else {
// 		res.send();
// 	}
// });

// routes
lionRouter.get('/', (req, res) => {
	Lion.find((err, lions) => {
		if (err) {
			res.send(err);
		}
		// mongoose sends info back in json format
		res.send(lions);
	});
});

lionRouter.get('/:id', (req, res) => {
	console.log(req.params.id);
	Lion.findById(req.params.id, (err, lion) => {
		if (err) {
			res.send(err);
		}
		console.log(req.params.id);
		res.send(lion);
	});
});

lionRouter.post('/', (req, res) => {
	// receive the json Lion object
	const lionObj = new Lion({
		name: req.body.name,
		age: req.body.age,
		pride: req.body.pride,
		gender: req.body.gender,
	});
	console.log(lionObj);
	lionObj.save(err => {
		if (err) {
			res.send(err);
		}
		res.json({ message: 'Lion created' });
	});
});

lionRouter.put('/id:', (req, res) => {
	var update = req.body;
	if (update.id) {
		delete update.id;
	}

	var lion = _.findIndex(lions, { id: req.params.id });
	if (!lions[lion]) {
		res.send();
	} else {
		var updatedLion = Object.assign({}, lion[lion], update);
		res.json(updatedLion);
	}
});

lionRouter.delete('/id:', (req, res) => {
	var lion = lions.findIndex(lions => lion.id == req.params.id);
	if (!lions[lion]) {
		res.send();
	} else {
		var deletedLion = lions[lion];
		lions.splice(lion, 1);
		res.json(deletedLion);
	}
});

module.exports = lionRouter;

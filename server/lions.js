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
Lion.findById(releaseEvents.params.id, (err, lion) => {
	if(err) {
		res.send(err);
	}
	if(req.body.name){
		lion.name = req.body.name;
	}
	if(req.body.age){
		lion.age = req.body.age;
	}
	if(req.body.pride){
		lion.pride = req.body.pride;
	}
	if(req.body.gender){
		lion.gender = req.body.gender;
	}

	lion.save(err => {
		if(err){
			res.send(err);
		}
		res.json({message: 'Update the lion'});
	});
});
});

lionRouter.delete('/:id', (req,res) => {
	Lion.remove({_id:req.params.id}, (err, lion) => {
		if(err) {
			res.send(err);
		}
		res.json({message: 'Deleted the lion'});
	});
});

module.exports = lionRouter;

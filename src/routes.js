const { v4: uuidV4 } = require('uuid');
const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
	res.redirect(`/${uuidV4()}`);
});

router.get('/:room', (req, res) => {
	res.render('pages/room', {
		roomId: req.params.room
	});
});

module.exports = { router };

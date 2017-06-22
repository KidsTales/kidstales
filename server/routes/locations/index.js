const express = require('express');
const router = express.Router();

router.use(requireVerified);

/* GET home page. */
router.get('/', (req, res, next) => {
    req.db.Location.find()
        .exec()
        .then(locations => {
            res.locals.locations = locations;
            res.render('locations/index');
        })
        .catch(next);
});

router.post('/add', requireAdmin, (req, res, next) => {
    const name = req.body.name;
    const address = req.body.address;
    const description = req.body.description;

    const newLocation = new req.db.Location({
        name,
        address,
        description
    });

    newLocation.save()
        .then(l => {
            req.flash(`Added location ${l.name}`);
            res.redirect('/locations');
        })
        .catch(next);
});

module.exports = router;
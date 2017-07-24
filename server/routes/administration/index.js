const express = require('express');
const router = express.Router();

router.use(requireAdmin);

/* GET home page. */
router.get('/', (req, res, next) => {
    res.locals.pageTitle = 'Administration';
    res.render('administration/index');
});

router.get('/fundraising', (req, res, next) => {
    req.db.Funds.find()
        .exec()
        .then(fundsList => {
            res.locals.fundsList = fundsList;
            
            let total = 0;
            fundsList.forEach(f => total += f.amount);
            res.locals.total = total;

            res.locals.pageTitle = 'Overall Fundraising';
            res.render('administration/fundraising');
        })
        .catch(next);
});

module.exports = router;

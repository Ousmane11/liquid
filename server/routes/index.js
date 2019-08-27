const express = require('express');
const router = express.Router();
const User = require('../models/User')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/investments', (req, res, next) => {
  const investment = req.body
  User.findByIdAndUpdate(investment.id, { $push: { investments: investment.state } })
    .then(console.log('Investment correctly registered'))
    .catch(err => console.log(err))
})

router.get('/investments/:id', (req, res, next) => {
  console.log(req.params.id)
  User.findById(req.params.id)
    .then(response => res.json(response))
    .catch(err => console.log(err))
})

module.exports = router;

var express = require('express')
  , router = express.Router()
  , path   = require('path')
  , db = require('../db/team');



router.get('/get', (req, res) => {
    //db.getAll((err, models) => res.json({err, models}));
    db.getAll(req, res);
});


router.post('/add', (req,res) => {
    db.add(req.body, err => res.json({err}));
});

router.post('/update', (req,res) => {
    //db.update(req.body, (err, data) => res.json({err,data}));
    db.update(req, res);
});


router.post('/remove', (req,res) => {
    //db.remove( req.body.id, err => res.json({err}) );
    db.remove(req, res);
});


router.get('/team', (req,res) => {
    let desc = req.query.desc.trim().toLowerCase();

    db.get(desc, (err, model) => {
      res.json({err, model});
    });
});


module.exports = router;

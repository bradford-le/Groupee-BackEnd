var express = require('express');
var router = express.Router();

const Activity = require('../models/activity');  
//
// ────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: G E T   A C T I V I T Y   L I S T I N G S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────
//
router.get('/activity',(req,res,next)=>{
  Activity.find((err,activityList)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json(activityList);
  });
});
//
// ────────────────────────────────────────────────────────────────────────────────── II ──────────
//   :::::: C R E A T E   A   N E W   A C T I V I T Y : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────
//
// router.post('/activity',(req,res,next)=>{
//   const newActivity = new Activity({
//     host: req.body.host,
//     name: req.body.name,
//     payments_paid: req.body.payments_paid,
//     payments_received: req.body.payments_received,
//     members: req.body.members,
//     deadline: req.body.deadline,
//     state: req.body.state
//   });

//   newActivity.save((err)=>{
//     if(err){
//       res.json(err);
//       return;
//     }
//     res.json({
//       message: 'New Activity Created!',
//       id: newActivity._id
//     });
//   });
// });

router.post('/phones', (req, res, next) => {
  const thePhone = new Phone({
    brand: req.body.brand,
    name: req.body.name,
    specs: req.body.specs,
    image: req.body.image || ''
  });

  thePhone.save((err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'New Phone created!',
      id: thePhone._id
    });
  });
});



module.exports = router;
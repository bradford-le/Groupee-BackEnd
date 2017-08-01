var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Activity = require('../models/activity-model');  
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
router.post('/activity',(req,res,next)=>{
  const newActivity = new Activity({
    host: req.body.host,
    name: req.body.name,
    payments_paid: req.body.payments_paid,
    payments_received: req.body.payments_received,
    members: req.body.members,
    deadline: req.body.deadline,
    state: req.body.state
  });

  newActivity.save((err)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json({
      message: 'New Activity Created!',
      id: newActivity._id
    });
  });
});

//
// ────────────────────────────────────────────────────────────────────────────────── III ──────────
//   :::::: G E T   A   S I N G L E   A C T I V I T Y : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────
//
router.get('/activity/:id',(req,res,next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({message:'Specified id is not valid'});
  }

  Activity.findById(req.params.id,(err,theActivity)=>{
    if(err) {
      res.json(err);
      return;
    }
    res.json(theActivity);
  });
});
//
// ──────────────────────────────────────────────────────────────────────── IV ──────────
//   :::::: E D I T   A N   A C T I V I T Y : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────
//
router.put('/activity/:id',(req,res,next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.paramas.id)){
    res.status(400).json({message:"Specified id is not valid"});
  }

  const updates = {
    host: req.body.host,
    members: req.body.members
  };

  Activity.findByIdAndUpdate(req.params.id,upates,(err)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json({message: 'Activity updated successfully'});
  });
});

//
// ──────────────────────────────────────────────────────────────────────────── V ──────────
//   :::::: D E L E T E   A N   A C T I V I T Y : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────
//
router.delete('/activity/:id',(req,res,next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.paramas.id)){
    res.status(400).json({message:"Specified id is not valid"});
  }

  Activity.remove({_id: req.params.id},(err)=>{
    if(err){
      res.json({message: 'There is an error deleting!'});
      return;
    }
    return res.json({message:"Activity has been removed!"});
  });
});

module.exports = router;
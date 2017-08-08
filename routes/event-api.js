var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const groupeeEvent = require('../models/event-model');  

// ────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: G E T   E V E N T   L I S T I N G S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────
//

router.get('/event', (req,res,next)=>{
  console.log("user", req.user.username);
  groupeeEvent.find({'host' : req.user.username},(err,eventList)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json(eventList);
  });
});

//
// ────────────────────────────────────────────────────────────────────────────────── II ──────────
//   :::::: C R E A T E   A   N E W   E V E N T : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────
//
router.post('/event',(req,res,next)=>{
  const newEvent = new groupeeEvent({
    host: req.user.username,
    name: req.body.name,
    members: req.user._id,
    state: "OPEN"
  });

  newEvent.save((err)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json({
      message: 'New Event Created!',
      Eventid: newEvent._id,
      hostname: newEvent.host,
      name: newEvent.name,
      state: newEvent.state,
      members: newEvent.members
    });
  });
});
  
// ────────────────────────────────────────────────────────────────────────────────── III ──────────
//   :::::: G E T   A   S I N G L E   E V E N T : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────
//
router.get('/event/:id',(req,res,next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({message:'Specified id is not valid'});
  }

  groupeeEvent.findById(req.params.id,(err,theEvent)=>{
    if(err) {
      res.json(err);
      return;
    }
    res.json(theEvent);
  });
});

//
// ──────────────────────────────────────────────────────────────────────── IV ──────────
//   :::::: E D I T   A N   E V E N T : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────
//
router.put('/event/:id',(req,res,next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({message:"Specified id is not valid"});
  }

  const updates = {
    host: req.body.host,
    name: req.body.name,
    members: req.body.members,
    state: req.body.state
  };

  groupeeEvent.findByIdAndUpdate(req.params.id,updates,(err)=>{
    if(err){
      res.json(err);
      return;
    }
    res.json({message: 'Activity updated successfully'});
  });
});

// ──────────────────────────────────────────────────────────────────────────── V ──────────
//   :::::: D E L E T E   A N   E V E N T : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────
//
router.delete('/event/:id',(req,res,next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({message:"Specified id is not valid"});
  }

  groupeeEvent.remove({ _id: req.params.id},(err)=>{
    if(err){
      res.json({message: 'There is an error deleting!'});
      return;
    }
    return res.json({message:"Event has been removed!"});
  });
});

module.exports = router;
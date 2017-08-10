var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const groupeeEvent = require('../models/event-model');  
const Item = require('../models/items-model');
const User = require('../models/user-model');
const PaymentProcessor = require('../payment/paymentProcessor');

processor = new PaymentProcessor();

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
    state: "OPEN",
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
    groupeeEvent.findById(theEvent._id)
     .populate('items')
     .populate('members')
     .exec(function(err, newEvent) {
      if (err){ return next(err); }
      res.json(newEvent);
    });    
  });
});
//
// ──────────────────────────────────────────────────────────────────────── IV ──────────
//   :::::: U P D A T E   A N   E V E N T : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────
//
router.put('/event/:id',(req,res,next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({message:"Specified id is not valid"});
  }

  const updates = {
    name: req.body.name,
    state: req.body.state,
  };

  // ['open', 'request', 'closed']

  groupeeEvent.findByIdAndUpdate(req.params.id,updates,(err)=>{
    if(err){
      res.json(err);
      return;
    }

    if (state === 'request') {
  

      // Find out how much each has to pay









      // 
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
//
// ────────────────────────────────────────────────────────────── VI ──────────
//   :::::: C R E A T E   A N   I T E M : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────
//
router.post('/event/:eventId/items', (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.eventId)){
    res.status(400).json({message:'Specified id is not valid'});
  }

    let eventId = req.params.eventId;
    let user = req.user._id;
    let username = req.user.username;

    const newItem = new Item({
      eventid: eventId,
      userid: user,
      username: username,
      amount: req.body.amount,
      description: req.body.description
    });

    newItem.save((err,item)=> {
      if(err){
        res.json(err);
        return;
      }
      groupeeEvent.findByIdAndUpdate(eventId,{$push:{items: item._id}},{new: true},(err,theEvent)=>{
        if(err) {
          res.json(err);
          return;
        }
        console.log("new Event",theEvent);
    
        res.json({
          message: 'New Item Created!',
          theEvent
        });
      });
    });
});

router.delete('/events/:eventId/items/:id',(req,res,next) => {
  // Find event by eventId and owner
  // Find item
  // Delete item
  // Pop from event.items and save it
});

module.exports = router;
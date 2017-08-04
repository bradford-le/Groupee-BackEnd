var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
const paypal = require('paypal-rest-sdk');

const Activity = require('../models/activity-model');


router.get('/paypal-test',function(req,res){
  var url = require('url');
  var url_parts = url.parse(req.url,true);
  var query = url_parts.query;
  console.log("request",query);
  res.send("test OK");

  var paymentId = req.query.paymentId;
  var payerId = { payer_id: req.query.PayerID };
  
  paypal.payment.execute(paymentId, payerId, function(error, payment){
    if(error){
      console.error(JSON.stringify(error));
    } else {
      if (payment.state == 'approved'){
        console.log('payment completed successfully');
      } else {
        console.log('payment not successful');
      }
    }
  });

});


router.put('/events/:id', function(req, res) {
  // has the status been changed?
  // yes, it's wip

  // calculate who is paying what?
  // store it in payments
  /* => {
    brad: 10,
    tair: 15
  }*/
});

router.post('/event/:event_id/payment/:id', function(req, res) {
  // find the user from request
  // find the event by given id
  // grab the payment id, payer, and payee
  // create paypal payment
  // fill return url
  // return approval URL
});

router.put('/event/:event_id/payments/:id', function() {
  // mark as paid only if.... // 
});


router.get('/paypalfull',function(req,res){

  var payReq = JSON.stringify({
    intent:'sale',
    payer:{
      payment_method:'paypal'
    },
    redirect_urls:{
      return_url:'http://localhost:3000/api/paypal-test',
      cancel_url:'http://localhost:3000/cancel'
    },
    transactions:[{
      item_list: {
        items: [{
            "name": "Brad Test",
            "sku": "Dinner",
            "price": "100.00",
            "currency": "USD",
            "quantity": 1
        }]  
    },
      amount:{
        total:'100',
        currency:'USD'
      },
      payee: {
        email: 'tair@gmail.com'
      },
      description:'This is the payment transaction description.'
    }]
  });

paypal.payment.create(payReq, function(error, payment){
  var links = {};

  if(error){
    console.error(JSON.stringify(error));
  } else {
    // Capture HATEOAS links
    payment.links.forEach(function(linkObj){
      links[linkObj.rel] = {
        href: linkObj.href,
        method: linkObj.method
      };
      console.log(links);
    })

    // If redirect url present, redirect user
    if (links.hasOwnProperty('approval_url')){
      console.log(links['approval_url'].href);
        res.redirect(links['approval_url'].href);
      //REDIRECT USER TO links['approval_url'].href
    } else {
      console.error('no redirect URI present');
    }
  }
});
});

module.exports = router;
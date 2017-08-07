var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
const paypal = require('paypal-rest-sdk');

const Activity = require('../models/activity-model');

//
// ────────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: R E D I R E C T   U R L   F O R   P A Y P A L   E X E C U T E : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────────
//
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
// ──────────────────────────────────────────────────────────── II ──────────
//   :::::: T A I R   N O T E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────
//
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

// ──────────────────────────────────────────────────────────────────────────────────── III ──────────
//   :::::: F U L L   P A Y P A L   S I M U L A T I O N : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────
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

//
// ────────────────────────────────────────────────────────────────────────────────────────────── IV ──────────
//   :::::: B A T C H   P A Y P A L   P A Y   S I M U L A T I O N : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────
router.get('/batch',(req,res)=>{

  var sender_batch_id = Math.random().toString(36).substring(9);

  var create_payout_json = {
    "sender_batch_header": {
        "sender_batch_id": sender_batch_id,
        "email_subject": "You have a payment"
    },
    "items": [
        {
            "recipient_type": "EMAIL",
            "amount": {
                "value":1.00,
                "currency": "USD"
            },
            "receiver": "tair@gmail.com",
            "note": "Thank you.",
            "sender_item_id": "item_1"
        },
        {
            "recipient_type": "EMAIL",
            "amount": {
                "value": 2.00,
                "currency": "USD"
            },
            "receiver": "groupee@gmail.com",
            "note": "Thank you.",
            "sender_item_id": "item_2"
        },
        {
            "recipient_type": "EMAIL",
            "amount": {
                "value": 3.00,
                "currency": "USD"
            },
            "receiver": "arnau@gmail.com",
            "note": "Thank you.",
            "sender_item_id": "item_3"
        },
        {
          "recipient_type": "EMAIL",
          "amount": {
              "value": 4.00,
              "currency": "USD"
          },
          "receiver": "brad.le444-buyer@gmail.com",
          "note": "Thank you.",
          "sender_item_id": "item_4"
      }
    ]
  };

  paypal.payout.create(create_payout_json, function (error, payout) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log("Create Payout Response");
          console.log(payout);
      }
  });
});

// ────────────────────────────────────────────────────────────────────────────────────── V ──────────
//   :::::: G E T   B A T C H   P A Y O U T   S T A T U S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────

router.get('/batchstatus',(req,res)=>{

  var payoutId = "KYGNT75DKSLLQ";
  
  paypal.payout.get(payoutId, function (error, payout) {
      if (error) {
          console.log(error);
          throw error;
      } else {
          console.log("Get Payout Response");
          console.log(payout);
      }
  });
});

module.exports = router;
"use strict";
var paypal = require('paypal-rest-sdk');
require('../config/paypal');
var express = require('express');
var router = express.Router();


// ────────────────────────────────────────────────────────────────── I ──────────
//   :::::: B U I L D   P A Y M E N T : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────
//
var payment = JSON.stringify({
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
          "price": "10.00",
          "currency": "USD",
          "quantity": 1
      }]  
  },
    amount:{
      total:'10',
      currency:'USD'
    },
    payee: {
      email: 'arnau@gmail.com'
    },
    description:'This is the payment transaction description.'
  }]
});

paypal.payment.create(payment, function (error, payment) {
  if (error) {
    console.log(error);
  } else {
    if(payment.payer.payment_method === 'paypal') {
      req.session.paymentId = payment.id;
      var redirectUrl;
      for(var i=0; i < payment.links.length; i++) {
        var link = payment.links[i];
        if (link.method === 'REDIRECT') {
          redirectUrl = link.href;
        }
      }
      res.redirect(redirectUrl);
    }
  }
});
// paypal.payment.create(payReq, function(error, payment){
//   var links = {};

//   if(error){
//     console.error(JSON.stringify(error));
//   } else {
//     // Capture HATEOAS links
//     payment.links.forEach(function(linkObj){
//       links[linkObj.rel] = {
//         href: linkObj.href,
//         method: linkObj.method
//       };
//       console.log(links);
//     })

//     // If redirect url present, redirect user
//     if (links.hasOwnProperty('approval_url')){
//       console.log(links['approval_url'].href);
//       router.get('/', (req,res,next)=>{
//         res.redirect(links['approval_url'].href);
//       })
//       //REDIRECT USER TO links['approval_url'].href
//     } else {
//       console.error('no redirect URI present');
//     }
//   }
// });

// var paymentId = req.query.paymentId;
// var payerId = { payer_id: req.query.PayerID };

// paypal.payment.execute(paymentId, payerId, function(error, payment){
//   if(error){
//     console.error(JSON.stringify(error));
//   } else {
//     if (payment.state == 'approved'){
//       console.log('payment completed successfully');
//     } else {
//       console.log('payment not successful');
//     }
//   }
// });

module.exports = router;
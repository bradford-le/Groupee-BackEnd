var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/paypal-test',function(req,res){
//   console.log("reqeust",req.params);
//   res.send("test OK");
// })
module.exports = router;

var paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id':'ARnbU6kvql9Ar5UwWDtlsLvT3ya7PDpqC5IXEdOqlKa_qQONzuZsUugBL_Fkgt-R3BnEDxhGRyHa9EHi',
  'client_secret': 'ENzTMuR3xqazZrNYjddY97CUZC0wF4htUGN5Qpw7XbVXwNa3tPYI8pVsvW7C4Ul54buiG7QyJ4tFWkqY',
  'headers' : {
  'custom': 'header'
  }
});

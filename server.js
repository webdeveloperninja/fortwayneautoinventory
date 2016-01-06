
var http = require('http');
var path = require('path');
var fs = require('fs');
var util = require('util');
var bodyParser = require('body-parser');
var express = require('express');
var request = require('request');
var twitterActions = require('./twitter-actions.js');
var zlib = require("zlib");
var jsonfile = require('jsonfile');
var md5 = require('md5');

var router  = express();
var server  = http.createServer(router);


router.use(express.bodyParser());

router.use(express.static(path.resolve(__dirname, 'client')));
router.use(bodyParser.json({}));
router.use(express.methodOverride());
var jsonfile = require('jsonfile')
var schedule = require('node-schedule');

   // auto tweet schedule 
var j;

function scrapeToJson() {

  


var accountId = '1b7b2d3a-ca61-494e-a4b4-7725944f4ce8';
var apiKey = '64b5d3eeb68bce928327a4504';
var accessKey = md5(accountId + apiKey);
request({
    headers: {
      'X-CloudScrape-Access': accessKey,
      'X-CloudScrape-Account': '1b7b2d3a-ca61-494e-a4b4-7725944f4ce8',
      'Accept': 'application/json',
      'Accept-Encoding': 'none',
      'Host': 'app.cloudscrape.com',
      'User-Agent': 'YourApp/1.0',
    },
    uri: 'https://app.cloudscrape.com/api/executions/971e228f-68ae-4e16-a6fd-f80252469ac3/result',
    method: 'GET'
  }, function (err, res) {
      if( !err ) {
        var inventory = JSON.parse(res.body);
        
        var file = './tmp/data.json'
        var obj = inventory;
         
        jsonfile.writeFile(file, obj, function (err) {
          console.error(err)
        });
      
     
        
       } else {
         console.log(err);
       }
    });  
}

scrapeToJson();

function getRandomAuto(randomAutoCB) {
  request("https://www.kimonolabs.com/api/3s61ivpi?apikey=lX3W4VtMHDadOJolVR09OBbxp1dqV1HG", 
  function(err, response, body) {
    if(!err){
      //console.log(body);
      var autos =  JSON.parse(body);
      autos = autos.results.collection1;
      // Save Autos to Database
      // saveAutos(autos);
      var randomAutoIndex = Math.floor(Math.random() * (autos.length - 0) + 0);
      var randomAuto = autos[randomAutoIndex];
      //console.log(randomAuto);
      randomAutoCB(randomAuto);
    } else {
      console.log(err);
    }
  }
)};

// Return inventory
router.get('/inventory', function(req, response) {


var accountId = '1b7b2d3a-ca61-494e-a4b4-7725944f4ce8';
var apiKey = '64b5d3eeb68bce928327a4504';
var accessKey = md5(accountId + apiKey);
request({
    headers: {
      'X-CloudScrape-Access': accessKey,
      'X-CloudScrape-Account': '1b7b2d3a-ca61-494e-a4b4-7725944f4ce8',
      'Accept': 'application/json',
      'Accept-Encoding': 'none',
      'Host': 'app.cloudscrape.com',
      'User-Agent': 'YourApp/1.0',
    },
    uri: 'https://app.cloudscrape.com/api/executions/971e228f-68ae-4e16-a6fd-f80252469ac3/result',
    method: 'GET'
  }, function (err, res) {
      if( !err ) {
        var inventory = JSON.parse(res.body);
        console.log(inventory);
        
        var file = './tmp/data.json'
        var obj = inventory;
         
        response.json(obj);
         
        jsonfile.writeFile(file, obj, function (err) {
          console.error(err)
        });
      
     
        
       } else {
         console.log(err);
       }
    });  
});


// post auto and message tweet
router.post('/tweet-auto', function(req, res) {
  console.log(req.body);
  var tweetText = 'Check out this home! ' + req.body.address;
  console.log(tweetText);
  twitterActions.twitterActions.tweet(tweetText, 'http://yooleku.co/wp-content/uploads/2015/12/picture-of-simple-house-luxury-with-images-of-picture-of-collection-at-gallery.jpg', function() {
      res.status(200).send('OK');
    });
});

// Set cron job 
router.post('/set-auto-tweet', function(req, res) {
  var autoTweet = req.body;

  if ( autoTweet.value == true ) {
    // save value in config file
      console.log('set timer');
      if (j) {
        j.cancel();
      }
      j = schedule.scheduleJob('*/1 * * * *', function(){
        // tweet random car
        
        // Tweet with pre loaded text getRandomTweetText()
        var tweetText = twitterActions.twitterActions.getRandomTweetText();
        // get random car
        getRandomAuto(function(randomAuto) {
          //console.log(randomAuto);
          twitterActions.twitterActions.tweet(tweetText, randomAuto.carThumbnail.src,function() {
            console.log('Tweet Successfull');
            //res.status(200).send('OK');
          });
        });
      });
    res.status(200).send('OK');
  } else { 
    // save value in config file
    
    // destroy time 
    if (j) {
      j.cancel();
    } 
    console.log('No Auto Twitter');
    res.status(200).send('OK');
  }
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  //console.log("Chat server listening at", addr.address + ":" + addr.port);
});

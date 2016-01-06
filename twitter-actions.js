var request = require('request');
var Twitter = require('node-twitter');
var fs = require('fs');
var twitterSettings = require('./twitter-settings.js').settings();
var twitterRestClient = new Twitter.RestClient(
     twitterSettings.ConsumerKeyApiKey,
     twitterSettings.ConsumerSecretApiSecret,
     twitterSettings.AccessTokenKey,
     twitterSettings.AccessTokenSecret
);
var twitterActions = {
    tweet : function(tweetText, ImgUrl, tweetCB) {
    
    var download = function(uri, filename, callback){
      request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);
    
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    
    download(ImgUrl, 'img/auto.png', function(){

      twitterRestClient.statusesUpdateWithMedia(
          {
              'status': tweetText,
              'media[]': 'img/auto.png'
          },
          function(error, result) {
              if (error)
              {
                  console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
              }
       
              if (result)
              {
                  console.log(result);
              }
          }
      );
    });
    

  console.log('twitter');
  console.log(tweetText);
  console.log(ImgUrl);
  
  tweetCB();
  },
    getRandomTweetText: function() {
  
      var randomTweetTexts = [
        'Check out this awesome car',
        'Need a new car? Check it out!',
        'Bring in the new year with this new car',
        'This wont last long!',
        'We just got this swet new ride.'
      ];
      
      var randomTweetIndex = Math.floor(Math.random() * (randomTweetTexts.length - 0)) + 0;
    
      
      var tweetText = randomTweetTexts[randomTweetIndex];
      
      return tweetText;
    }
}
module.exports.twitterActions = twitterActions;
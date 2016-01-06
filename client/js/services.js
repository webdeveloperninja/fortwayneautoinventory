app.factory('InventoryFactory', function($http) {
    return{
          getInventory  : function() {
            return $http({
                url: '/inventory',
                method: 'GET'
              });
          }
      }
});

app.factory('TweetFactory', function($http) {
    return {
        tweet : function(tweet){
            tweet = JSON.stringify(tweet);
            console.log(tweet);
            return $http({
                url: '/tweet-auto',
                method: 'POST', 
                data: tweet
            });
        }
    }

});

app.factory('SettingsFactory', function($http) {
    return {
        setAutoTweetSetting : function(autoTweetSetting) {
            console.log(autoTweetSetting);
            return $http({
                url: '/set-auto-tweet', 
                method: 'POST',
                data: autoTweetSetting
            });
        },
          getTweetSettings  : function() {
            return $http({
                url: '/tweet-settings',
                method: 'GET'
              });
          }
    }
});
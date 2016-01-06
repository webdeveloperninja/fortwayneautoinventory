
app.controller('InventoryController', function($scope, InventoryFactory, $http, TweetFactory, SettingsFactory) {
    InventoryFactory.getInventory().success(function(data) {
        console.log(data);
        $scope.inventoryHeaders = data.headers;
        $scope.data = data.rows;
    });
    
    SettingsFactory.getTweetSettings().success(function(data) {
        $scope.autoTweeting = data;
        $("[name='auto-tweet']").bootstrapSwitch({
          state: $scope.autoTweeting
        });
    });
    
    // Set Auto Tweeting
    $scope.$watch('autoTweeting', function(newValue, oldValue) {
        console.log(newValue);
        // change server tweet setting flag variable
        var autoSettings = {
            value: newValue
        }
        SettingsFactory.setAutoTweetSetting(autoSettings);
    });
    
    
    $scope.customTweetSet = [];
    $scope.customTweetValue = [];
    
    $scope.tweetAuto = function(autoIndex) {
        var auto = {};
        auto.address =  $scope.data[autoIndex][14];
        console.log(auto);
		if ( $scope.customTweetSet[autoIndex] == undefined ) {
			$scope.customTweetSet[autoIndex] = false;
		}
        
        if ( $scope.customTweetSet[autoIndex] == false ) {
            // Tweet with Default Tweet Text
            TweetFactory.tweet(auto).success(function() {
                alert('Successfully Tweeted');
            });
        } else {
            // Tweet With Custom Tweet Text
            auto.message = $scope.customTweetValue[autoIndex];
            TweetFactory.tweet(auto).success(function() {
                $scope.customTweetValue[autoIndex] = '';
                alert('Successfully Tweeted');
            });
        }
        
        //console.log(auto);
        // Build Tweet Text Auto
    }
    
    $scope.tweetRandomAuto = function() {
        $http({
                url: '/tweet-random-auto',
                method: 'GET'
            });
    }
});

app.controller('WelcomeController', function($scope) {
    
});

app.controller('HomeController', function($scope) {
    
});
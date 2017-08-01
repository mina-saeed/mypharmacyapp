var myApp = angular.module('starter',['ionic']);

myApp.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
});
myApp.controller('timerCtrl', function($scope, $timeout) {
	$scope.myTimer= 60;
	var myTimerVariable;
	$scope.myCustomTimer = function() {
		$scope.myTimer--;
		if($scope.myTimer == 0) {
			$timeout.cancel(myTimerVariable);
		}
		myTimerVariable = $timeout($scope.myCustomTimer, 1000); // 1000 seconds
	}
	$scope.start = function() {
	    myTimerVariable = $timeout($scope.myCustomTimer, 1000); // 1000 seconds
	}
});
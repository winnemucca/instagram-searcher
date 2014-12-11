angular.module('myApp',['ngAnimate']).
controller('searchCtrl',function($http,$scope,$timeout,$q) {

	function wait() {
		var defer = $q.defer();
		$timeout(function() {
			defer.resolve();
		}, 2000);
			return defer.promise;
	}

	function notify() {
		$scope.searching = true;
		return wait().then(function() {
			$scope.searching = false;
		});
	}

	$scope.search = function() {
		// message that will pop up when i am searching use ng-if
		$scope.searching = true;

		var url = "https://api.instagram.com/v1/tags/" + $scope.tag + "/media/recent"

		var request = {
			callback: 'JSON_CALLBACK',
			client_id: "807658e04dda40e89a0d21aaad9d8121"
		}
		// the $http service provides get,post,delete services from cross domain using a promise api

		$http({
			method:'JSONP',
			url: url,
			params: request
		}).
		success(function(response) {
			$scope.result=response.data;
		}).
		
		}).
		error(function()  {
			// $scope.api_error= true;
			console.log('error');
		})

	};

});








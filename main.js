angular.module('myApp', ['ngAnimate'])
	.controller('searchCtrl', function($scope, $http, $timeout, $q) {
		$scope.search = function(input) {

			if ($scope.searchTag.$valid) {
		
			$scope.searching = true

			// had a hard time getting all of the url correct
			
			var url = "https://api.instagram.com/v1/tags/" + $scope.tag + "/media/recent"
			

			var request = {
				// this is required for $http json
				callback: "JSON_CALLBACK",
				client_id: "807658e04dda40e89a0d21aaad9d8121"
			}
			// the http serivice provides get/post/delete and put requests for corsss domain
			$http({
				// JSONP IS REQUIRED $http
            method: 'JSONP',
            url: url,
            params: request
	        }).
	        success(function(resp) {
	        	$scope.results = resp.data;
	        	console.log('data');
	        	// ************* .wait() vs .then(wait).then(function)**************

	        	wait().then(function(){
	        		// message shows up for 1 second then goes back into hiding as $scope.searching changes back to false and so does scope.submitted
	        		$scope.searching = false;	
	        		$scope.completed = true;
	        		$scope.submitted = false;
	        		console.log($scope.result);
	        	})
	        }).
	        error(function() {
	            // $scope.api_error = true;
	            alert('error');
	        })
	    	};

	    	// is this standard code.  others seem to have done theirs the exact same way
	        function wait() {
	        	var defer = $q.defer()
	        	$timeout(function() {
	        		var searching = true;
	        		defer.resolve();
	        	}, 500);
	        	return defer.promise;
	        }
		}
		$scope.reset = function() {
	        	$scope.searchTag.$setPristine();

	    }
	})



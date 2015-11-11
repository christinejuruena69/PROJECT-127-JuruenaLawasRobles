'use strict';

(function(){
	angular
		.module("app")
		.controller("HomeCtrl",HomeCtrl); //this is a part of a module called app (yung nasa taas)
	HomeCtrl.$inject = ["$scope"]; // angularjs na property 
	//HomeCtrl may dependencies or gagamit ng other modules/services 
	//angularsj construct
	//$scope =angularjs service na parang require

	function HomeCtrl($scope){
		$scope.instructors=["maam betel", "sir reg", "maam lanie"];

	}
})();
// Anonymouse function

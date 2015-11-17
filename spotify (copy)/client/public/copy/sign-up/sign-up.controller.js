'use strict';

(function(){
	angular
		.module("app")
		.controller("SignUpCtrl",SignUpCtrl); //this is a part of a module called app (yung nasa taas)
	SignUpCtrl.$inject = ["$scope"]; // angularjs na property 
	//HomeCtrl may dependencies or gagamit ng other modules/services 
	//angularsj construct
	//$scope =angularjs service na parang require
	//

	function SignUpCtrl($scope){

	}
})();
// Anonymouse function

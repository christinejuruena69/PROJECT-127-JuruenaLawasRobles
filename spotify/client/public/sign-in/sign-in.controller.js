'use strict';

(function(){
	angular
		.module("app")
		.controller("SignInCtrl",SignInCtrl); //this is a part of a module called app (yung nasa taas)
	SignInCtrl.$inject = ["$scope", "SignInService"]; // angularjs na property 
	//HomeCtrl may dependencies or gagamit ng oth,er modules/services 
	//angularsj construct
	//$scope =angularjs service na parang require
	//


	function SignInCtrl($scope, SignInService){
		

	}
})();
// Anonymouse function

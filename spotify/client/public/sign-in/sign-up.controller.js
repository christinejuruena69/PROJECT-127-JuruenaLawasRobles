'use strict';

(function(){
	angular
		.module("app")
		.controller("SignUpCtrl",SignUpCtrl); //this is a part of a module called app (yung nasa taas)
	SignUpCtrl.$inject = ["$scope", "SignInService"]; // angularjs na property 
	//HomeCtrl may dependencies or gagamit ng oth,er modules/services 
	//angularsj construct
	//$scope =angularjs service na parang require
	//
})();
// Anonymouse function

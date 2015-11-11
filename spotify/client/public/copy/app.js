'use strict';

(function(){
	angular
		.module("app",[ 'ngRoute'])
		//app gagamit ng routeprovider
		.config(config);

	config.$inject =["$routeProvider"];

	function config($routeProvider){
		$routeProvider
			.when("/sign-in", {
				"controller": "SignInCtrl",
				"templateUrl": "sign-in/sign-in.view.html"})
			.when("/sign-up", {
				"controller": "SignUpCtrl",
				"templateUrl": "sign-up/sign-up.view.html"})
			.when("/home", {
				"controller": "HomeCtrl",
				"templateUrl": "home/home.view.html"})
			.otherwise({ 
				"redirectTo": "/sign-in"});
	}
})();
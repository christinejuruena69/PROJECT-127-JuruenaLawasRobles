'use strict';

(function(){
	angular
		.module("app",[ 'ngRoute','ui.bootstrap'])
		//app gagamit ng routeprovider
		.config(config);

	config.$inject =["$routeProvider"];

	function config($routeProvider){
		$routeProvider
			.when("/sign-in", {
				"controller": "MainCtrl",
				"templateUrl": "sign-in/sign-in.view.html"})
			.when("/sign-up", {
				"controller": "MainCtrl",
				"templateUrl": "sign-up/sign-up.view.html"})
			.when("/home", {
				"controller": "HomeCtrl",
				"templateUrl": "home/home.view.html"})
			.when("/admin", {
				"controller": "AdminCtrl",
				"templateUrl": "admin/admin.view.html"});
			// .otherwise({
			// 	"redirectTo": "/sign-in"});
	}
})();

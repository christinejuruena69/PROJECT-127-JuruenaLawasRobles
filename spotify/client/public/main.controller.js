"use strict";

(function(){
	angular
		.module("app")
		.controller("MainCtrl", MainCtrl); //this is a part of a module called app (yung nasa taas)
	
	MainCtrl.$inject = ["$scope", "MainService"]; // angularjs na property 
	//HomeCtrl may dependencies or gagamit ng other modules/services 
	//angularsj construct
	//$scope =angularjs service na parang require

	function MainCtrl($scope, MainService){
		$scope.accounts={};
		$scope.formData={};
		$scope.SignIndata={};

		MainService.GetAll().then(function(data){
				$scope.accounts=data;
				// console.log(data);

		});

		$scope.createStudent =function(){
			MainService.Create($scope.formData)
			.then(function (data){
				$scope.formData={};
				$scope.formData.UserName="";
				// $scope.accounts.push(data);
				// console.log($scope.accounts);
				// $scope.accounts=data;
				// console.log($scope.accounts);				
			});
		}
		$scope.ValidateUser =function (SignIndata){
			MainService.Check($scope.SignIndata.user_id)
				.then(function (data){
					$scope.SignIndata=data;
 
					// console.log(data);
					console.log(SignIndata);
				});
		}

	}
})();

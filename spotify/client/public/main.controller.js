'use strict';

(function(){
	angular
		.module("app")
		.controller("MainCtrl", MainCtrl); //this is a part of a module called app (yung nasa taas)

	MainCtrl.$inject = ["$scope", "$location", "MainService"]; // angularjs na property
	//HomeCtrl may dependencies or gagamit ng other modules/services
	//angularsj construct
	//$scope =angularjs service na parang require

	function MainCtrl($scope, $location, MainService){
		$scope.users = [];
		$scope.accounts={};
		$scope.formData={};
		$scope.SignIndata={ Username:'',Password:''};
		var user = {};

		MainService.GetAll().then(function(data){
				$('body').css('display', 'none');
				$scope.accounts = data;
				$scope.users = data;
				isLoggedIn();
				// console.log("Logged in");
				// alert("Loggedin");
				$('body').css('display', '');
		});


		$scope.createStudent = function(){
			MainService.Create($scope.formData)
			.then(function (data){
				$scope.formData={};
				$scope.formData.UserName="";
				$scope.accounts = data;
				$scope.users.push(data);
				goLogin();
			});
		}

		function traverse(){
			for(var i=0;i<$scope.users.length;i++){
				console.log($scope.SignIndata.Password);
				console.log($scope.users[i].password);
				if($scope.users[i].username === $scope.SignIndata.Username){
					if($scope.SignIndata.Password === $scope.users[i].password){
						$scope.SignIndata = $scope.users[i];
						return i;
						}
						alert("Username/Password incorrect");
						return null;
				}
			}
			alert("Username/Password is incorrect");
			return -1;
		}

		$scope.ValidateUser = function (){
			var x = traverse();
			console.log(x);
			if(x != null && x>-1){
				console.log($scope.SignIndata);
				document.cookie = "user="+JSON.stringify($scope.SignIndata);
				goLoginHome();
			}
		}

		function goSignUp(){
			$location.url("/sign-up");
			console.log($location);
		}
		function goLogin(){
			$location.url("/sign-in");
			console.log($location);
		}

		function goLoginHome(){
			$location.url("/home");
			console.log($location);
		}

		function goLoginAdmin(){
			$location.url("/admin");
			console.log($location);
		}

		function load_songs(){
			console.log(user);
		}

		function isLoggedIn(){
			try{
				user = $.parseJSON(document.cookie.substring(5));
				console.log(user);
				var pathname = $(location).attr('href');
				pathname = pathname.split("#");
				console.log(pathname[1]);

					if(user.user_role != null){
						if(user.user_role == 1){
							//alert("Standard");
							load_songs();
							goLoginHome();
						} else {
							//alert("Admin");
							goLoginAdmin();
						}
					} else if(user=="" && pathname[1]=="/sign-up"){
						document.cookie = "user=\"\"";
						goSignUp();
					} else if(user==""){
						document.cookie = "user=\"\"";
						goLogin();
					} else {
						alert("Unauthorized user");
						document.cookie = "user=\"\"";
						goLogin();
					}

			}catch(err){
				//alert("No user is logged in");
				document.cookie = "user=\"\"";
				goLogin();
			}
		}
	}
})();

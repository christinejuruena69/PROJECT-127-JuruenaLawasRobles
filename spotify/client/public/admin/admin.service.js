'use strict';

(function(){
	angular
		.module("app")
		.factory("AdminService", AdminService);
	AdminService.$inject=["$http", "$q"]; //modules dependencies
	
	function AdminService($http, $q){
		var pathname = "/api/v1/todos/";
		var service = {};
		service.GetAll = GetAll;	
		service.GetOne = GetOne;
		service.update = update;
		return service;
		
		function GetAll(){
			var deferred = $q.defer();
			//defer muna yung value na nirereturn ng GetAll
			$http.get(pathname)
				.success(function(data){
					deferred.resolve(data);
				});
				return deferred.promise;
		}
		
		function GetOne(){
			var deferred = $q.defer();
			//defer muna yung value na nirereturn ng GetAll
			$http.get(pathname+'/:id')
				.success(function(data){
					deferred.resolve(data);
				});
				return deferred.promise;
		}
		
		function update(account){
			var deferred = $q.defer();
			//defer muna yung value na nirereturn ng GetAll
			$http.put(pathname+account.user_id, account)
				.success(function(data){
					deferred.resolve(data);
					console.log("updated user #"+account.user_id);
				});
				return deferred.promise;
		}
	}
})();
// Anonymouse function

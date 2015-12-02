	'use strict';

(function(){
	angular
		.module("app")
		.factory("AdminService", AdminService);
	AdminService.$inject=["$http", "$q"];

	function AdminService($http, $q){
		var pathname = "/api/v1/todos/";
		var service = {};
		service.GetAll = GetAll;
		service.GetOne = GetOne;
		service.update = update;
		return service;

		function GetAll(){
			var deferred = $q.defer();
			$http.get(pathname)
				.success(function(data){
					deferred.resolve(data);
				});
				return deferred.promise;
		}

		function GetOne(id){
			var deferred = $q.defer();
			$http.get(pathname+id)
				.success(function(data){
					deferred.resolve(data);
				});
				return deferred.promise;
		}

		function update(account){
			var deferred = $q.defer();
			$http.put(pathname+account.user_id, account)
				.success(function(data){
					deferred.resolve(data);
					console.log("updated user #"+account.user_id);
				});
				return deferred.promise;
		}
	}
})();
// Anonymous function

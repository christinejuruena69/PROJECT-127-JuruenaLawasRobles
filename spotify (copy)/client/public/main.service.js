'use strict';

(function(){
	angular
		.module("app")
		.factory("MainService", MainService);
	MainService.$inject=["$http", "$q"]; //modules dependencies
	function MainService($http, $q){
		// var apiUrl="localhost:3000/api/v1/todo";
		var service={};			//should be an object, 		
		service.GetAll = GetAll;	//bibigyan ng methodssssssss
		service.Create = Create;	//bibigyan ng methodssssssss
		return service;

		function GetAll(){
			var deferred = $q.defer();
			//defer muna yung value na nirereturn ng GetAll
			$http.get('/api/v1/todos')
				.success(function(data){
					deferred.resolve(data);
				});
				return deferred.promise;
			
		}
		function Create(formData){
			var deferred = $q.defer();
			$http.post('/api/v1/todos', formData)
				.success(function(data){
					deferred.resolve(data);
				});
				return deferred.promise;				
		}	

	}
	
})();
// Anonymouse function

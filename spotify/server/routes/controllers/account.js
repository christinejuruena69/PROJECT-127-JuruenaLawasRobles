var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', '../', '../', 'config'));
var http = require('http');

/*
@  Functions below respond to '/api/v1/todos/'
*/

exports.init = function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {
        UserName: req.body.UserName, //1
        Name: req.body.FName + " " +req.body.MName + " " + req.body.LName, //2
        Password: req.body.Password, //3
        Sex: req.body.Sex, //4
        Email_Address: req.body.Email_Address, //5
        Birthday: req.body.Birthday //6
    };

    // Compute age
    var myDay = new Date(data.Birthday);
    var today = new Date();
    var myAge = today.getFullYear() - myDay.getFullYear();

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

       client.query("INSERT INTO ACCOUNT ( Username,  Password , Name, Sex , Email_Address , Birthday , Age , User_role, Date_Joined ) values( $1, $2, $3, $4, $5, $6, $7, null, null)",
            [ data.UserName,
              data.Password,
              data.Name,
              data.Sex,
              data.Email_Address,
              data.Birthday,
              myAge
            ]);

        // A dollar sign ($) followed by digits is used to represent a positional parameter in the body of a function definition or a prepared statement. In other contexts the dollar sign may be part of an identifier or a dollar-quoted string constant.

        // SQL Query > Select Data
            var query = client.query("SELECT * FROM ACCOUNT ORDER BY Date_Joined ASC");

            // Stream results back one row at a time
            query.on('row', function(row) {
                results.push(row);
            });

            // After all data is returned, close connection and return results
            query.on('end', function() {
                done();
                return res.json(results);
            });
            // ^^^^ KUNG MAY IRERETURN SA WE PAGE LIKE SA HOME! FUCK YEAH


    });
};

exports.getAllAccounts = function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM ACCOUNT ORDER BY Date_Joined ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            console.log(row);
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

};


/*
@  Functions below respond to '/api/v1/todos/:id'
*/

exports.getOneAccount = function(req,res){
	 console.log(req.params.id);
	 pg.connect(connectionString, function(err, client, done) {
	 var x = [];
	 var id = req.params.id;
		var query = client.query("SELECT * FROM account where user_id = $1", [id]);
			query.on('row', function(row) {
		      		console.log(row);
		          x.push(row);
		      });

		      // After all data is returned, close connection and return results
		      query.on('end', function() {
		          done();
		          return res.json(x);
		      });
		});
};

exports.updateRole = function(req, res) {
     var results = [];
     // Grab data from the URL parameters
     var id = req.params.id;
     // Grab data from http request
     var data = {user_role: req.body.user_role};
     // Get a Postgres client from the connection pool
     pg.connect(connectionString, function(err, client, done) {
         // Handle connection errors
         if(err) {
           done();
           console.log(err);
           return res.status(500).send(json({ success: false, data: err}));
         }
         // SQL Query > Update Data
         client.query("UPDATE account SET user_role=($1) WHERE user_id=($2)", [data.user_role, id]);

         if(data.user_role != 1 && data.user_role != 2){
           client.query("UPDATE account SET Date_Joined = null WHERE user_id=($1)", [id]);
         } else {
           client.query("UPDATE account SET Date_Joined = current_date WHERE user_id=($1)", [id]);
         }
         // SQL Query > Select Data
         var query = client.query("SELECT * FROM account ORDER BY Date_Joined ASC");
         // Stream results back one row at a time
         query.on('row', function(row) {
             results.push(row);
         });
         // After all data is returned, close connection and return results
         query.on('end', function() {
             done();
             return res.json(results);
         });
     });
 };

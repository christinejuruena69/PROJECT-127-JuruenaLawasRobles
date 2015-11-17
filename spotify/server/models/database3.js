var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));

var client = new pg.Client(connectionString);
client.connect();
var query = client.query(
	// 'CREATE TABLE ACCOUNTS2( User_id SERIAL PRIMARY KEY, UserName VARCHAR(20) not null, Name VARCHAR(40) not null, Sex VARCHAR(10) not null, Email_Address VARCHAR(40) not null, Birthday date not null, Age INT not null, Date_Joined date not null, Account_Type VARCHAR(20) not null, User_Type VARCHAR(20), Admin_Code VARCHAR(20))'
	'CREATE TABLE ACCOUNTS3( User_id SERIAL PRIMARY KEY, UserName VARCHAR(20) not null UNIQUE, Name VARCHAR(40) not null, Sex VARCHAR(10) not null, Email_Address VARCHAR(40) not null, Birthday date not null, Age INT not null, Date_Joined date not null)'
);
query.on('end', function() { client.end(); });



//	'CREATE TABLE ACCOUNTS(
	// UserName VARCHAR(20) PRIMARY KEY,
	// Name VARCHAR(40) not null,
	//  Sex VARCHAR(10) not null, 
	// Email_Address VARCHAR(40) not null,
	//  Birthday date not null, 
	// Age INT not null,
	//  Date_Joined date not null,
	//  Account_Type VARCHAR(20) not null, 
	//  User_Type VARCHAR(20), 
	//  Admin_Code VARCHAR(20))'

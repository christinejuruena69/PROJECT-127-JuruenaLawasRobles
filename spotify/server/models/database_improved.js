var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));

var client = new pg.Client(connectionString);
client.connect();
//CREATE TABLES:
//accounts, playlist, song_playlist, songs
var query = client.query(
	'CREATE TABLE ACCOUNTS(User_id SERIAL PRIMARY KEY, Username VARCHAR(20) not null UNIQUE, Password VARCHAR(100) not null, Name VARCHAR(40) not null, Sex VARCHAR(10) not null, Email_Address VARCHAR(40) not null, Birthday date not null, Age INT not null, User_role int, Date_Joined date not null); CREATE TABLE Playlist( Playlist_id SERIAL PRIMARY KEY, Playlist_Name VARCHAR(40) not null UNIQUE, Playlist_duration INT, Playlist_no_of_songs INT); CREATE TABLE Songs( Song_id SERIAL PRIMARY KEY, Song_title VARCHAR(40) not null, Song_album VARCHAR(50), Song_genre VARCHAR(50)); CREATE TABLE SONG_PLAYLIST( Playlist_id INT REFERENCES Playlist, Song_id INT UNIQUE REFERENCES Songs )' 
);
query.on('end', function() { client.end(); });

//TO LOAD TO DATABASE SPOTIFY
//cd spotify/server
//node models/database_improved.js
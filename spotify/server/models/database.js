var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));

var client = new pg.Client(connectionString);
client.connect();
// var query = client.query('CREATE TABLE Playlist( Playlist_id SERIAL PRIMARY KEY, Playlist_Name VARCHAR(40) not null UNIQUE, Playlist_duration INT, Playlist_no_of_songs INT)');
// var query = client.query('CREATE TABLE SONG_PLAYLIST( Playlist_id INT, Song_id INT)' );

// var query = client.query('CREATE TABLE Songs( Song_id SERIAL PRIMARY KEY, Song_title VARCHAR(40) not null, Song_album VARCHAR(50), Song_genre VARCHAR(50))');
// var query = client.query('CREATE TABLE ALBUM(Album_id SERIAL PRIMARY KEY,  Album_title VARCHAR(60),Album_no_of_songs INT, Record_label VARCHAR(60), Year_released INT )');
// query.on('end', function() { client.end(); });

client.query('CREATE TABLE ACCOUNT(User_id SERIAL PRIMARY KEY, Username VARCHAR(20) not null UNIQUE, Password VARCHAR(100) not null, Name VARCHAR(40) not null, Sex VARCHAR(10) not null, Email_Address VARCHAR(40) not null, Birthday date not null, Age INT not null, User_role int, Date_Joined date not null)');//

client.query('CREATE TABLE SONG( Song_id SERIAL PRIMARY KEY, Song_title VARCHAR(40) not null,  Song_artist  VARCHAR(40) not null, Song_album VARCHAR(50), Song_genre VARCHAR(50), Song_no_of_times_played INT)'); //

client.query('CREATE TABLE PLAYLIST( Playlist_id SERIAL PRIMARY KEY, Playlist_Name VARCHAR(40) not null UNIQUE, Playlist_no_of_songs INT, user_id int)'); //

client.query('CREATE TABLE ALBUM( Album_id SERIAL PRIMARY KEY,  Album_title VARCHAR(60),Album_no_of_songs INT, Year_released INT, Artist_id VARCHAR(50))'); //

client.query('CREATE TABLE ARTIST(Artist_id SERIAL PRIMARY KEY,  Artist_name VARCHAR(60),Artist_no_of_songs INT, artist_no_of_albums INT )');

client.query('CREATE TABLE PLAYLIST_SONG( Playlist_id INT, Song_id INT)' );

client.query('CREATE TABLE ALBUM_SONG( Album_id INT, Song_id INT)' );

client.query('CREATE TABLE ARTIST_SONG( Artist_id INT, Song_id INT)' );

client.query('CREATE TABLE USER_SONG( user_id INT, Song_id INT)' );

client.query("INSERT INTO ACCOUNT ( Username,  Password , Name, Sex , Email_Address , Birthday , Age , User_role,Date_Joined ) values( 'PJHRobles', 'Password', 'Paul Joshua Hao-Robles', 'Male', 'joshuahrobles@gmail.com', '1997-04-01', 18, 2, current_date)");

client.query("INSERT INTO ACCOUNT (Username,  Password , Name, Sex , Email_Address , Birthday , Age , User_role,Date_Joined) values('lmlawas', 'password', 'Leensey Monteagudo Lawas', 'Female', 'leenseylawas2007@gmail.com', '1996-09-25', 19, 2, current_date)");

var query = client.query("INSERT INTO ACCOUNT (Username,  Password , Name, Sex , Email_Address , Birthday , Age , User_role,Date_Joined) values( 'chjuruena', 'password', 'Christine Mae Juruena', 'Female', 'christinemaejuruena@gmail.com', '1996-03-04', 19, 2, current_date)");

query.on('end', function() { client.end(); });
<<<<<<< HEAD
=======



//CREATE TABLE USER_SONG( User_id INT, Song_id INT)

// INSERT INTO PLAYLIST(Playlist_Name) values ('Chill');
// INSERT INTO PLAYLIST(Playlist_Name) values ('G lang');
// INSERT INTO Playlist(playlist_name) values ('Bebe girls'), ('Bebe girlzzs'), ('Bebe girlssas');
// INSERT INTO Playlist values ('playlist_name','Hugots');
//  lient.query('INSERT INTO ACCOUNTS3(UserName, Name, Sex, Email_Address, Birthday, Age, Date_Joined) values( $1, $2, $3, $4, $5, $6, current_date)',

// insert into playlist(Playlist_Name,Playlist_duration, Playlist_no_of_songs ) values ('hugot', 0, 0),('chill', 0, 0), ('arriba',0 ,0);


// var query = client.query('CREATE TABLE Songs( Song_id SERIAL PRIMARY KEY, Song_title VARCHAR(40) not null)');
// var query = client.query('CREATE TABLE SONG_PLAYLIST( Playlist_id INT REFERENCES Playlist, Song_id INT Songs)' );
//
>>>>>>> 0ab21d2fec6d218974182fe2dd1596de31921373

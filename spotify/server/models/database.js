var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));

var client = new pg.Client(connectionString);
client.connect();

client.query('CREATE TABLE IF NOT EXISTS ACCOUNT(User_id SERIAL PRIMARY KEY, Username VARCHAR(20) not null UNIQUE, Password VARCHAR(100) not null, Name VARCHAR(40) not null, Sex VARCHAR(10) not null, Email_Address VARCHAR(40) not null, Birthday date not null, Age INT not null, User_role int, Date_Joined date)');

client.query('CREATE TABLE IF NOT EXISTS SONG( Song_id SERIAL PRIMARY KEY, Song_title VARCHAR(40) not null,  Song_artist  VARCHAR(40) not null, Song_album VARCHAR(50), Song_genre VARCHAR(50), Song_no_of_times_played INT)');

client.query('CREATE TABLE IF NOT EXISTS PLAYLIST( Playlist_id SERIAL PRIMARY KEY, Playlist_Name VARCHAR(40) not null UNIQUE, Playlist_no_of_songs INT, user_id int)');

client.query('CREATE TABLE IF NOT EXISTS ALBUM( Album_id SERIAL PRIMARY KEY,  Album_title VARCHAR(60),Album_no_of_songs INT, Year_released INT, Artist_id VARCHAR(50))');

client.query('CREATE TABLE IF NOT EXISTS ARTIST(Artist_id SERIAL PRIMARY KEY,  Artist_name VARCHAR(60),Artist_no_of_songs INT, artist_no_of_albums INT )');

client.query('CREATE TABLE IF NOT EXISTS PLAYLIST_SONG( Playlist_id INT, Song_id INT)' );

client.query('CREATE TABLE IF NOT EXISTS ALBUM_SONG( Album_id INT, Song_id INT)' );

client.query('CREATE TABLE IF NOT EXISTS ARTIST_SONG( Artist_id INT, Song_id INT)' );

client.query('CREATE TABLE IF NOT EXISTS USER_SONG( user_id INT, Song_id INT)' );

client.query('create table if not exists music(music_id serial primary key, music_name varchar(40), filepath varchar(40), music_oid oid, song_id int)');

client.query("INSERT INTO ACCOUNT ( Username,  Password , Name, Sex , Email_Address , Birthday , Age , User_role,Date_Joined ) values( 'PJHRobles', 'Password', 'Paul Joshua Hao-Robles', 'Male', 'joshuahrobles@gmail.com', '1997-04-01', 18, 2, current_date)");

client.query("INSERT INTO ACCOUNT (Username,  Password , Name, Sex , Email_Address , Birthday , Age , User_role,Date_Joined) values('lmlawas', 'password', 'Leensey Monteagudo Lawas', 'Female', 'leenseylawas2007@gmail.com', '1996-09-25', 19, 2, current_date)");

var query = client.query("INSERT INTO ACCOUNT (Username,  Password , Name, Sex , Email_Address , Birthday , Age , User_role,Date_Joined) values( 'chjuruena', 'password', 'Christine Mae Juruena', 'Female', 'christinemaejuruena@gmail.com', '1996-03-04', 19, 2, current_date)");

query.on('end', function() { client.end(); });

var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));

var client = new pg.Client(connectionString);
client.connect();

client.query('CREATE TABLE ACCOUNTS(User_id SERIAL PRIMARY KEY, Username VARCHAR(20) not null UNIQUE, Password VARCHAR(100) not null, Name VARCHAR(40) not null, Sex VARCHAR(10) not null, Email_Address VARCHAR(40) not null, Birthday date not null, Age INT not null, User_role int, Date_Joined date not null)');

client.query('CREATE TABLE SONG( Song_id SERIAL PRIMARY KEY, Song_title VARCHAR(40) not null, Song_album VARCHAR(50), Song_genre VARCHAR(50))');

client.query('CREATE TABLE PLAYLIST( Playlist_id SERIAL PRIMARY KEY, Playlist_Name VARCHAR(40) not null UNIQUE, Playlist_duration INT, Playlist_no_of_songs INT, user_id int)');

client.query('CREATE TABLE ALBUM( Album_id SERIAL PRIMARY KEY, Album_name VARCHAR(40) not null UNIQUE, Album_no_of_songs INT, Artist VARCHAR(50))');

client.query('CREATE TABLE PLAYLIST_SONG( Playlist_id INT, Song_id INT)' );

var query = client.query('CREATE TABLE USER_SONG( user_id INT, Song_id INT)' );

query.on('end', function() { client.end(); });



//CREATE TABLE USER_SONG( User_id INT, Song_id INT)

// INSERT INTO PLAYLIST(Playlist_Name) values ("Chill");
// INSERT INTO PLAYLIST(Playlist_Name) values ("G lang");
// INSERT INTO Playlist(playlist_name) values ("Bebe girls"), ("Bebe girlzzs"), ("Bebe girlssas");
// INSERT INTO Playlist values ('playlist_name','Hugots');
//  lient.query("INSERT INTO ACCOUNTS3(UserName, Name, Sex, Email_Address, Birthday, Age, Date_Joined) values( $1, $2, $3, $4, $5, $6, current_date)",

// insert into playlist(Playlist_Name,Playlist_duration, Playlist_no_of_songs ) values ('hugot', 0, 0),('chill', 0, 0), ('arriba',0 ,0);


// var query = client.query('CREATE TABLE Songs( Song_id SERIAL PRIMARY KEY, Song_title VARCHAR(40) not null)');
// var query = client.query('CREATE TABLE SONG_PLAYLIST( Playlist_id INT REFERENCES Playlist, Song_id INT Songs)' );
//

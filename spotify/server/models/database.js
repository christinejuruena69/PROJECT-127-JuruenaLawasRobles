var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));

var client = new pg.Client(connectionString);
client.connect();
 
 var query = client.query('CREATE TABLE Playlist( Playlist_id SERIAL PRIMARY KEY, Playlist_Name VARCHAR(40) not null UNIQUE, Playlist_duration INT, Playlist_no_of_songs INT)');
 
  var query = client.query('CREATE TABLE Songs( Song_id SERIAL PRIMARY KEY, Song_title VARCHAR(40) not null, Song_album VARCHAR(50), Song_genre VARCHAR(50))');

 var query = client.query('CREATE TABLE SONG_PLAYLIST( Playlist_id INT REFERENCES Playlist, Song_id INT UNIQUE REFERENCES Songs )' );


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
 

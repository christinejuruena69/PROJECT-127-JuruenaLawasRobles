///record label removed


var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
// var connectionString = require(path.join(__dirname, 'config'));
var connectionString = require(path.join(__dirname, '../', '../', 'config'));
// var connectionString = "postgres://postgres:postgres@localhost/todo";
var http = require('http');
// var promise = require('pg-promise');


    // router.get('/', function(req, res, next) {
    //    res.sendFile(path.join(__dirname, '../', '../', 'client', 'views', 'index.html'));

    // });

module.exports = router;

router.post('/api/v1/todos', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {
        UserName: req.body.UserName, //1
        Name: req.body.FName + " " +req.body.MName + " " + req.body.LName, //2
        Sex: req.body.Sex, //3
        Email_Address: req.body.Email_Address, //4
        Birthday: req.body.Birthday, //5
        Age: req.body.Age //6
    };
    console.log( data.UserName, data.Name );

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

       client.query("INSERT INTO ACCOUNTS3(UserName, Name, Sex, Email_Address, Birthday, Age, Date_Joined) values( $1, $2, $3, $4, $5, $6, current_date)", 
            [ data.UserName,
              data.Name, 
              data.Sex, 
              data.Email_Address, 
              data.Birthday, data.Age
            ]);
        
        // A dollar sign ($) followed by digits is used to represent a positional parameter in the body of a function definition or a prepared statement. In other contexts the dollar sign may be part of an identifier or a dollar-quoted string constant.

        // SQL Query > Select Data
            var query = client.query("SELECT * FROM ACCOUNTS3 ORDER BY User_id ASC");

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
});

router.get('/api/v1/plist', function(req, res) {

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
        var query = client.query("SELECT * FROM Playlist;");

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

});

router.post('/api/v1/plist', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {
        playlist_name: req.body.playlist_name, //1       
    };
    console.log( data.playlist_name );

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

       client.query("INSERT INTO Playlist( Playlist_Name, Playlist_no_of_songs) values( $1, 0)", 
            [ data.playlist_name ]);

       var query = client.query("SELECT * FROM PLAYLIST order by playlist_id ASC;");

          query.on('row', function(row) {
              results.push(row);
          });
          query.on('end', function() {
              done();
              return res.json(results);
          });


    });
});

router.get('/api/v1/songs', function(req, res) {

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
        var query = client.query("SELECT * FROM SONGS ORDER by song_id ASC;");

        // var query = client.query(
            // "WITH Song_ids_table as ( select * from PLAYLIST_SONG), select * from SONGS where song_id in ( select song_id in Song_ids_table);");

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

});

router.get('/api/v1/plist-songs', function(req, res) {

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
        var query = client.query("SELECT * FROM PLAYLIST_SONG order by playlist_id ASC;");

        // var query = client.query(
            // "WITH Song_ids_table as ( select * from PLAYLIST_SONG), select * from SONGS where song_id in ( select song_id in Song_ids_table);");

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

});

router.get('/api/v1/albums', function(req, res) {

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
        var query = client.query("SELECT * FROM SONG_ALBUM;");
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

});

router.get('/api/v1/artist', function(req, res) {

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
        var query = client.query("SELECT * FROM Artist ORDER by Artist_id ASC;");
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

});
router.get('/api/v1/songs/:song_id', function(req,res) {
 console.log(req.params.song_id);
 pg.connect(connectionString, function(err, client, done) {
 var x = [];
 var id = req.params.song_id;
    var query = client.query("SELECT * FROM SONGS where song_id = $1", [id]);
        query.on('row', function(row) {
                console.log(row);
            x.push(row);
        });
        query.on('end', function() {
            done();
            return res.json(x);
        });
    });
});
router.get('api/v1/plist/:playlist_id', function(req,res) {
 console.log(req.params.playlist_id);
 pg.connect(connectionString, function(err, client, done) {
 var x = [];
 var id = req.params.playlist_id;
    var query = client.query("SELECT * FROM PLAYLIST where playlist_id = $1", [id]);
        query.on('row', function(row) {
                console.log(row);
            x.push(row);
        });
        query.on('end', function() {
            done();
            return res.json(x);
        });
    });
});
router.get('api/v1/plist-songs/:playlist_id', function(req,res) {
 console.log(req.params.playlist_id);
 pg.connect(connectionString, function(err, client, done) {
 var x = [];
 var id = req.params.playlist_id;
    var query = client.query("SELECT * FROM PLAYLIST_SONG where playlist_id = $1", [id]);
        query.on('row', function(row) {
                console.log(row);
            x.push(row);
        });
        query.on('end', function() {
            done();
            return res.json(x);
        });
    });
});
router.get('/api/v1/album/:album_id', function(req,res) {
 console.log(req.params.album_id);
 pg.connect(connectionString, function(err, client, done) {
 var x = [];
 var id = req.params.album_id;
    var query = client.query("SELECT * FROM ALBUM where album_id = $1", [id]);
        query.on('row', function(row) {
                console.log(row);
            x.push(row);
        });
        query.on('end', function() {
            done();
            return res.json(x);
        });
    });
});
router.get('/api/v1/artist/:artist_id', function(req,res) {
 console.log(req.params.artist_id);
 pg.connect(connectionString, function(err, client, done) {
 var x = [];
 var id = req.params.artist_id;
    var query = client.query("SELECT * FROM ARTIST where artist_id = $1", [id]);
        query.on('row', function(row) {
                console.log(row);
            x.push(row);
        });
        query.on('end', function() {
            done();
            return res.json(x);
        });
    });
});

router.get('/api/v1/allstuff', function(req, res) {

    var results = [];
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        var query = client.query("SELECT * FROM Playlist;SELECT * FROM Songs;");
        query.on('row', function(row) {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});

router.get('/api/v1/album', function(req, res) {

    var results = [];
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        var query = client.query("SELECT * FROM ALBUM ORDER BY Album_id ASC;");
        query.on('row', function(row) {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});

// router.post('/api/v1/plist', function(req, res) {

//     var results = [];

//     // Grab data from http request
//     var data = {
//         Name: req.body.FName + " " +req.body.MName + " " + req.body.LName, //2
//         Sex: req.body.Sex, //3
//         Email_Address: req.body.Email_Address, //4
//         Birthday: req.body.Birthday, //5
//         Age: req.body.Age //6
//     };
//     console.log( data.UserName, data.Name );

//     // Get a Postgres client from the connection pool
//     pg.connect(connectionString, function(err, client, done) {
//         // Handle connection errors
//         if(err) {
//           done();
//           console.log(err);
//           return res.status(500).json({ success: false, data: err});
//         }

//        client.query("INSERT INTO ACCOUNTS3(UserName, Name, Sex, Email_Address, Birthday, Age, Date_Joined) values( $1, $2, $3, $4, $5, $6, current_date)", 
//             [ data.UserName,
//               data.Name, 
//               data.Sex, 
//               data.Email_Address, 
//               data.Birthday, data.Age
//             ]);
        
//         // A dollar sign ($) followed by digits is used to represent a positional parameter in the body of a function definition or a prepared statement. In other contexts the dollar sign may be part of an identifier or a dollar-quoted string constant.

//         // SQL Query > Select Data
//             var query = client.query("SELECT * FROM ACCOUNTS3 ORDER BY User_id ASC");

//             // Stream results back one row at a time
//             query.on('row', function(row) {
//                 results.push(row);
//             });

//             // After all data is returned, close connection and return results
//             query.on('end', function() {
//                 done();
//                 return res.json(results);
//             });
//             // ^^^^ KUNG MAY IRERETURN SA WE PAGE LIKE SA HOME! FUCK YEAH


//     });
// });

router.post('/api/v1/plist-songs', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {
        playlist_id : req.body.playlist_id,
        song_id: req.body.song_id
    };
    console.log( data.playlist_id, data.song_id );

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

       client.query("INSERT INTO PLAYLIST_SONG(Playlist_id, Song_id) values( $1, $2)", 
            [ data.playlist_id,
              data.song_id
            ]);     
       
       client.query("UPDATE PLAYLIST SET Playlist_no_of_songs=(Playlist_no_of_songs+1) WHERE playlist_id=($1)",
            [ data.playlist_id
            ]);
        
        // A dollar sign ($) followed by digits is used to represent a positional parameter in the body of a function definition or a prepared statement. In other contexts the dollar sign may be part of an identifier or a dollar-quoted string constant.

        // SQL Query > Select Data
            var query = client.query("SELECT * FROM PLAYLIST_SONG ORDER BY Playlist_id ASC");

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
});
router.post('/api/v1/album', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {
        album_title : req.body.album_title
    };
    console.log( data.playlist_id, data.song_id );

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
                      
       client.query("INSERT INTO ALBUM(Album_title, Album_no_of_songs, Record_label) values( $1, 0, '')", 
            [ data.album_title]);     
         // SQL Query > Select Data
            var query = client.query("SELECT * FROM ALBUM ORDER BY album_id ASC");

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
});
router.post('/api/v1/artist', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {
        artist_name : req.body.artist_name,
        album_name : req.body.album_name

    };
    console.log( data.playlist_id, data.song_id );

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
                      
// var query = client.query('CREATE TABLE ALBUM(Album_id SERIAL PRIMARY KEY,  Album_title VARCHAR(60),Album_no_of_songs INT, Record_label VARCHAR(60), Year_released INT )');


       client.query("INSERT INTO ARTIST(Artist_name, Artist_no_of_songs, artist_no_of_albums ) values( $1, 0, 0)", 
            [ data.album_title]);     
         // SQL Query > Select Data
            var query = client.query("SELECT * FROM ARTIST ORDER BY artist_id ASC");

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
});
router.post('/api/v1/songs', function(req, res) {
    var results = [];
    // Grab data from http request
    var data = {
        song_title: req.body.song_title,
        song_album: req.body.song_album,
        song_genre: req.body.song_genre,
        song_artist: req.body.song_artist
    };
    console.log( data.playlist_id, data.song_id );

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

       client.query("INSERT INTO SONGS(song_title, song_album, song_genre, song_artist) values( $1, $2, $3, $4)", 
            [ data.song_title,
              data.song_album,
              data.song_genre,
              data.song_artist
            ]);        
        var tempresult=[];
       var query = client.query("SELECT * FROM SONGS ORDER BY song_id ASC");

            // Stream results back one row at a time
            query.on('row', function(row) {
                results.push(row);
            });

            // After all data is returned, close connection and return results
            query.on('end', function() {
                done();
                return res.json(results);
            });


            var json= [];

            // // if(results.length > 0){
            //   if (data.song_album.length>0){



            //     var exists = false;
            //     var existsTHIS = false;
            //     console.log("pasok");
            //     var results=[];
                  
            //       var query = client.query("SELECT Album_title FROM ALBUM where Album_title=($1)",
            //         [data.song_album]);
            //         query.on('row', function(row) {
            //             results.push(row);
            //         });  

            //         query.on('end', function(){
            //             // results.forEach(function(item) {
            //             //   if( item.album_title == data.song_album){
            //             //     console.log("meron na");
            //             //     exists=true;                            
            //             //   }
            //             // });
            //           done();
            //           // return fxn(exists);
            //         })();
            //      // client.query("INSERT INTO ALBUM(Album_title, Album_no_of_songs, Record_label) values( $1, 0, '')", [ data.song_album]);                      
            //           // if (existsTHIS == false) {//wala pa yung album
            //           //   console.log("new");
            //           //   client.query("INSERT INTO ALBUM(Album_title, Album_no_of_songs, Record_label) values( $1, 0, '')", [ data.song_album]);                      
            //           // }else{
            //           //   console("Update");
            //           //    client.query("UPDATE ALBUM SET Album_no_of_songs=(Album_no_of_songs+1) WHERE Album_id=($1)",[id]);
            //           // }
                      
                     


            //   }
             


    });
});



router.put('/api/v1/songs/:song_id', function(req, res) {
    var results = [];
    // Grab data from the URL parameters
    var id = req.params.song_id;
    // Grab data from http request
    var data = {
        song_title: req.body.song_title,
        song_album: req.body.song_album,
        song_genre: req.body.song_genre,
        song_artist: req.body.song_artist
    };
    console.log(data);

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        client.query("UPDATE SONGS SET song_title=($1), song_album=($2), song_genre=($3), song_artist=($4) WHERE song_id=($5)",
         [  data.song_title,
            data.song_album,
            data.song_genre,
            data.song_artist,
            id
        ]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM SONGS ORDER BY song_id ASC");

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

});

router.put('/api/v1/album/:album_id', function(req, res) {
    var results = [];
    // Grab data from the URL parameters
    var id = req.params.album_id;
      var data = {
        album_title : req.body.album_title
    };
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        client.query("UPDATE ALBUM SET album_no_of_songs=(album_no_of_songs+1), Album_title=($2) WHERE Album_id=($1)", 
          [ id,
          data.album_title
          ]);
        // SQL Query > Select Data
        var query = client.query("SELECT * FROM ALBUM ORDER BY Album_id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        query.on('error', function(error) {
            console.log(error);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});
router.put('/api/v1/artist/:artist', function(req, res) {
    var results = [];
    // Grab data from the URL parameters
    var id = req.params.artist;
      var data = {
        artist_name : req.body.artist_name
    };
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        client.query("UPDATE ARTIST SET Artist_no_of_songs=(Artist_no_of_songs+1), artist_name=($2) WHERE Album_id=($1)", 
          [ id,
          data.artist_name
          ]);
        // SQL Query > Select Data
        var query = client.query("SELECT * FROM ARTIST ORDER BY Artist_id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        query.on('error', function(error) {
            console.log(error);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

});


router.put('/api/v1/plist/:playlist_id', function(req, res) {
    var results = [];
    // Grab data from the URL parameters
    var id = req.params.playlist_id;
    // Grab data from http request
    var data = {
      playlist_name : req.body.playlist_name
    };
    console.log(data);

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        client.query("UPDATE PLAYLIST SET playlist_name=($1) WHERE playlist_id=($2)",
         [  data.playlist_name,id
        ]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM PLAYLIST ORDER BY playlist_id ASC");

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

});



router.delete('/api/v1/songs/:song_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.song_id;


    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query("DELETE FROM SONGS WHERE song_id=($1)", [id]);
        
        client.query("DELETE FROM PLAYLIST_SONG where song_id = $1", [id]);


        // SQL Query > Select Data
        var query = client.query("SELECT * FROM SONGS ORDER BY song_id ASC");

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

});
router.delete('/api/v1/plist/:playlist_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.playlist_id;


    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query("DELETE FROM PLAYLIST WHERE playlist_id=($1)", [id]);

        client.query("DELETE FROM PLAYLIST_SONG where playlist_id = $1", [id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM PLAYLIST ORDER BY playlist_id ASC");

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

});
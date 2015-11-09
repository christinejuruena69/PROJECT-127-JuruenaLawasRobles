var pg = require('pg');
var conString = "postgres://postgres:postgres@localhost/todo";

//this initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 20 (also configurable)
pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT $1::int AS number', ['1'], function(err, result) {
    //call `done()` to release the client back to the pool
    done();

    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].number);
		
		var client = new pg.Client(conString);
		client.connect();
		var query = client.query('CREATE TABLE items3(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
		query.on('end', function() { client.end(); });
    //output: 1
  });
});

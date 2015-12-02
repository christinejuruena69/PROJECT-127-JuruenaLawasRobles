//var connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost/spotify';//CHRIS
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:password@localhost/spotify';//LEENSEY
//var connectionString = process.env.DATABASE_URL || 'postgres://postgres@localhost/spotify'; //PJ
// var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

module.exports = connectionString;

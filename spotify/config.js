var connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost/todo';
// var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

module.exports = connectionString;
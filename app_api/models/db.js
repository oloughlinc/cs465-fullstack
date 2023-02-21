// modified from https://github.com/cliveharber/gettingMean-2/blob/chapter-05/app_server/models/db.js
// connect to a database and provide monitoring functionality
// also seeds database with starter information on connection

const mongoose = require('mongoose');
const readLine = require('readline');

// I am not entirely sure what this does, even after reading doc, but it is recommended false by default per deprecation warning
mongoose.set('strictQuery', false); 

const host = process.env.DB_HOST || '127.0.0.1';
const conn_uri = `mongodb://${host}/travlr`;

const {seed} = require('./seed'); // instructions for populating database on startup for testing
require('./travlr'); // mongoose schema
require('./user');

mongoose.connection.on('connected', () => {
  console.log('connected');
});

mongoose.connection.on('error', err => {
  console.log('error: ' + err);
  return connect();
});

mongoose.connection.on('disconnected', () => {
  console.log('disconnected');
});

if (process.platform === 'win32') {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on ('SIGINT', () => {
    process.emit("SIGINT");
  });
}

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close( () => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});

// connect to database through mongoose and seed database
async function main() {
    await mongoose.connect(conn_uri);
    await seed();
}

main().catch(console.log);




const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/socialNetworkDB'; 


mongoose.connect(mongoDB)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const db = mongoose.connection;


db.on('connected', () => {
    console.log('Mongoose connected to ' + mongoDB);
});

db.on('error', (err) => {
    console.log('Mongoose connection error: ' + err);
});

db.on('disconnected', () => {
    console.log('Mongoose disconnected');
});
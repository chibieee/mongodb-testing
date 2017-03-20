const mongoose = require('mongoose');

//fixed deprecated warning, using ES6 Promises
mongoose.Promise = global.Promise;


before((done) => {
    // Connect to mongoDB

    mongoose.connect('mongodb://localhost/test');

    mongoose.connection.once('open', () => {
        console.log('Connection has been made.');
        done();
    }).on('error', (error) => {
        console.log('Connection error:', error);
    });
});

//Drop the character collection before each test
beforeEach((done) => {
    mongoose.connection.collections.mariochars.drop(() => {
        done();
    });
});
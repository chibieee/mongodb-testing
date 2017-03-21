const assert = require('assert');
const MarioChar = require('../models/mariochar');

// Describe tests
describe('Finding records test', () => {

    var char;

    beforeEach((done) => {
        char = new MarioChar({
            name: 'Mario',
            weight: 77
        });

        char.save().then(() => {
            done();
        });
    })
    // Create tests
    it('Finds a record from database', (done) => {
        MarioChar.findOne({name: 'Mario'}).then((result) => {
            assert(result.name === 'Mario');
            done();
        });
    });

    it('Finds a record by ID from database', (done) => {
        MarioChar.findOne({_id: char._id}).then((result) => {
            assert(result._id.toString() === char._id.toString());
            done();
        });
    });

});
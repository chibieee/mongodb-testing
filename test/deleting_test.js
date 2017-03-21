const assert = require('assert');
const MarioChar = require('../models/mariochar');

// Describe tests
describe('Deleting records test', () => {
    // Create tests
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
    it('Deletes a record to the database', (done) => {
        MarioChar.findOneAndRemove({name: 'Mario'}).then(() => {
            MarioChar.findOne({name: 'Mario'}).then((result) => {
                assert(result === null);
            });
            done();
        });
    });

});
const assert = require('assert');
const MarioChar = require('../models/mariochar');

// Describe tests
describe('Updating records test', () => {
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
    it('Updates a records weight in the database', (done) => {
        MarioChar.findOneAndUpdate({name: 'Mario'}, {weight: 88}).then(() => {
            MarioChar.findOne({name: 'Mario'}).then((result) => {
                assert(result.weight === 88);
            });
            done();
        });
    });

    it('Updates a records name in the database', (done) => {
        MarioChar.findOneAndUpdate({name: 'Mario'}, {name: 'Luigi'}).then(() => {
            MarioChar.findOne({_id: char._id}).then((result) => {
                assert(result.name === 'Luigi');
            });
            done();
        });
    });

});

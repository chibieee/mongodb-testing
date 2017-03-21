const assert = require('assert');
const mongoose = require('mongoose');
const Author = require('../models/author');

describe('Nesting records',() => {

    beforeEach((done) => {
        mongoose.connection.collections.authors.drop(() => {
            done();
        })
    })


    it('Creates an author with sub-documents', (done) => {
        var bryan = new Author({
            name: 'Bryan Konietzko',
            age: 32,
            books: [
                {title: 'Book One: Water', pages: 400},
                {title: 'Book Two: Earth', pages: 400},
                {title: 'Book Three: Fire', pages: 400}
                ]
        });

        bryan.save().then(() => {
            Author.findOne({name: 'Bryan Konietzko'}).then((result) => {
                assert(result.books.length === 3);
            });
            done();
        });
    });

    it('Adds a book to an author', (done) => {
        var bryan = new Author({
            name: 'Bryan Konietzko',
            age: 32,
            books: [
                {title: 'Book One: Water', pages: 400},
                {title: 'Book Two: Earth', pages: 400},
                {title: 'Book Three: Fire', pages: 400}
                ]
        });

        bryan.save().then(() => {
            Author.findOne({name: 'Bryan Konietzko'}).then((result) => {
                result.books.push({title: 'Book One: Air', pages: 500});
                result.save().then(() => {
                    Author.findOne({name: 'Bryan Konietzko'}).then((result) => {
                        assert(result.books.length === 4);
                        done();
                    })
                })
            });
        })
    })
});
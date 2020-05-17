#! /usr/bin/env node

console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true',
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require('async');
const Smartphone = require('./models/smartphone');
const Keyboard = require('./models/keyboard');
const Mouse = require('./models/mouse');
const Television = require('./models/television');
const Category = require('./models/category');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const smartphones = [];
const keyboards = [];
const mice = [];
const televisions = [];
const categories = [];

function categoryCreate(name, description, cb) {
    const category = new Category({
        name,
        description,
    });

    category.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Category: ' + category);
        categories.push(category);
        cb(null, category);
    });
}

function smartphoneCreate(name, description, category, price, stock, cb) {
    const smartphone = new Smartphone({
        name,
        description: {
            OS: description.OS,
            RAM: description.RAM,
            ROM: description.ROM,
            battery: description.battery,
            cameras: {
                camera1: description.cameras.camera1,
                camera2: description.cameras.camera2,
                camera3: description.cameras.camera3,
            },
        },
        category,
        price,
        stock,
    });

    smartphone.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Smartphone: ' + smartphone);
        smartphones.push(smartphone);
        cb(null, smartphone);
    });
}

function keyboardCreate(name, description, category, price, stock, cb) {
    const keyboard = new Keyboard({
        name,
        description,
        category,
        price,
        stock,
    });

    keyboard.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Keyboard: ' + keyboard);
        keyboards.push(keyboard);
        cb(null, keyboard);
    });
}

function mouseCreate(name, description, category, price, stock, cb) {
    const mouse = new Mouse({
        name,
        description,
        category,
        price,
        stock,
    });

    mouse.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Mouse: ' + mouse);
        mice.push(mouse);
        cb(null, mouse);
    });
}

function televisionCreate(name, description, category, price, stock, cb) {
    const television = new Television({
        name,
        description,
        category,
        price,
        stock,
    });

    television.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Television: ' + television);
        televisions.push(television);
        cb(null, television);
    });
}

function createCategories(cb) {
    async.series(
        [
            function (callback) {
                categoryCreate(
                    'Computer Accessories',
                    'In this category you will find all the accessories that you might ever need for your computer with no accessories',
                    callback,
                );
            },
            function (callback) {
                categoryCreate(
                    'Electronic Devices',
                    'Here you will be shocked by the powerful TVs, Laptops and Routers that we have to offer',
                    callback,
                );
            },
            function (callback) {
                categoryCreate(
                    'Phones',
                    'A collection of incredibly incredible smartphones and landline phones (if you remember those)',
                    callback,
                );
            },
        ],
        // optional callback
        cb,
    );
}

//CREATE SMARTHPONES

function createSmartphones(cb) {
    async.series(
        [
            function (callback) {
                const cameras = {
                    camera1: '64 MP main camera',
                    camera2: '12 MP ultrawide camera',
                    camera3: '4 MP macro camera',
                };
                smartphoneCreate(
                    'Ultra One Stellar 5G',
                    { OS: 'Android', RAM: 8, ROM: 128, battery: 5000, cameras },
                    categories[2],
                    2500,
                    240,
                    callback,
                );
            },
            function (callback) {
                const cameras = {
                    camera1: '84 MP main camera',
                    camera2: '24 MP ultrawide camera',
                    camera3: '16 MP telephoto',
                };
                smartphoneCreate(
                    'Increndible Smartphone',
                    { OS: 'Android', RAM: 16, ROM: 256, battery: 7000, cameras },
                    categories[2],
                    3000,
                    2,
                    callback,
                );
            },
            function (callback) {
                const cameras = {
                    camera1: '13 MP camera',
                };
                smartphoneCreate(
                    'Extra Purple 2',
                    { OS: 'Android', RAM: 2, ROM: 16, battery: 3000, cameras },
                    categories[2],
                    700,
                    24,
                    callback,
                );
            },
        ],
        // optional callback
        cb,
    );
}

function createKeyboards(cb) {
    async.series(
        [
            function (callback) {
                keyboardCreate(
                    'Rectangular',
                    'A perfectly rectangular keyboard that will enhance your typing because of its rectangularity',
                    categories[0],
                    39,
                    0,
                    callback,
                );
            },
            function (callback) {
                keyboardCreate(
                    'Circular',
                    'Some people like to be different, and you can definitely be differet with this keyboard',
                    categories[0],
                    12,
                    34,
                    callback,
                );
            },
        ],
        // optional callback
        cb,
    );
}

function createMice(cb) {
    async.series(
        [
            function (callback) {
                mouseCreate(
                    'Buttonful',
                    `You won't need a keyboard along this mouse thanks to its 136 buttons perfect for any situation`,
                    categories[0],
                    72,
                    42,
                    callback,
                );
            },
            function (callback) {
                mouseCreate(
                    'Buttonless',
                    'A mouse entirely made of a screen that is extremely responsive to your fingers',
                    categories[0],
                    340,
                    6,
                    callback,
                );
            },
        ],
        // optional callback
        cb,
    );
}

function createTelevisions(cb) {
    async.series(
        [
            function (callback) {
                televisionCreate(
                    'Humungous',
                    'A 102 inches OLED panel that will immerse you for the rest of your life',
                    categories[1],
                    4341,
                    2,
                    callback,
                );
            },
        ],
        // optional callback
        cb,
    );
}

async.series(
    [createCategories, createSmartphones, createMice, createTelevisions, createKeyboards],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        // All done, disconnect from database
        mongoose.connection.close();
    },
);

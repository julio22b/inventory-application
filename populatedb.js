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
const Modem = require('./models/modem');
const Smartphone = require('./models/smartphone');
const LandlinePhone = require('./models/landlinePhone');
const Keyboard = require('./models/keyboard');
const Mouse = require('./models/mouse');
const Television = require('./models/television');
const Laptop = require('./models/laptop');
const Category = require('./models/category');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const modems = [];
const smartphones = [];
const landlinePhones = [];
const keyboards = [];
const mice = [];
const televisions = [];
const laptops = [];
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

function modemCreate(name, description, category, price, stock, cb) {
    const modem = new Modem({
        name,
        description,
        category,
        price,
        stock,
    });

    modem.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Modem: ' + modem);
        modems.push(modem);
        cb(null, modem);
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

function landlinePhoneCreate(name, description, category, price, stock, cb) {
    const landlinePhone = new LandlinePhone({
        name,
        description,
        category,
        price,
        stock,
    });

    landlinePhone.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Landline: ' + landlinePhone);
        landlinePhones.push(landlinePhone);
        cb(null, landlinePhone);
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

function laptopCreate(name, description, category, price, stock, cb) {
    const laptop = new Laptop({
        name,
        description: {
            OS: description.OS,
            RAM: description.RAM,
            hard_disk: description.hard_disk,
            CPU: description.CPU,
            GPU: description.GPU,
        },
        category,
        price,
        stock,
    });

    laptop.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Laptop: ' + laptop);
        laptops.push(laptop);
        cb(null, laptop);
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

function createModems(cb) {
    async.series(
        [
            function (callback) {
                modemCreate(
                    'MODEM AMAZING',
                    'This modem is very good, very fast, and small',
                    categories[1],
                    25,
                    7,
                    callback,
                );
            },
            function (callback) {
                modemCreate(
                    'ROUTER AWESOME',
                    'Very efficient router, it does everything it says and more!',
                    categories[1],
                    30,
                    16,
                    callback,
                );
            },
            function (callback) {
                modemCreate(
                    'MODEM SPECTACULAR',
                    'Despite its name, this modem is not very spectacular',
                    categories[1],
                    16,
                    72,
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
                    'MODEM SPECTACULAR',
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

function createLandlinePhones(cb) {
    async.series(
        [
            function (callback) {
                landlinePhoneCreate(
                    'Imaginary',
                    'Extremely realistic and touch sensitive phone',
                    categories[2],
                    39,
                    0,
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
                    'Imaginary',
                    'Extremely realistic and touch sensitive phone',
                    categories[0],
                    39,
                    0,
                    callback,
                );
            },
            function (callback) {
                keyboardCreate(
                    'Astonishingly Wireless',
                    'This wireless phone will allow you to call your mom from anywhere',
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

function createLaptops(cb) {
    async.series(
        [
            function (callback) {
                const description = {
                    OS: 'Windows',
                    RAM: '32',
                    hard_disk: '500GB SSD',
                    CPU: 'Stellar 764',
                    GPU: 'Electric 122',
                };
                laptopCreate('XMWD Laptop', description, categories[1], 768, 53, callback);
            },
            function (callback) {
                const description = {
                    OS: 'Linux',
                    RAM: '8',
                    hard_disk: '250GB HDD',
                    CPU: 'Ghostly 340',
                    GPU: 'Black 78x',
                };
                laptopCreate('30th Gen Laptop', description, categories[1], 120, 435, callback);
            },
            function (callback) {
                const description = {
                    OS: 'MacOS',
                    RAM: '16',
                    hard_disk: '1TB SSD',
                    CPU: 'Yeet 3470',
                    GPU: 'Liquid 90x',
                };
                laptopCreate('NwoL Laptop', description, categories[1], 1999, 27, callback);
            },
        ],
        // optional callback
        cb,
    );
}

async.series(
    [
        createCategories,
        createModems,
        createSmartphones,
        createLandlinePhones,
        createKeyboards,
        createMice,
        createTelevisions,
        createLaptops,
    ],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        // All done, disconnect from database
        mongoose.connection.close();
    },
);

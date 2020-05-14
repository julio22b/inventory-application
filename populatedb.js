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

function landlinePhoneCreate(name, cb) {
    const brand = new Brand({
        name,
    });

    brand.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Brand: ' + brand);
        brands.push(brand);
        cb(null, brand);
    });
}

//CREATE MODEMS!!!

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
                    'category',
                    25,
                    7,
                    callback,
                );
            },
            function (callback) {
                modemCreate(
                    'ROUTER AWESOME',
                    'Very efficient router, it does everything it says and more!',
                    'category',
                    30,
                    16,
                    callback,
                );
            },
            function (callback) {
                modemCreate(
                    'MODEM SPECTACULAR',
                    'Despite its name, this modem is not very spectacular',
                    'category',
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
                    'category',
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
                    'category',
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
                    'category',
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
                    'category',
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
                    'category',
                    39,
                    0,
                    callback,
                );
            },
            function (callback) {
                keyboardCreate(
                    'Astonishingly Wireless',
                    'This wireless phone will allow you to call your mom from anywhere',
                    'category',
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
                    'category',
                    72,
                    42,
                    callback,
                );
            },
            function (callback) {
                mouseCreate(
                    'Buttonless',
                    'A mouse entirely made of a screen that is extremely responsive to your fingers',
                    'category',
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
                    'category',
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
                laptopCreate('XMWD Laptop', description, 'category', 768, 53, callback);
            },
            function (callback) {
                const description = {
                    OS: 'Linux',
                    RAM: '8',
                    hard_disk: '250GB HDD',
                    CPU: 'Ghostly 340',
                    GPU: 'Black 78x',
                };
                laptopCreate('30th Gen Laptop', description, 'category', 120, 435, callback);
            },
            function (callback) {
                const description = {
                    OS: 'MacOS',
                    RAM: '16',
                    hard_disk: '1TB SSD',
                    CPU: 'Yeet 3470',
                    GPU: 'Liquid 90x',
                };
                laptopCreate('NwoL Laptop', description, 'category', 1999, 27, callback);
            },
        ],
        // optional callback
        cb,
    );
}

function createBooks(cb) {
    async.parallel(
        [
            function (callback) {
                bookCreate(
                    'The Name of the Wind (The Kingkiller Chronicle, #1)',
                    'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.',
                    '9781473211896',
                    authors[0],
                    [genres[0]],
                    callback,
                );
            },
            function (callback) {
                bookCreate(
                    "The Wise Man's Fear (The Kingkiller Chronicle, #2)",
                    'Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.',
                    '9788401352836',
                    authors[0],
                    [genres[0]],
                    callback,
                );
            },
            function (callback) {
                bookCreate(
                    'The Slow Regard of Silent Things (Kingkiller Chronicle)',
                    'Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.',
                    '9780756411336',
                    authors[0],
                    [genres[0]],
                    callback,
                );
            },
            function (callback) {
                bookCreate(
                    'Apes and Angels',
                    'Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...',
                    '9780765379528',
                    authors[1],
                    [genres[1]],
                    callback,
                );
            },
            function (callback) {
                bookCreate(
                    'Death Wave',
                    "In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...",
                    '9780765379504',
                    authors[1],
                    [genres[1]],
                    callback,
                );
            },
            function (callback) {
                bookCreate(
                    'Test Book 1',
                    'Summary of test book 1',
                    'ISBN111111',
                    authors[4],
                    [genres[0], genres[1]],
                    callback,
                );
            },
            function (callback) {
                bookCreate(
                    'Test Book 2',
                    'Summary of test book 2',
                    'ISBN222222',
                    authors[4],
                    false,
                    callback,
                );
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
        } else {
            console.log('BOOKInstances: ' + bookinstances);
        }
        // All done, disconnect from database
        mongoose.connection.close();
    },
);

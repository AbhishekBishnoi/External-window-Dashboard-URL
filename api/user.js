var express = require('express');
var router = express.Router();
var times = require('lodash/times');
var faker = require('faker');
var json2csv = require('json2csv');

router.get('/', function (req, res) {
    var lastId = req.query.lastId;
    var users = [];
    for (var i = 0; i < 100; i++) {
        users.push(generateFakeUser());
    }
    res.json(users);
});

router.get('/names', function (req, res) {
    var users = [];

    for (var i = 0; i < 10; i++) {
        users.push(faker.name.findName());
    }

});

router.post('/allusers', function (req, res) {
    var users = [];
    var fields = [
        'name',
        'email',
        'title',
        'account',
        'transaction',
        'amount'
    ];
    for (var i = 0; i < 100000; i++) {
        users.push(generateFakeUser());
    }
    var csvFile = json2csv({ data: users, fields: fields });
    res.writeHead(200, {
        'Content-Type': 'application/csv',
        'Content-Disposition': 'attachment; filename=contacts.csv'
    });
    res.end(csvFile);
});

function generateFakeUser() {
    return {
        name: faker.name.findName(),
        email: faker.internet.email(),
        title: faker.name.jobTitle(),
        account: faker.finance.account(8),
        transaction: faker.finance.transactionType(),
        amount: faker.finance.amount(1000, 10000, 2, '$')
    }
}

module.exports = router;

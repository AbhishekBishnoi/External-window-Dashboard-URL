var express = require('express');
var router = express.Router();
var fs = require('fs');
var archiver = require('archiver');
var shortid = require('shortid');
const csv = require('csvtojson');
const csvFilePath = './mock/sample.csv';

router.get('/', function (req, res) {
    let entries = [];
    csv()
        .fromFile(csvFilePath)
        .on('json', (jsonObj) => {
            entries.push(jsonObj);
        })
        .on('done', (error) => {
            res.json(entries);
        });
});

router.post('/downloadZip', function (req, res) {
    var uniqKey = shortid.generate();
    var ext = ".zip";
    var fileKey = uniqKey + ext;
    var files = [
        {
            fileName: 'file1.csv'
        },
        {
            fileName: 'file2.csv'
        },
        {
            fileName: 'file3.csv'
        }
    ];

    var archive = archiver('zip', {
        zlib: { level: 9 }
    });

    // good practice to catch this error explicitly
    archive.on('error', function (err) {
        console.log(err);
        throw err;
    });

    files.forEach(function (file) {
        var path = __base + 'mock/' + file.fileName;
        archive.file(path, { name: file.fileName });
    }, this);

    archive.finalize();

    res.setHeader("Content-Disposition", "attachment;filename='" + req.body.fileName + ext + "'");
    archive.pipe(res);
});

module.exports = router;

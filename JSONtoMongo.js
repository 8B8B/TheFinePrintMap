'use strict';
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Demo = require('./DemoSchema.js');
var config = require('./config/config.js');
var data = require('./demographics.json');

/* Connect to your database */
mongoose.connect(config.db.uri, { useMongoClient: true });

Demo.collection.insertMany(data.entries);

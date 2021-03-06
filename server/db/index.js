const fs = require('fs');
const config = require('config');
const path = require('path');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dbURL = `mongodb://${config.get('database.host')}:${config.get(
  'database.port'
)}/${config.get('database.name')}`;
// const basename = path.basename(module.filename);

let models = {};

mongoose.connect(dbURL);

fs.readdirSync(__dirname + '/schemas').forEach(function(file) {
  console.log(file);
  var schema = require(path.join(__dirname + '/schemas/', file));
  models[schema.name] = mongoose.model(schema.name, schema.schema);
});
console.log('Loaded schemas...');

module.exports = models;

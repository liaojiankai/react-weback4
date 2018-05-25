require("json5/lib/register");

const config = require("./entry.json5");

let entry = {};

config.map(data => {
  entry[data.name] = [`./entryBuild/${data.name}.js`, data.title];
});

module.exports = entry;

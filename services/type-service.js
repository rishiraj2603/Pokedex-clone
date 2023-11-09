// Load Models
const Type = require("../models/types");

// Import data from JSON file
const TypesJson = require("../Pokedex-data/data/types.json");

// Populate data of collection 'Types' with a loop
const loadTypes = () => {
  let allPromises = [];

  let i = 0;
  while (TypesJson[i] != undefined) {
    console.log("insert type: ", TypesJson[i].ename);
    const type = new Type({
      cname: TypesJson[i].cname,
      ename: TypesJson[i].ename,
      jname: TypesJson[i].jname,
    });
    allPromises.push(type.save());
    i++;
  }

  return Promise.all(allPromises);
};

module.exports = {
  loadTypes: loadTypes,
};
// Load Models
const Skill = require("../models/skill");

// Import data from JSON file
const SkillsJson = require("../Pokedex-data/data/skills.json");

// Populate data of collection 'Types' with a loop
const loadSkills = () => {
  let allPromises = [];

  let i = 0;
  while (SkillsJson[i] != undefined) {
    console.log("insert skill: ", SkillsJson[i].ename);
    const skill = new Skill(SkillsJson[i]);
    allPromises.push(skill.save());
    i++;
  }

  return Promise.all(allPromises);
};

module.exports = {
  loadSkills: loadSkills,
};

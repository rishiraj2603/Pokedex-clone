// Load Models
const Pokemon = require("../models/pokemons");
const Skill = require("../models/skill");
const Type = require("../models/types");

// Import JSON file
const PokemonsJson = require("../Pokedex-data/data/pokedex.json");

// collection 'Pokemon' with a loop
const loadPokemons = async () => {
  for (let j = 0; j < PokemonsJson.length; j++) {
    const Poke = PokemonsJson[j];
    console.log("insert Pokemon: ", Poke.ename);

    try {
      const types = Poke.type;
      const typesFound = await Type.find({
        cname: { $in: types },
      });
      const typeIds = typesFound.map((e) => e._id);
      const skills = {};
      const skillList = ["egg", "level_up", "tm", "transfer", "tutor"];
      for (let index = 0; index < skillList.length; index++) {
        const skillKey = skillList[index];
        const skillIds = Poke.skills[skillKey];
        const DbSkills = await Skill.find({
          id: { $in: skillIds },
        });

        const dbKey = `${skillKey}`;
        skills[dbKey] = DbSkills.map((e) => e._id);
      }

      const pokemon = new Pokemon({
        base: {
          Attack: Poke.base.Attack,
          Defense: Poke.base.Defense,
          HP: Poke.base.HP,
          SpAtk: Poke.base["Sp.Atk"],
          SpDef: Poke.base["Sp.Def"],
          Speed: Poke.base.Speed,
        },
        image: `/Pokedex-Data/images/img/${Poke.id + Poke.ename}.png`,
        cname: Poke.cname,
        ename: Poke.ename,
        id: Poke.id,
        jname: Poke.jname,
        skills: skills,
        type: typeIds,
      });
      await pokemon.save();
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = {
  loadPokemons: loadPokemons,
};

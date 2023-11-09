// Service dependancies
const typeService = require("./services/type-service");
const pokemonService = require("./services/pokemon-service");
const skillsService = require("./services/skills-service");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/pokedex", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => {
  console.log(`Database connected!`);
});

const load_db = async () => {
  await typeService.loadTypes();
  console.log(`ALL TYPES LOADED`);
  await skillsService.loadSkills();
  console.log(`ALL SKILLS LOADED`);
  await pokemonService.loadPokemons();
  console.log(`ALL POKEMONS LOADED`);
  process.exit();
};

load_db();
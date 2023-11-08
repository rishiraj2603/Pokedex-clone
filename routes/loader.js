// Service dependancies
const typeService = require('../services/type-service');
const pokemonService = require('../services/pokemon-service');

module.exports = (app) => {
    app.get('/load-database', (req, res) => {
        // Create collection in DB
        typeService.loadTypes().then(() => {
            pokemonService.loadPokemons()
        }).then(() => {
            return res.json({});
        })
        .catch((err) => {
            console.log(err);
        });
    });
};
// Services dependancies
const router = require('express').Router();
const typeService = require('../services/type-service');
const pokemonService = require('../services/pokemon-service');
const Pokemon = require('../models/pokemons')
const path = require('path')


router.get('/',(req,res)=>{
	res.render('home');
});

router.get('/pokedex/:pageNo', async (req,res)=>{
	const pageNo=parseInt(req.params.pageNo)
	const pageSize=50
	const skipCount=(pageNo-1)*pageSize
	const pokemonDataImage = await Pokemon.find({}).sort({id:1}).skip(skipCount).limit(pageSize).populate('type');
	const numberOfPokemons=await Pokemon.countDocuments()
	const numberOfPages= Math.ceil(numberOfPokemons/pageSize)
	//14
	const paginationData=[]
	for (let i = 1; i <= numberOfPages; i++) {
		paginationData.push({pageNo:i,active:i===pageNo})
	}
	// res.json({
	// 	// pokemons:pokemonDataImage.map(e=>e.id),
	// 	paginationData})
	res.render('pokemon/link.ejs', {pokemonDataImage,paginationData})
});


router.get('/test', async (req, res)=>{
	const pokemonData = await Pokemon.find({}).populate('type');
	pokemonData.forEach(pokemon => {
		console.log(pokemon.type)
	});
	console.log(pokemonData);

	res.send(pokemonData);
})


module.exports = router;
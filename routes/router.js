// Services dependancies
const router = require('express').Router();
const typeService = require('../services/type-service');
const pokemonService = require('../services/pokemon-service');
const Pokemon = require('../models/pokemons');
const Type = require('../models/types')
const path = require('path')


router.get('/',(req,res)=>{
	res.render('home');
});

router.get('/pokedex/:pageNo', async (req,res)=>{
	const pageNo=parseInt(req.params.pageNo)
	const pageSize=50
	const skipCount=(pageNo-1)*pageSize
	const pokemons = await Pokemon.find({}).sort({id:1}).skip(skipCount).limit(pageSize).populate('type');
	const numberOfPokemons=await Pokemon.countDocuments()
	const numberOfPages= Math.ceil(numberOfPokemons/pageSize)
	const paginationData=[]
	for (let i = 1; i <= numberOfPages; i++) {
		paginationData.push({pageNo:i,active:i===pageNo})
	}

	// res.json({
	// 	// pokemons:pokemonDataImage.map(e=>e.id),
	// 	paginationData})
	res.render('pokemon/link.ejs', {pokemons,paginationData})
});
router.get('/pokemon/search', async(req,res)=>{
	const {query} = req.query;
	const pokemons = await Pokemon.find({ename:{ "$regex": query , "$options": "i"} }).populate('type');
	res.render('pokemon/search.ejs',{pokemons});
});

router.get('/pokemon/:type', async(req,res)=>{
	const {type} = req.params;
	const PokemonType = await Type.findOne({ename:type});
	const pokemons = await Pokemon.find({type:PokemonType._id}).populate('type');
	res.render('pokemon/types.ejs',{pokemons})
})


router.get('/test', async (req, res)=>{
	const pokemonData = await Pokemon.find({}).populate('type');
	pokemonData.forEach(pokemon => {
		console.log(pokemon.type)
	});
	console.log(pokemonData);

	res.send(pokemonData);
})


module.exports = router;
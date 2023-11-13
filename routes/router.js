// Services dependancies
const router = require('express').Router();
const Pokemon = require('../models/pokemons');
const Type = require('../models/types');
require('../models/skill');


router.get('/',(req,res)=>{
	res.render('home');
});

router.get('/pokedex/:pageNo', async (req,res)=>{
try {
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
	res.render('pokemon/link.ejs', {pokemons,paginationData})
} catch (error) {
	console.log(error);
}
});

router.get('/pokemon/search', async(req,res)=>{
try {
		const {query} = req.query;
		const pokemons = await Pokemon.find({ename:{ "$regex": query , "$options": "i"} }).populate('type');
		res.render('pokemon/search.ejs',{pokemons});
} catch (error) {
	console.log(error)
}
});

router.get('/pokemon/type/:type', async(req,res)=>{
try {
		const {type} = req.params;
		const PokemonType = await Type.findOne({ename:type});
		const pokemons = await Pokemon.find({type:PokemonType._id}).populate('type');
		res.render('pokemon/types.ejs',{pokemons})
} catch (error) {
	console.log(error)
}
});

router.get('/pokemon/:id', async (req,res)=>{
try {
		const {id} = req.params ;
		const pokemonData = await Pokemon.find({ename:id}).populate('skills.tm skills.egg skills.transfer skills.level_up skills.tutor type');
		const pokemon = pokemonData[0];
		res.render('pokemon/pokemonDetails',{pokemon});
} catch (error) {
	console.log(error)
}
});

module.exports = router;
const { Router } = require('express');
const {Country, Activity} = require('../db');
const {CreateCountries} = require('./methods');
const {Op} = require('sequelize')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//////////////////////////////////////////////////////////////////////////////////////////////

router.get('/countries', async function(req, res){
    const {name, continent, activity} = req.query;
    const dbLength = await Country.count();

    if(!dbLength){
        const countries = await CreateCountries();
        await Country.bulkCreate(countries);
    }

    if(name){

        let findCountry

        if(activity){
            findCountry = await Country.findAll({
                where: continent 
                ? { name: {[Op.iLike]: `%${name}%`}, continent} 
                : { name: {[Op.iLike]: `%${name}%`}},
                order: [["name", "ASC"]],
                include: {
                    model: Activity,
                    attributes: ['name'],
                    through: [],
                    where: {name: activity}
                }
            })
        }
        else {
            findCountry = await Country.findAll({
                where: continent 
                ? { name: {[Op.iLike]: `%${name}%`}, continent} 
                : { name: {[Op.iLike]: `%${name}%`}},
                order: [["name", "ASC"]]
            })
        }
    
        
        if(findCountry.length) return res.send(findCountry)
        
        return res.send({message: 'Sorry, Country not Found'});
    }

    if(activity){
        return res.send(await Country.findAll({
            where: continent ? {continent} : {},
            order: [["name", "ASC"]],
            include: {
                model: Activity,
                attributes: ['name'],
                through: [],
                where: {name: activity}
            }
        }));
    }
    
    res.send(await Country.findAll({
        where: continent ? {continent} : {},
        order: [["name", "ASC"]]
    }));
})

//////////////////////////////////////////////////////////////////////////////////////////////

router.get('/countries/:idPais', async function(req, res){
    const id = req.params.idPais

    const countryDetails = await Country.findOne({where: {id}, include: Activity});
    res.send(countryDetails);
})

//////////////////////////////////////////////////////////////////////////////////////////////

router.post('/activity', async function(req, res){
    const {name, season, difficulty, duration, countries} = req.body
    
    const activity = await Activity.create({name, season, difficulty, duration})

    while(countries.length){
        const country = await Country.findOne({where: {name: countries.shift()}})
        await activity.addCountry(country)
    }

    const activities = await Activity.findAll({
        attributes: ['name'],
        group: ['name']
    })

    res.send(activities)
})

router.get('/getActivities', async function(req, res){

    const activities = await Activity.findAll({
        attributes: ['name'],
        group: ['name']
    })

    res.send(activities)
})

//////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;



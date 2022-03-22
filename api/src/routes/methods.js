const axios = require('axios')

const CreateCountries = async () => {
    const response = await axios.get('https://restcountries.com/v3/all')

    const countries = await response.data.map(c => {
        let {cca3, name, flags, region, capital, subregion, area, population} = c;
        
        capital = capital?.toString().replace('{', '').replace('}', '')
    
        return {
            id: cca3,
            name: name.common,
            flag: flags[0],
            continent: region,
            capital: capital || 'No tiene Capital',
            subregion: subregion || 'No tiene Subregion',
            area: area,
            population: population
        };
    })

    return countries;
}

module.exports = {
    CreateCountries
}
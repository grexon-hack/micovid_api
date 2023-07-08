const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));





const saveAll = async () => {
    
    try {
        const resp = await fetch('https://restcountries.com/v3/all');
        const data = await resp.json();
        
        const types = data.map(( t)=> {
            return {ID:t.cca3, Name: t.name.common,NameOficial: t.name.official, 
                Subregion: t.subregion, Area: t.area,
                 Population: t.population, Image : t.flags[1],
                Continent : t.continents[0], Capital: Array.isArray(t.capital)&&t.capital[0], Timezone: t.timezones[0], 
                Lat: t.latlng[0],
                Long: t.latlng[1], Maps: t.maps.googleMaps}
        })
        return types
        
    } catch (error) {
        return error
    }

    
}

const  changeWord = (value) => {
    let change = value.toLowerCase().split(' ');
    let ready = '';
    change.forEach((t) => {
        let word = t.split('')
        let first = word.splice(0, 1).join('').toUpperCase();
        let send = first + word.join('');
        ready += send;
    })


    return ready
}



module.exports = {
    saveAll,
    changeWord
}


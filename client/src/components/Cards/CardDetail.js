import '../../css_components/Styles/Details.css'
import React from "react"

export default function CardDetail({details}){

    let {flag, name, continent, id, capital, subregion, area, population, activities} = details

    if(details){
        return (
        <div className="bigger_container">
            <div className="details_container">
                <img src={flag} height='200px' width='350px' alt='flag'/>
                <div className="details_small_container">
                      <p>Name: {name}</p>
                      <p>Continent: {continent}</p>
                      <p>{id}</p>
                      <p>Capital: {capital}</p>
                      <p>Subregion: {subregion}</p>
                      <p>Area: {area} km2</p>
                      <p>Population: {population}</p>
                      <br/>
                </div>
            </div>

            <div className='activity_container'>
                 <div className="activity_details">
                    {activities?.map((a, i) => {
                        return (
                            <li key={`activity ${i}`}>
                                <p>Activity {a.id}</p>
                                <p>Name: {a.name}</p>
                                <p>Season: {a.season}</p>
                                <p>Difficulty: {a.difficulty}</p>
                                <p>Duration: {a.duration}</p>
                            </li>
                        )
                    })}
                </div>
            </div>
            
        </div>
        )
    }
    
}
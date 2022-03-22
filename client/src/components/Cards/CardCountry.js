import '../../css_components/Styles/CardCountry.css'
import React from "react"
import { Link } from "react-router-dom"
import { sortCountries } from './SortCards'

export default function CardCountry({countries, Page, OFFSET, LIMIT, sort}){

  let currentCountries = sortCountries(countries, sort);

  currentCountries = (Page === '1') 
  ? countries.slice(OFFSET, LIMIT-1) 
  : countries.slice(OFFSET-1, LIMIT-1);

  return (
    <ul className="ContainCountries">
        <div className='ContainGrid'>
            {currentCountries?.map((c, i) => {      
              return (
                <li key={`country ${i}`}>
                  <Link className='Link' to={`/Home/Details/${c.id}`}>
                    <div className='card'>
                      <img className='flag' src={`${c.flag}`} alt='img not found'/>
                      <p>Continent: {c.continent}</p>
                      <p>{c.name}</p>
                    </div>
                  </Link>
                </li>
              )
            })}
        </div>
    </ul>
  )
}
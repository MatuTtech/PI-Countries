import React, {Fragment} from "react";

export function AddCountries({input, handleChange, countries, renderCountries}){

    return (
        <div>
            <div className="containerCountries">
                {renderCountries 
                ? (countries?.map((country, i) => (
                    <li key={`add ${i}`}>
                        <p>{country.name}</p>
                        <div className='button_container'>
                        <button className='add_button' name='countries' value={country.name} type='button' onClick={(e) => {  
                            countries.splice(i, 1)
                            if(!input.countries.includes(e.target.value)) handleChange(e)
                        }}>+</button>
                        </div>
                    </li>
                ))) 
                : <></>}
            </div>
        </div>
    )
}

export function SelectedCountries({input, handleChange}){

    return (
        <div className="containCountries_remove">
            <div className='countries_remove'>
                {input.countries.map((country,i) => (
                    <li key={`selected ${i}`}>
                        <p>{country}</p>
                        <div className='button_container_remove'>
                        <button className='remove_button' type='button' name='delete' value={country} onClick={(e) => handleChange(e)}>-</button>
                        </div>
                    </li>
                ))}
            </div>
        </div>
    )
}


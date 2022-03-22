import '../../css_components/Styles/AddActivity.css';
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createActivity, findCountries } from '../../redux/actions';
import { AddCountries, SelectedCountries } from './SelectCountries';
import { useHistory } from 'react-router-dom';

export function AddActivity() {

  const history = useHistory()
  const dispatch = useDispatch();
  const countriesNames = useSelector((state) => state.countries), error = useSelector((state) => state.error);
  const [input, setInput] = useState({name: '', season: '', difficulty: 0, duration: '', countries: []})
  const [renderCountry, setRenderCountry] = useState(false)

  const searchCountries = (e) => {
    e.preventDefault()
    if(!e.target.value) setRenderCountry(false)
    else setRenderCountry(true)
    dispatch(findCountries(e.target.value, ""))
  }

  const handleChange = (e) => {
    e.preventDefault()

    switch(e.target.name){
      case 'delete': 
        setInput({...input, countries: input.countries.filter(c => c !== e.target.value)})
        break;

      case 'name':
        setInput({...input, name: e.target.value.toUpperCase()})
        break;

      case 'countries':
        setInput({...input, countries: [...input.countries, e.target.value]})
        break;

      default: setInput({...input, [e.target.name]: e.target.value})
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(input.name && input.season && input.difficulty && input.duration && input.countries.length){
      dispatch(createActivity(input))
      alert('The activity has been created successfully')
      setInput({name: '', season: '', difficulty: 0, duration: '', countries: []})
      e.target.reset();
      history.push('/Home/1')
    } 

    else alert('You must complete all fields')
  }

  return (
    <div className='create_activity_container'>

      <form onSubmit={(e) => handleSubmit(e)} autoComplete='off'>

          <div className='create_activity_options' >
            
            <p className='title'>Create Activity</p>
            

            <div>
            <label>Name </label>
            <input className='searcher_container' type='text' name='name' placeholder='Activity name...' value={input.name} onChange={(e) => handleChange(e)}/>
            </div>

            <div>
            <label>Season </label>
            <select className='options_container' defaultValue={""} name='season' onChange={(e) => handleChange(e)}>
              <option value="" disabled hidden>Choose season</option>
              <option value={'Summer'}>Summer</option>
              <option value={'Autumn'}>Autumn</option>
              <option value={'Winter'}>Winter</option>
              <option value={'Spring'}>Spring</option>
            </select>
            </div>

            <div>
            <label>Difficulty </label>
            <select className='options_container' defaultValue={""} name='difficulty' onChange={(e) => handleChange(e)}>
              <option value="" disabled hidden>Choose difficulty</option>
              <option value={1}>Beginner</option>
              <option value={2}>Amateur</option>
              <option value={3}>Intermediate</option>
              <option value={4}>Advanced</option>
              <option value={5}>Expert</option>
            </select>
            </div>

            <div>
            <label>Duration </label>
            <input className='searcher_container' type='text' name='duration' placeholder='In hours...' value={input.duration} onChange={(e) => handleChange(e)}/>
            </div>
          </div>
          

          <nav className='select_countries_container'>

              <div>
                <div className='search_container'>
                  <label className='label_search'>Countries: </label>
                  <input type='search' onChange={(e) => searchCountries(e)}/>
                </div>
              </div>

              <div>
                <div className='selectedCountries'>
                  <label>Selected Countries </label>
                </div>
              </div>

              <div>
                <button className='submit_buttom' type='submit'>Create</button>  
              </div>
              
          </nav>

          <div className='ContainRenders'>
            <div className='RenderCountries'>
              {error.message? <></> 
              : <AddCountries renderCountries={renderCountry} countries={countriesNames} input={input} handleChange={handleChange}/>}
            </div>

            <div className='RenderSelectedCountries'>
              {!input.countries.length ? <></>
              : <SelectedCountries input={input} handleChange={handleChange}/>}
            </div>
          </div>
   
      </form>
    </div>
  )
};




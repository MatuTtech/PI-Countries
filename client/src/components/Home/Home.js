import '../../css_components/Styles/Home.css';
import React, {Fragment, useEffect, useState } from 'react';
import { getCountries, findCountries} from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import CardCountry from '../Cards/CardCountry';
import Paginacion from '../Paginado/Paginado';
import SortCards from '../Cards/SortCards';
import { useHistory } from 'react-router-dom';

export function Home(props) {

  const history = useHistory()
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState(""), [search, setSearch] = useState("")
  const [sort, setSort] = useState({order: "ASC", by: "name"})
  let countries = useSelector((state) => state.countries), error = useSelector((state) => state.error);
  let activities = useSelector((state) => state.activities)
  
//////////////////////////////////////////////////////////////////////
  const currentPage = props.match.params.page 
  const countriesPerPage = 10;
  const IndexLastCountry = countriesPerPage * currentPage;                              
  const IndexFirstCountry = IndexLastCountry - countriesPerPage;
/////////////////////////////////////////////////////////////////////

  const searchCountries = (e) => {
    setSearch(e.target.value)
    dispatch(findCountries(e.target.value, filter))
    history.push('/Home/1')
  }

  const FilterByContinent = (e) => {
    setFilter({...filter, country: e.target.value});
    dispatch(findCountries(search, e.target.value))
    history.push('/Home/1')
  }

  const FilterByActivity = (e) => {
    dispatch(findCountries(search, filter, e.target.value))
    history.push('/Home/1')
  }

  const SortType = (e) => {
    e.preventDefault()
    setSort({...sort, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    dispatch(getCountries())
    setLoading(false)
  }, [dispatch])

  return ( 
    <Fragment>
          <div className='ContainHome'>
            {loading ? <h1>...loading</h1> 
            : (<>
                {!error.message && countries.length > 0 ? <p className='actual_countries'>{`Actual Countries: ${countries.length}`}</p> : <p className='actual_countries'>{`Actual Countries: 0`}</p>}
                <div className='container'>
                  <input className='searcher' placeholder='Search Countries' type='search' onChange={(e) => searchCountries(e)}/>
                </div>
                <SortCards SortType={SortType} FilterByContinent={FilterByContinent} FilterByActivity={FilterByActivity} activities={activities}/> 

                {error.message ? <h1>{error.message}</h1>

            : (<>
                <Paginacion countriesPerPage={countriesPerPage} countries={countries.length}/>
                <CardCountry countries={countries} Page={currentPage} OFFSET={IndexFirstCountry} LIMIT={IndexLastCountry} sort={sort}/>
              </>)}
            </>)}

          </div>
    </Fragment>
  )
};
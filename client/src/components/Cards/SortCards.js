import '../../css_components/Styles/SortCards.css';
import React, {Fragment, useEffect} from "react";
import { useDispatch } from 'react-redux';
import { getActivities } from '../../redux/actions';

export default function SortCards({SortType, FilterByContinent, FilterByActivity, activities}) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getActivities())
    }, [dispatch])

    return(
        <Fragment>
            <div className='select_container'>
              <div className='select'>

                  <label>Ordering type</label>
                  <select className="filters" defaultValue={'ASC'} name='order' onChange={(e) => SortType(e)}>
                      <option value={'ASC'}>ASCENDANT</option>
                      <option value={'DESC'}>DESCENDANT</option>
                  </select>

              </div>

              <div className='select_1'>

                  <select className="filters" defaultValue={"name"} name='by' onChange={(e) => SortType(e)}>
                      <option value={'name'}>NAME</option>
                      <option value={'id'}>ID</option>
                      <option value={'continent'}>CONTINENT</option>
                      <option value={'area'}>AREA</option>
                      <option value={'population'}>POPULATION</option>
                  </select>

               </div>
            </div>
           
            <div className='select_container'>
               <div className='select_2'>

                   <label className="filter_continent">Filter by continent</label>
                   <select className="filters" defaultValue={""} onChange={(e) => FilterByContinent(e)}>
                       <option value={""}>ALL CONTINENTS</option>
                       <option value={'Africa'}>AFRICA</option>
                       <option value={'Americas'}>AMERICAS</option>
                       <option value={'Antarctic'}>ANTARCTIC</option>
                    <option value={'Asia'}>ASIA</option>
                       <option value={'Europe'}>EUROPE</option>
                       <option value={'Oceania'}>OCEANIA</option>
                   </select>

               </div>
            </div>

            <div>
                <label>Filter by activity</label>
                <select defaultValue={''} onChange={(e) => FilterByActivity(e)}>
                    <option value={''}>ALL ACTIVITIES</option>
                    {activities?.map(activity => (
                        <option value={`${activity}`}>{activity}</option>
                    ))}
                </select>
            </div>
            
        </Fragment>
    )
}

export function sortCountries(countries, {order, by}) {
    switch(order){
      case 'DESC':
        return (by === 'name' || by === 'id' || by === 'continent') 
        ? countries.sort((a,b) => b[by].localeCompare(a[by])) 
        : countries.sort((a,b) => a[by] - b[by]) // DESCENDENTE de menor a mayor
        
      default: 
        return (by === 'name' || by === 'id' || by === 'continent') 
        ? countries.sort((a,b) => a[by].localeCompare(b[by])) 
        : countries.sort((a,b) => b[by] - a[by]) // ASCENDENTE de mayor a menor
    }
}
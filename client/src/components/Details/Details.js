import '../../css_components/Styles/Home.css';
import React, { useEffect, useState } from 'react';
import { getDetails } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import CardDetail from '../Cards/CardDetail';

export function Details(props) {
  
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const details = useSelector((state) => state.details);
  const {id} = props.match.params

  useEffect(() => {
    dispatch(getDetails(id))
    setLoading(false)
  }, [dispatch, id])

  return (
    <React.Fragment>
      {loading ? <h1>...loading</h1> : <br/>}
      <CardDetail details={details}/>
    </React.Fragment>
    )
};
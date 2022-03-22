import '../../css_components/Styles/Paginacion.css';
import { Fragment } from "react";
import { Link } from 'react-router-dom';

export default function Paginacion({countriesPerPage, countries}) {
    let pageNumbers = [];

    if(Math.floor(countries/countriesPerPage) > 0){
        for(let i = 0; i <= Math.floor(countries/countriesPerPage); i++){
            pageNumbers.push(i+1)
        }
    }

    return(
        <Fragment>
            <nav className='wrapper'>
                <ul className="paginationContain">
                    {pageNumbers?.map(pageNum => {
                        return (
                            <li key={pageNum}>
                                <Link to={`/Home/${pageNum}`} className="PageNum">{pageNum}</Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </Fragment>
    )
}
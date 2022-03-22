import '../../css_components/Styles/NavBar.css';
import logo from '../../css_components/img/logo.png';
import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

function NavBar() {

  return (
    <Fragment>
      <div className='ContainNavBar'>
        <img src={logo} className="logo" alt='img not load'/>
        <ul className='ContainLinks'>
            <li><Link id='link' to='/Home/1'>Home</Link></li>
            <li><Link id='link' to='/Home/Workshop/createActivity'>Create Activity</Link></li>
            <li><Link id='link' to='/'>Principal Page</Link></li>
        </ul>
      </div>
    </Fragment>
  )
};

export default NavBar;



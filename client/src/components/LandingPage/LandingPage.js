import '../../css_components/Styles/LandingPage.css';
import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
      <div className='LandingContainer'>
        <div id='earth'>
          <Link id='LinkHome' to='/Home/1'>START</Link>  
        </div>
      </div>
    )
};
    
export default LandingPage;
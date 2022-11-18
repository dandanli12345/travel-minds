import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ()=>{

    return (
        <>
            <Link className = "navBar" to="/SignIn"> Sign-up </Link>
            <Link className = "navBar" to="/"> Home </Link> 
            <Link className = "navBar" to="/contact"> Contact</Link> 
            <Link className = "navBar" to="/"> Log-out</Link> 
        </>
      );
}

export default Navigation;
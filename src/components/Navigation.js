import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../server/firebase';
import {signOut} from 'firebase/auth';
import { onAuthStateChanged } from "firebase/auth";

const Navigation = ()=>{

    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState({});
    
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            // console.log(user);
        })

        return () => {
            unsub();
        }
    }, []);

    const handleLogOut = (eve) => {
        signOut(auth);
        navigate("/");
    }

    return (
        <>
            {currentUser? null : <Link className = "navBar" to="/login"> Login </Link>}
            <Link className = "navBar" to="/"> Home </Link> 
            <Link className = "navBar" to="/contact"> Contact</Link> 
            {currentUser?<span className = "navBar" onClick={handleLogOut}> Logout</span> : null }    
        </>
      );
}

export default Navigation;
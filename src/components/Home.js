import React, {useEffect, useState} from 'react';
import Globe from './Globe';
import NotesList from './NoteList';
import AddNote from './AddNote';
import { auth } from '../server/firebase';
import { onAuthStateChanged } from "firebase/auth";

const Home = () => {

    const [currentUser, setCurrentUser] = useState({})
    
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            // console.log(user)
        })

        return () => {
            unsub()
        }
    }, []);

    return(
            <div id="globe-add-notes">
                <div id="globe">
                    <Globe/>
                </div>
                {currentUser?
                    <div className="notes-add">
                        <NotesList currentUser={currentUser}/>
                        <AddNote currentUser={currentUser}/>
                    </div> 
                : 
                <h3>Log in to make notes</h3>
                }

            </div>
    )

}

export default Home;
import React,{useState, useEffect} from 'react';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../server/firebase';

const NotesList = ({currentUser}) => {

    const [notes, setNotes] = useState([]);
    const [user, setUser] = useState({})
    
    useEffect(() => {
            setUser(currentUser);
    }, [user,currentUser]);

    //watching notes from the currentUser
    useEffect(()=>{
        if(currentUser.uid){
            let currentPlayerRef = doc(db,"users",currentUser.uid);
            let notesRef = query(collection(currentPlayerRef,"notes"),orderBy("createdAt"));
                
            //get the note array from db
            const unsubscribe = onSnapshot(notesRef, (querySnapshot) => {
                let noteArr = querySnapshot.docs;
                // console.log("noteArr",noteArr);
                setNotes(noteArr);
            });
        
            return unsubscribe;
        }

    },[currentUser])

    useEffect(()=>{
        setNotes(notes);
    },[notes])


    const handleDelete = async(note) =>{
        let noteId = note.id;
        console.log(noteId);
        let currentPlayerRef = doc(db,"users",currentUser.uid);
        await deleteDoc(doc(collection(currentPlayerRef,"notes"),noteId));

    }

    return(
        <>
            <ul className="list">
            {notes.length?<h2>My Notes</h2>:null}
            <div className="notes">
                {notes.map((note,i) => {
                    return(
                        <div key={i} className="single-note">
                            <li>
                                <h3 className="noteTitle">{note.data().title}</h3>
                                <p>{note.data().description}</p>
                            </li>
                            <button className="btn"  onClick={() => handleDelete(note)}><i className="fa fa-close"></i></button>
                        </div>
                    )
                })}
            </div>
            </ul>
        </>
    )
}

export default NotesList;
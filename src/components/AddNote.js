import React, {useState} from 'react';
import { db, auth } from '../server/firebase';
import { addDoc, collection, serverTimestamp, doc } from 'firebase/firestore';

const AddNote = () => {

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');

    const currentUser = auth.currentUser;

    const handleSubmit = async(e) => {
      e.preventDefault();

      if(currentUser.uid){
          let currentPlayerRef = doc(db,"users",currentUser.uid);

          await addDoc(collection(currentPlayerRef, "notes"),{
              userId:currentUser.uid,
              title:title,
              description:description,
              createdAt:serverTimestamp()
          });
      }

      setTitle("");
      setDescription("");

  }

    return(
        <>
          <form className='addNoteForm' onSubmit={handleSubmit}>

            <h2 className="to-see-notes">Add  A  Note</h2>

            <div>
              <label htmlFor='title'></label>
              <input className="note-title" name='title' placeholder="title" value={title} onChange={e => setTitle(e.target.value)} required/>
            </div>
      
            <div>
              <label htmlFor='content'></label>
              <textarea className="note-content" name='description' placeholder="content" value={description} onChange={e => setDescription(e.target.value)} required/>
            </div>
                
            <div>
              <button type='submit'>Add</button>
            </div>
        </form>
      </>
    )

}

export default AddNote;
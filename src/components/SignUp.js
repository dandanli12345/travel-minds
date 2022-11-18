import { FirebaseError } from 'firebase/app';
import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../server/firebase";
import { addDoc, getDocs, collection, query, where } from 'firebase/firestore';

export default function SignIn() {

    const [error, setError] = useState(false);
    const [emptyError, setEmptyError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const provider = new GoogleAuthProvider();

    const signInWithGoogle = async(event) => {
        event.preventDefault();
        setIsSubmitted(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            const docs = await getDocs(q);
            if(docs.docs.length === 0) {
                await addDoc(collection(db,"users"), {
                    uid: user.uid,
                    name:user.displayName,
                    authProvider:"google",
                    email:user.email
                });
            }
        }catch(err) {
            console.log(err);
        }              
    }

    const signup = async(event) => {
        event.preventDefault();
        const email = event.target[0].value;
        const password = event.target[1].value;
        

    }

    return (
        <div className="signup-form">
            <form onSubmit={signup}>
                <div className="input-container">
                    <label>Email </label>
                    <input type="email" name="email" required />

                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />

                </div>

                <button disabled={isSubmitted} type= "submit" >Sign Up</button>
                <button disabled={isSubmitted} onClick ={signInWithGoogle}>Google</button>
                <p >Have an account? <Link to="/login">Sign in</Link></p>
            </form>
        </div>
    )
}

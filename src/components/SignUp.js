import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../server/firebase";
import { addDoc, getDocs, collection, query, where, setDoc, doc } from 'firebase/firestore';

export default function SignIn() {

    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordLengthError, setPasswordLengthError] = useState(false);
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
        setIsSubmitted(false);             
    }

    const signup = async(event) => {
        event.preventDefault();
        setPasswordError(false);
        setPasswordLengthError(false);
        setError(false);

        const email = event.target[0].value;
        const password = event.target[1].value;
        const confirmPassward = event.target[2].value;

        //check if two password input are the same
        if(password !== confirmPassward){
            setPasswordError(true);
        }else if(password.length < 6){
            setPasswordLengthError(true);
        }
        else{
            //to sign up with email and password,setIsSubmitted to avoid click again
            setPasswordError(false);
            setIsSubmitted(true);
            try{
                const res = await createUserWithEmailAndPassword(auth,email,password)
                updateProfile(auth.currentUser, {
                    email:email
                }).then(() =>{
                    console.log(auth.currentUser)
                }).catch((err) =>{
                    console.log(err)
                });

                await setDoc(doc(db,"users",res.user.uid), {
                    uid: res.user.uid,
                    email
                })
                navigate("/");
            }catch(err){
                console.log(err);
                setError(true);
            }
            setIsSubmitted(false);
        }      
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
                <div className="input-container">
                    <label>Confirm Password </label>
                    <input type="password" name="pass-confirm" required />
                </div>

                {passwordError && <span className="msg">Password not matched!</span>}
                {passwordLengthError && <span className="msg">Password must be at least 6 characters long!</span>}
                {error && <span className="msg">Email is already in use, please log in</span>}

                <button disabled={isSubmitted} type= "submit" >Sign Up</button>
                <span> or </span>
                <button disabled={isSubmitted} onClick ={signInWithGoogle}>Google</button>
                <p >Have an account? <Link className="signin-login-link" to="/login">Login</Link></p>
            </form>
        </div>
    )
}

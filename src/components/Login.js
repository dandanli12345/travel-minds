import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../server/firebase";

export default function Login() {
    const [error, setError] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const email = e.target[0].value
        const password = e.target[1].value

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
        } catch (ex) {
            console.log(ex)
            setError(true)
        }
    }

  return (
    <div className="signup-form">
    <form onSubmit={handleSubmit}>
        <div className="input-container">
            <label>Email </label>
            <input type="email" name="email" required />

        </div>

        <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" required />
        </div>

        {error && <span className="msg">Failed to sign in</span>}

        <button  type= "submit" >Login</button>

        <p>Don't have an account? <Link className="signin-login-link" to="/signup">Sign Up</Link> </p>
    </form>
</div>
  )
}
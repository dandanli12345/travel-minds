import React from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';

const Contact = ()=>{

    const navigate = useNavigate();

    const handleSubmit = (eve) => {
        eve.preventDefault();
        emailjs.sendForm("service_rtmz7j6","template_05ot31i", eve.target, "wbuwLJXba01JNCxbe");
        navigate("/thankspage");
    }


    return (
        <div className="form">
            <h1>Send me an email!</h1>
                <form onSubmit={handleSubmit}>
                    <div className="subject-email">
                    <input className = "small-input" type="subject" name="subject" placeholder="Subject" ></input>
                    <br/>
                    <input className = "small-input"type="email" name="email" placeholder="Your email address(optional)" ></input>
                    </div>

                    <div>
                    <textarea className="email-text" type="text" rows = "4" name="text" placeholder="Write your message here" required></textarea>
                    </div>

                    <button type="submit" >Send</button>
                </form>
        </div>
      );
}

export default Contact;
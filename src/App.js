import React from "react";
import { Routes,Route, BrowserRouter} from 'react-router-dom';
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Thankspage from "./components/Thankspage";
import SignUp from "./components/SignUp";

const App = () => {


    return(
      <BrowserRouter>
        <div className="wrapper">
          <nav>{<Navigation/>}</nav>
            <div className="below-nav">
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/contact" element={<Contact/>} />
                <Route path="/thankspage" element={<Thankspage/>} />
                <Route path="/SignIn" element={<SignUp />} />
            </Routes>
            </div>
        </div>
      </BrowserRouter>
    )
}

export default App;
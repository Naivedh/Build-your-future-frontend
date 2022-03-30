import React from 'react';
import {Routes, Route } from "react-router-dom";
import Home from './Home';
import Error from './Error';
import Tutor from './Tutor';


const Routing = (props) => {
    return (
        <div style={{minHeight:"70vh"}}>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/tutor/:id" element={<Tutor/>}/>
                <Route path="/error" element={<Error/>}/>
                <Route path="*" element={<Error/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
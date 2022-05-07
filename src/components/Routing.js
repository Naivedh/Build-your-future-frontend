import React from 'react';
import {Routes, Route } from "react-router-dom";
import Home from './Home';
import Error from './Error';
import Tutor from './Tutor';
import Login from './Login';
import SignUp from './SignUp';
import Appointment from './Appointment';
import Course from './Course';
import Profile from './Profile';
import Favourite from './Favorite';

const Routing = (props) => {
    return (
        <div style={{minHeight:"70vh"}}>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/signup" element={<SignUp/>}/>
                <Route exact path="/tutor/:id" element={<Tutor/>}/>
                <Route exact path="/course/:id" element={<Course/>}/>
                <Route exact path="/appointments" element={<Appointment/>}/>
                <Route exact path="/favourite" element={<Favourite/>}/>
                <Route path="/error" element={<Error/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="*" element={<Error/>}/>
               
            </Routes>
        </div>
    );
}

export default Routing;
import React, { useContext, useEffect, useState } from 'react';
import {Routes, Route, Navigate } from "react-router-dom";
import Home from './Home';
import Error from './Error';
import Tutor from './Tutor';
import Login from './Login';
import SignUp from './SignUp';
import Appointment from './Appointment';
import Course from './Course';
import Profile from './Profile';
import Favourite from './Favorite';
import { httpPost } from '../utils/api';
import { useAuthContext } from '../context/AuthContextProvider';
import Loader from './Loader';


const PrivateRoute = ({ children, path, authConfig }) => {

    if (authConfig === null && path !== '/') {
        return <Navigate to='/login' />
    }

    if (path === '/') { // id issue
        if (authConfig?.isTutor) {
            return <Navigate to={`/tutor/${authConfig._id}`} />
        } else {
            return children;
        }
    }
    return (
        children
    );
};


const Routing = (props) => {
    const [loader, setLoader] = useState(true);
    const [authConfig, setAuthConfig] = useAuthContext();

    useEffect(() => {
        (async () => {
            try {
                const data = await httpPost('/authapi/check');
                setAuthConfig(data);
                setLoader(false);
            } catch (err) {
                setAuthConfig(null);
                setLoader(false);
            }
        })();
    }, []);

    return (
        <div style={{minHeight:"70vh"}}>
            { loader 
             ? <Loader />
            : (
            <Routes>
                <Route exact path="/" element={<PrivateRoute authConfig={authConfig} path='/'><Home /></PrivateRoute>}/>
                <Route exact path="/login" element={authConfig ? <Navigate to='/'/> : <Login/>}/>
                <Route exact path="/signup" element={authConfig ? <Navigate to='/'/> : <SignUp/>}/>
                <Route exact path="/tutor/:id" element={<PrivateRoute authConfig={authConfig}><Tutor/></PrivateRoute>}/>
                <Route exact path="/course/:id" element={<PrivateRoute authConfig={authConfig}><Course/></PrivateRoute>}/>
                <Route exact path="/appointments" element={<PrivateRoute authConfig={authConfig}><Appointment/></PrivateRoute>}/>
                <Route exact path="/favourite" element={<PrivateRoute authConfig={authConfig}><Favourite/></PrivateRoute>}/>
                <Route path="/error" element={<Error/>}/>
                <Route path="/profile" element={<PrivateRoute authConfig={authConfig}><Profile/></PrivateRoute>}/>
                <Route path="*" element={<Error/>}/>
            </Routes>) 
            }
        </div>
    );
}

export default Routing;
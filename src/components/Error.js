import React from 'react';
import { Link } from 'react-router-dom';

import '../css/Error.css'

const Error = (props) => {
    return (
        <div className='error'>
            <p>404 Not Found</p>
            <Link to="/">
                <button className="btn btn-secondary error__home">
                        <span>Back to home page</span> <i class="bi bi-house-door-fill"></i>                    
                </button>
            </Link>
        </div>
    );
}

export default Error;
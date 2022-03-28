import React from 'react';
import { useParams } from "react-router-dom";
const Tutor = (props) => {
    const params = useParams();
    return (
        <div className="container">
            {/* hello {params.id} */}
            <div className="row">
                <div className="col-md-6">

                </div>
                <div className="col-md-6">

                </div>
            </div>
        </div>
    );
}

export default Tutor;
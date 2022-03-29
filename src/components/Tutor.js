import React from 'react';
import { useParams } from "react-router-dom";
import { useTutor } from '../TutorContextProvider';

import "../css/Tutor.css"

const Tutor = (props) => {
    const data = useTutor();
    const params = useParams();

    const tutor = data.instructors.filter(tutor => tutor.id === params.id)[0];
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="tutor__tutor__image__container">
                        <img src={tutor.imageUrl} className="tutor__tutor__image" alt={tutor.name}/>
                        <p className="tutor__tutor__email">{tutor.email}</p>
                        <p className="tutor__tutor__stars">
                            {Array.from({ length: tutor.stars }, (_, i) =><i key={i} className="bi bi-star-fill"></i>)}
                        </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <p className="tutor__tutor__name">{tutor.name}</p>
                    <p className="tutor__tutor__about">{tutor.about}</p>
                    <p className="tutor__tutor__desc">{tutor.desc}</p>
                </div>
            </div>
        </div>
    );
}

export default Tutor;
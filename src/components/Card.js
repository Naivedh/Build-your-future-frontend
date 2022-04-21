import React from 'react';
import { Link } from "react-router-dom";
import '../css/Home.css';
import '../css/Card.css';

//second undefined
const renderCourseNames = (courses) => {
    let courseName = courses[0].name;
    //more than 2 do something.
    for(let i = 1; i<courses.length; i++){
        courseName+=`, ${courses[i].name}`;
    }
    return courseName;
}

const Card = (data, isTutorData, isEditable) => data.map(dataPoint => {
    return (
        <div className="col-lg-4" key={dataPoint._id}>
            <div className={`card__content ${isTutorData?  "card__content__hover" :  "card__content__nohover"}`}>
                <img src={`../../static/${dataPoint.img}`} alt={dataPoint.name} className="rounded-circle home__portrait"/> 
                <h5>{dataPoint.name}</h5>
                <p className="card-text home__tutor__stars mb-0">
                    <small className="text-muted">
                            {Array.from({ length: dataPoint.rating }, (_, i) =><i key={i} className="bi bi-star-fill"></i>)}
                    </small>
                    </p>
                    {isTutorData?
                        <>
                            <p>{renderCourseNames(dataPoint.courses)}</p>
                            <Link to={`/tutor/${dataPoint._id}`}>
                                <p className={`btn btn-secondary ${isTutorData?  "card__btn__secondary" :  "" }`}>View details &raquo;</p>
                            </Link>
                        </>
                    :<>
                        {/* do not remove p tag => for spacing */}
                        <p></p> 
                        <Link to={`/course/${dataPoint._id}`}>
                            <p className={`btn btn-secondary ${isTutorData?  "" :  "card__button" }`}>View details &raquo;</p>
                        </Link>
                    </>
                    }
            </div>
        </div>
        ); 
});

export default Card;
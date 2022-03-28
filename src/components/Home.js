import React from 'react';
import {Link} from "react-router-dom";
import '../css/Home.css';
import data from '../instructors.json';

const Home = (props) => {
    const renderCourseNames = (courses) => {
        let courseName = courses[0].title;
        //more than 2 do something.
        for(let i = 1; i<courses.length; i++){
            courseName+=`, ${courses[i].title}`;
        }
        return courseName;
    }

    const renderData = (data) => 
        data.instructors.map(tutor => {
            return (
                <div className="col-md-4" key={tutor.id}>
                    <div className="card">
                        <div className="row g-0">
                            <div className="col-md-4 home__image__container">
                                <img src={tutor.imageUrl} className=" img-fluid home__tutor__image" alt={tutor.name}/>
                            </div>
                            <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{tutor.name}</h5>
                                <p className="card-text mb-2">{tutor.about}</p>
                                <p className="card-text mb-0">
                                    <small className="text-muted">
                                        {renderCourseNames(tutor.courses)}
                                    </small>
                                </p>
                                <p className="card-text mb-0">
                                    <small className="text-muted">
                                        {tutor.stars} star        
                                    </small>
                                </p>
                                <button type="button" class="btn btn-secondary my-2">
                                    <Link to={`/tutor/${tutor.id}`}>Profile</Link>
                                </button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                ); 
        });


    return (
        <div className="home">
                <div className="row home__row">
                    {
                        renderData(data)
                    }
            </div>
        </div>
    );
}

export default Home;
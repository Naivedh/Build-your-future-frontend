import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useTutor } from '../TutorContextProvider';
import '../css/Home.css';
import { useFilterSearch ,useSearch } from '../SearchContextProvider';

const Home = (props) => {
    const originalData = useTutor().instructors;
    const [data, setData] = useState(useTutor().instructors);
    const [search, setSearch] = useSearch();
    const [filterText, setFiltertext] = useFilterSearch();

    useEffect(()=>{
        //navbar
        setSearch(true);
        return () => {
            setSearch(false);
        }
    }, []);

   useEffect(() => {
    if (filterText !== "") {
        const instructorNameMatches = originalData.filter(instructor => instructor.name.toLowerCase().startsWith(filterText.toLowerCase()));
        const courseNameMatches = originalData.filter(instructor => {
            const courses = instructor.courses;
            for(let i=0; i<courses.length; i++) {
                const { title } = courses[i];
                if (title.toLowerCase().startsWith(filterText.toLowerCase())) {
                    return true;
                }
            }
            return false;
        });
        setData([...instructorNameMatches, ...courseNameMatches]);
    } else {
        setData(originalData);
    }
   }, [filterText])
    
    
    const renderCourseNames = (courses) => {
        let courseName = courses[0].title;
        //more than 2 do something.
        for(let i = 1; i<courses.length; i++){
            courseName+=`, ${courses[i].title}`;
        }
        return courseName;
    }

    const renderData = (data) => 
        data.map(tutor => {
            return (
                <div className="col-lg-4" key={tutor.id}>
                    <div className="card">
                        <div className="row g-0">
                            <div className="col-md-4 home__image__container">
                                    <img src={`./static/${tutor.img}`} className="home__tutor__image" alt={tutor.name}/>
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
                                <p className="card-text home__tutor__stars mb-0">
                                    <small className="text-muted">
                                        {Array.from({ length: tutor.stars }, (_, i) =><i key={i} className="bi bi-star-fill"></i>)}
                                    </small>
                                </p>
                                <Link to={`/tutor/${tutor.id}`}>
                                    <button type="button" className="btn btn-secondary my-2">
                                        Profile
                                    </button>
                                </Link>
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
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <div className="home__tutor col-lg-4" key={tutor._id}>
                    <div className="home__tutor__content">
                        <img src={`./static/${tutor.img}`} alt={tutor.name} className="rounded-circle home__portrait"/> 
                        <h5>{tutor.name}</h5>
                        <p className="card-text home__tutor__stars mb-0">
                            <small className="text-muted">
                                    {Array.from({ length: tutor.stars }, (_, i) =><i key={i} className="bi bi-star-fill"></i>)}
                            </small>
                            </p>
                        <p>{renderCourseNames(tutor.courses)}</p>
                        <Link to={`/tutor/${tutor._id}`}>
                            <p className="btn btn-secondary">View details &raquo;</p>
                        </Link>
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
import React, { useEffect, useState } from 'react';
import { useTutor } from '../TutorContextProvider';
import '../css/Home.css';
import { useFilterSearch ,useSearch } from '../SearchContextProvider';
import Card from './Card';

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
    
    

    return (
        <div className="home">
                <div className="row home__row">
                    {   
                    // true: isTutor false:cannot edit
                        Card(data, true, false)
                    }
            </div>
        </div>
    );
}

export default Home;
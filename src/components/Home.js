import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import { useFilterSearch ,useSearch } from '../context/SearchContextProvider';
import Card from './Card';
import Loader from'./Loader';
import { httpGet } from '../utils/api';

const Home = () => {
    // const originalData = useTutor().instructors;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    // const [search, setSearch] = useSearch();
    // const [filterText, setFilterText] = useFilterSearch();

    useEffect(()=>{
        (async ()=>{
            try{
                const data = await httpGet("/tutorapi/tutors")
                console.log(data)
                setData(data);
                setLoading(false);
            }catch(err){
                console.log(err)
            }
        })()
    },[]);

//    useEffect(() => {
//     if (filterText !== "") {
//         const instructorNameMatches = data.filter(instructor => instructor.name.toLowerCase().startsWith(filterText.toLowerCase()));

//         const courseNameMatches = data.filter(instructor => {
//             const courses = instructor.courses;
//             for(let i=0; i<courses.length; i++) {
//                 const { name } = courses[i];
//                 if (name.toLowerCase().startsWith(filterText.toLowerCase())) {
//                     return true;
//                 }
//             }
//             return false;
//         });
//         setData([...instructorNameMatches, ...courseNameMatches]);
//     } else {
//         setData(data);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//    }, [filterText])
    
//    useEffect(()=>{
//     //navbar
//     setSearch(true);
//     return () => {
//         setSearch(false);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);
    
   if(loading){
    return(
        <Loader/>
    );
   }
   if(!loading){
    return (
        <div className="home">
                <div className="row home__row"> 
                    {/* true: isTutor false:cannot edit */}
                        <Card data={data} isTutorData={true} isEditable={false}/>
            </div>
        </div>
    );
   }
}

export default Home;
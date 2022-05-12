import React, { useEffect, useState } from "react";
import "../css/Tutor_Course.css";
import "../css/Home.css";
import "../css/Card.css";
import Loader from "./Loader";
import { httpGet, httpPost } from "../utils/api";
import { Link } from "react-router-dom";

const Favourite = () => {
  const [loading, setLoading] = useState(true);
  const [favourite, setFavourite] = useState();

  useEffect(() => {
    (async () => {
      try {
        const data = await httpGet(`/studentapi/studentFavourite`);
        console.log(data);
        setFavourite(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleFavourite = async(tutorId) => {
    setLoading(true)
    try {
      const data = await httpPost(`/studentapi/studentFavourite`,{tutorId});
      if(data)
        setFavourite(favourite.filter((fav)=>fav.tutorId!==tutorId))
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
 
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="row home__row">
       {  favourite.length?favourite.map((fav)=>
          <div className="col-lg-4" key={fav._id}>
            <div className="card__content card__content__nohover">
              <div className="row justify-content-end"></div>
              <div className="row justify-content-center">
                <img
                  src={fav.tutorImageUrl}
                  alt={fav.tutorName}
                  className="rounded-circle home__portrait"
                />
                <h5>{fav.tutorName}</h5>
                <p></p>
                <Link to={`/tutor/${fav.tutorId}`}>
                  <p className="btn btn-secondary card__button">View details »</p>
                </Link>
                
                <p className="btn btn-danger" onClick={()=>handleFavourite(fav.tutorId)}>Remove Favourite</p>
              </div>
            </div>
          </div>
          ):<div className="container text-center">
            <h2>No Favourite's Yet</h2>
          </div>
       }
      </div>
    </div>
  );
};

export default Favourite;

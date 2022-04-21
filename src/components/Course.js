import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTutor } from "../TutorContextProvider";

const Course = (props) => {
  const data = useTutor();
  const params = useParams();
  const navigate = useNavigate();

  let course;
  for(let i =0; i<data.instructors.length; i++ ){
    for(let j =0; j<data.instructors[i].courses.length; j++){
        if(data.instructors[i].courses[j]._id === params.id){
            course = data.instructors[i].courses[j]
        }
    }
  }

  useEffect(() => {
    if (course === undefined) {
      navigate("/error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (course === undefined) {
    return "";
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="tutor__tutor__image__container">
            <img
              src={`../../static/${course.img}`}
              className="tutor__tutor__image"
              alt={course.name}
            />
            <p className="tutor__tutor__stars">
              {Array.from({ length: course.rating }, (_, i) => (
                <i key={i} className="bi bi-star-fill"></i>
              ))}
            </p>
          </div>
        </div>
        <div className="col-lg-6">
          <p className="tutor__tutor__name">{course.name}</p>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Arcu risus quis varius quam. Sem et tortor consequat id porta nibh. Ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus. Vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt. Senectus et netus et malesuada fames ac turpis egestas maecenas. Egestas dui id ornare arcu odio. In hac habitasse platea dictumst quisque sagittis. Dolor sit amet consectetur adipiscing elit ut aliquam. Adipiscing diam donec adipiscing tristique risus nec feugiat. Orci nulla pellentesque dignissim enim sit amet venenatis urna. Ornare lectus sit amet est placerat in egestas erat imperdiet. Convallis aenean et tortor at risus viverra adipiscing at in. Volutpat lacus laoreet non curabitur gravida arcu ac tortor. Ac tortor vitae purus faucibus ornare suspendisse sed.</p>
<div class="text-center">
          <button
                type="button"
                class="btn btn-success m-4"
                data-dismiss="modal"
              >
                Enroll
              </button>

              <br/> <button
                type="button"
                class="btn btn-warning m-4"
                data-dismiss="modal"
              >
                Favorite
              </button>
              <button
                type="button"
                class="btn btn-secondary m-4"
                data-dismiss="modal"
              >
                appointment
              </button>
              </div>

          {/* <p className="tutor__tutor__about">{tutor.about}</p>
                <p className="tutor__tutor__desc">{tutor.desc}</p> */}
        </div>
      </div>
      <div className="row course__heading">
        <p>Comments</p>
      </div>
    </div>
  );
};

export default Course;

import React from "react";

function Loader(props) {
  return (
    <div className="d-flex justify-content-center" style={{margin:"5rem"}}>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;

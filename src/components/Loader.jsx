import React from "react";

const Loader = ({ loaderMargin }) => {
  return (
    <div style={loaderMargin} className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden"></span>
      </div>
    </div>
  );
};

export default Loader;

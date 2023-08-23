import React from "react";
import ReactHtmlParser from "react-html-parser";

const Error = ({ message }) => {
  return (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>{ReactHtmlParser(message)}</h4>
    </div>
  );
};

export default Error;
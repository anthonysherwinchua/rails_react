import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <>
    <div className="p-5 m-4 bg-light rounded-3">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">
          This is the Homepage
        </h1>
        <p className="fs-4">
          This is the landing page for this project. Click on the link below to go the categories listing page.
        </p>
        <Link
          to="/categories"
          className="btn btn-primary btn-lg"
          role="button"
        >
          View Categories
        </Link>
      </div>
    </div>
  </>
);


import React, { } from "react";
import { Link } from "react-router-dom";

const CategoryNew = () => {
  return (
    <>
      <Link to="/" className="btn btn-link">
        Home
      </Link>
      <Link to="/categories" className="btn btn-link">
        Categories
      </Link>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container">
          <h1 className="display-4">New Category Page</h1>
          <p className="lead text-muted">
            Here is the form to create a new category page
          </p>
        </div>
      </section>
      <div>
        <main className="container">
          <div className="row justify-content-center">
            Form is under construction
          </div>
        </main>
      </div>
    </>
  );
};

export default CategoryNew;
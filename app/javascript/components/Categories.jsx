import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(Array(0));
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage(fetchingCategories);

    const url = "/api/v1/categories";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          setErrorMessage(noCategoryFound)
        }
      })
      .then((res) => {
        if (res !== undefined) {
          setCategories(res)
        }
      })
      .catch((e) => setErrorMessage(e));
  }, []);

  const noCategoryFound = (
    <h4>
      No categories yet.Why not <Link to="/new_category">create one</Link>
    </h4>
  );

  const fetchingCategories = (
    <h4>
      Fetching categories. Please wait
    </h4>
  );

  const noCategory = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      {errorMessage}
    </div>
  );

  const allCategories = categories.map((category, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{category.name}</h5>
          <Link to={`/category/${category.id}`} className="btn custom-button">
            View Category
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <Link to="/" className="btn btn-link">
        Home
      </Link>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container">
          <h1 className="display-4">List of Categories</h1>
          <p className="lead text-muted">
            Here are the list of all categories available
          </p>
        </div>
      </section>
      <div>
        <main className="container">
          <div className="text-end mb-3">
            <Link to="/new_category" className="btn custom-button">
              Create New Category
            </Link>
          </div>
          <div className="row">
            {categories.length > 0 ? allCategories : noCategory}
          </div>
        </main>
      </div>
    </>
  );
};

export default Categories;
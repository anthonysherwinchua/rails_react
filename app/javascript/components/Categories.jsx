import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { handleResponse } from '../components/helpers/handleResponse'
import ReactHtmlParser from "react-html-parser";

const Categories = () => {
  const [categories, setCategories] = useState(Array(0));
  const [message, setMessage] = useState('Fetching categories. Please wait');

  useEffect(() => {
    const url = "/api/v1/categories";
    fetch(url)
      .then(res => {
        handleResponse(res, (r) => {
          if (r.status == 'error') {
            setMessage(r.data.error)
          } else {
            setCategories(r.data)
          }
        })
      })
      .catch((e) => {
        setMessage('Something went wrong. <br/>Error Message: ' + e)
      });
  }, []);

  const noCategory = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>{ReactHtmlParser(message)}</h4>
    </div>
  );

  const allCategories = categories.map((category, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{category.name}</h5>
          <Link to={`/categories/${category.id}`} className="btn custom-button">
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
      <Link to="/categories" className="btn btn-link">
        Categories
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
            <Link to="/categories/new" className="btn custom-button">
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
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { handleResponse } from './helpers/handleResponse'
import Error from "./views/common/Error";
import CategoryPanel from "./views/categories/CategoryPanel";

const Categories = () => {
  const [categories, setCategories] = useState(Array(0));
  const [message, setMessage] = useState('Fetching categories. Please wait');

  useEffect(() => {
    const url = "/api/v1/categories";
    fetch(url)
      .then(res => {
        return handleResponse(res, (r) => {
          if (r.status == 'error') {
            setMessage(r.data.error);
          } else {
            setCategories(r.data);
          }
        });
      })
      .catch((e) => {
        setMessage('Something went wrong. <br/>Error Message: ' + e);
      });
  }, []);

  const allCategories = categories.map((category, key) => (
    <CategoryPanel key={key} category={category} />
  ));

  let content;
  if (categories.length > 0) {
    content = allCategories;
  } else {
    content = <Error message={message}></Error>
  }

  return (
    <>
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
            {content}
          </div>
        </main>
      </div>
    </>
  );
};

export default Categories;
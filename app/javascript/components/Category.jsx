import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Category = () => {
  const params = useParams();
  const [category, setCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage(fetchingCategory);

    const url = `/api/v1/categories/${params.id}`;
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
          setCategory(res)
        }
      })
      .catch((e) => setErrorMessage(e));
  }, []);

  const noCategoryFound = (
    <h4>
      Category not found.
    </h4>
  );

  const fetchingCategory = (
    <h4>
      Fetching category details. Please wait
    </h4>
  );

  const noCategory = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      {errorMessage}
    </div>
  );

  const categoryDetail = (
    <div className="col-6">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{category.name}</h5>

          <table className="table table-borderless">
            <tr>
              <td>ID</td>
              <td>{category.id}</td>
            </tr>
            <tr>
              <td>Created At</td>
              <td>{category.created_at}</td>
            </tr>
            <tr>
              <td>Updated At</td>
              <td>{category.updated_at}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );

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
          <h1 className="display-4">Category Detail Page</h1>
          <p className="lead text-muted">
            Here are the details of {category.name}
          </p>
        </div>
      </section>
      <div>
        <main className="container">
          <div className="row justify-content-center">
            {category !== undefined ? categoryDetail : noCategory}
          </div>
        </main>
      </div>
    </>
  );
};

export default Category;
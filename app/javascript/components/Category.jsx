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
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td className="text-end">ID</td>
                <td>{category.id}</td>
              </tr>
              <tr>
                <td className="text-end">Name</td>
                <td>{category.name}</td>
              </tr>
              <tr>
                <td className="text-end">Created At</td>
                <td>{category.created_at}</td>
              </tr>
              <tr>
                <td className="text-end">Updated At</td>
                <td>{category.updated_at}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container">
          <h1 className="display-4"> {category.name}</h1>
        </div>
      </section>
      <div>
        <main className="container">
          <div className="row justify-content-center">
            {category !== undefined ? categoryDetail : noCategory}
          </div>
          <div className="row justify-content-center">
            <div className="col-md-3 justify-content-center">
              <div className="d-grid gap-2">
                <Link to={`/categories/${category.id}/edit`} className="btn btn-primary">
                  Edit Category
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Category;
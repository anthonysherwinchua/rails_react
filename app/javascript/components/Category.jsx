import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { handleResponse } from './helpers/handleResponse'
import Confirm from './views/common/Confirm'

const Category = () => {
  const navigate = useNavigate();
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

  const deleteCategory = () => {
    const url = `/api/v1/categories/${params.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        handleResponse(res, (r) => {
          if (r.status == 'error') {
            const errorMessages = r.data.map((message, key) => (
              <Error key={key} message={message} />
            ));
            setMessage(errorMessages)
          } else {
            navigate(`/categories`)
          }
        })
      })
      .catch((e) => {
        setMessage('Something went wrong. <br/>Error Message: ' + e)
      });
  };

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
                <td className="text-end">Tag</td>
                <td>{category.tag}</td>
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
                <Link className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmModal">
                  Delete Category
                </Link>
                <Confirm modalID="confirmModal" title={"Deleting Category: " + category.name} message="Are you sure?" confirm="Delete!" cancel="No" onConfirm={deleteCategory} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Category;
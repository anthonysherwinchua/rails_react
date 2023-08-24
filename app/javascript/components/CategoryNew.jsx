import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleResponse } from './helpers/handleResponse'
import Error from './views/common/Error'

const CategoryNew = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [message, setMessage] = useState('');

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/categories";

    if (name.length == 0)
      return;

    const body = {
      name,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(res => {
        handleResponse(res, (r) => {
          if (r.status == 'error') {
            const errorMessages = r.data.map((message, key) => (
              <Error key={key} message={message} />
            ));
            setMessage(errorMessages)
          } else {
            navigate(`/categories/${r.data.id}`)
          }
        })
      })
      .catch((e) => {
        setMessage('Something went wrong. <br/>Error Message: ' + e)
      });
  };

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container">
          <h1 className="display-4">New Category Page</h1>
          <p className="lead text-muted">
            Here is the form to create a new category page
          </p>
          {message}
        </div>
      </section>
      <div>
        <main className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="recipeName">Category name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    required
                    onChange={(event) => onChange(event, setName)}
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Save
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CategoryNew;
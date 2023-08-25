import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleResponse } from './helpers/handleResponse'
import Error from './views/common/Error'

const CategoryNew = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [tag, setTag] = useState("");
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function isDisabled() {
    return ((name.length <= 0 || category.name == name) && (tag.length <= 0 || category.tag == tag))
  }

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
          setName(res.name)
          setTag(res.tag)
        }
      })
      .catch((e) => setErrorMessage(e));
  }, []);

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = `/api/v1/categories/${params.id}`;

    if (isDisabled())
      return;

    const body = {
      name,
      tag
    };

    document.querySelectorAll('.is-invalid').forEach(function (input) {
      input.classList.remove('is-invalid')
    })

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(res => {
        handleResponse(res, (r) => {
          if (r.status == 'error') {
            let errorMessages = []
            Object.keys(r.data).forEach(function (key) {
              var message = r.data[key]
              errorMessages.push(
                <Error key={key} message={key + " " + message} />
              )
              const inputField = document.getElementById(key)
              inputField.classList.add('is-invalid')
            })
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

  const categoryForm = (
    <div className="col-md-6">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Category name</label>
          <input type="text" name="name" id="name" className="form-control" defaultValue={category.name} required onChange={(event) => onChange(event, setName)} />
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input type="text" name="tag" id="tag" className="form-control" defaultValue={category.tag} required onChange={(event) => onChange(event, setTag)} />
        </div>
        <button type="submit" className="btn btn-primary mt-3" disabled={isDisabled()}>
          Save
        </button>
      </form>
    </div >
  )

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container">
          <h1 className="display-4">Edit Category Page</h1>
          <p className="lead text-muted">
            Here is the form to create a new category page
          </p>
          {message}
        </div>
      </section>
      <div>
        <main className="container">
          <div className="row justify-content-center">
            {category !== undefined ? categoryForm : noCategory}
          </div>
        </main>
      </div>
    </>
  );
};

export default CategoryNew;
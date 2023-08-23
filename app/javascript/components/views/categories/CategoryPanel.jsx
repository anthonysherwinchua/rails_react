import React from "react";
import { Link } from "react-router-dom";

const CategoryPanel = ({ index, category }) => {
  return (
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
  );
};

export default CategoryPanel;
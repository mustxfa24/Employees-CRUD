import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./view.css";

const View = () => {
  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((res) => setUser({ ...res.data[0] }));
  }, [id]);
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>Employee Details</p>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>First Name: </strong>
          <span>{user.first_name}</span>
          <br />
          <br />
          <strong>Last Name: </strong>
          <span>{user.last_name}</span>
          <br />
          <br />
          <strong>Job Description </strong>
          <span>{user.job_desc}</span>
          <br />
          <br />
          <strong>Email Address: </strong>
          <span>{user.email}</span>
          <br />
          <br />
          <strong>Phone Number: </strong>
          <span>{user.phone_num}</span>
          <br />
          <br />
          <strong>Department: </strong>
          <span>{user.department}</span>
          <br />
          <br />
          <Link to="/">
            <div className="btn btn-view">Back</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;

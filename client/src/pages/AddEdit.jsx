import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./addEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  first_name: "",
  last_name: "",
  job_desc: "",
  email: "",
  phone_num: "",
  department: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);

  const {
    first_name,
    last_name,
    job_desc,
    email,
    phone_num,
    department,
  } = state;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((res) => setState({ ...res.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !first_name ||
      !last_name ||
      !job_desc ||
      !email ||
      !phone_num ||
      !department
    ) {
      toast.error("Please provide a value into each input field!");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/post", {
            first_name,
            last_name,
            job_desc,
            email,
            phone_num,
            department,
          })
          .then(() => {
            setState({
              first_name: "",
              last_name: "",
              job_desc: "",
              email: "",
              phone_num: "",
              department: "",
            });
          })
          .catch((error) => toast.error(error.response.data));
        toast.success("Employee added successfully!");
      } else {
        axios
          .put(`http://localhost:5000/api/update/${id}`, {
            first_name,
            last_name,
            job_desc,
            email,
            phone_num,
            department,
          })
          .then(() => {
            setState({
              first_name: "",
              last_name: "",
              job_desc: "",
              email: "",
              phone_num: "",
              department: "",
            });
          })
          .catch((error) => toast.error(error.response.data));
        toast.success("Employee updated successfully!");
      }
      setTimeout(() => navigate(`/`), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          placeholder="Employee First Name"
          value={first_name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          placeholder="Employee Last Name"
          value={last_name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="job_desc">Job Description</label>
        <input
          type="text"
          id="job_desc"
          name="job_desc"
          placeholder="Employee Job Description"
          value={job_desc || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Valid Employee Email Address"
          value={email || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="phone_num">Phone Number</label>
        <input
          type="number"
          id="phone_num"
          name="phone_num"
          placeholder="Employee Phone Number (No dashes!)"
          value={phone_num || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="department">Department</label>
        <input
          type="text"
          id="department"
          name="department"
          placeholder="Employee Department (ex: Information Technology)"
          value={department || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/">
          <input type="button" value="Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;

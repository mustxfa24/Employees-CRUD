import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteEmployee = (id) => {
    if (window.confirm("Are you sure that you want to delete this employee?")) {
      axios.delete(`http://localhost:5000/api/delete/${id}`);
      toast.success("Employee was deleted!");
      setTimeout(() => loadData(), 500);
    }
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <Link to="/addEmployee">
        <button className="btn btn-employee">Add Employee</button>
      </Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Employee ID</th>
            <th style={{ textAlign: "center" }}>First Name</th>
            <th style={{ textAlign: "center" }}>Last Name</th>
            <th style={{ textAlign: "center" }}>Job Description</th>
            <th style={{ textAlign: "center" }}>Email Address</th>
            <th style={{ textAlign: "center" }}>Phone Number</th>
            <th style={{ textAlign: "center" }}>Department</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.job_desc}</td>
                <td>{item.email}</td>
                <td>{item.phone_num}</td>
                <td>{item.department}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteEmployee(item.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/view/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

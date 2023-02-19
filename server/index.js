const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employee_crud_schema",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// api to get backend data and show up on the react front end
app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM employees";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  const { first_name, last_name, job_desc, email, phone_num, department } =
    req.body;
  const sqlInsert =
    "INSERT INTO employees (first_name, last_name, job_desc, email, phone_num, department) VALUES (?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [first_name, last_name, job_desc, email, phone_num, department],
    (error, result) => {
      if (error) {
        console.log(error);
      }
    }
  );
});

app.delete("/api/delete/:id", (req, res) => {
  const { id } = req.params;
  const sqlDelete = "DELETE FROM employees WHERE id = ?";
  db.query(sqlDelete, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM employees WHERE id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, job_desc, email, phone_num, department } =
    req.body;
  const sqlUpdate =
    "UPDATE employees SET first_name = ?, last_name = ?, job_desc = ?, email = ?, phone_num = ?, department = ? WHERE id = ?";
  db.query(
    sqlUpdate,
    [first_name, last_name, job_desc, email, phone_num, department, id],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});

app.get("/", (req, res) => {
  // const sqlInsert =
  //   "INSERT INTO employees (first_name, last_name, job_desc, email_address, phone_number, department) VALUES ('John', 'Doe', 'Product Manager', 'johndoe@email.com', '000-000-0001', 'Information Technology')";
  // db.query(sqlInsert, (error, result) => {
  //   console.log("error", error);
  //   console.log("result", result);
  //   res.send("Employee has been created!");
  // });
  res.send("Hello Express!");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000!");
});

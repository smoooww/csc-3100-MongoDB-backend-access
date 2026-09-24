import express from "express";
import cors from "cors";

import userServices from "./models/user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query["name"];
  const job = req.query["job"];
  userServices
    .getUsers(name, job)
    .then((result) => {
      res.send({ users_list: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error ocurred in the server.");
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  userServices
    .findUserById(id)
    .then((result) => {
      if (result === undefined || result === null)
        res.status(404).send("Resource not found.");
      else {
        res.send({ users_list: result });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occured in the server.");
    });
});

app.post("/users", (req, res) => {
  const user = req.body;
  userServices
    .addUser(user)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occured in the server.");
    });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  userServices
    .deleteUserById(id)
    .then((deletedUser) => {
      if (deletedUser === null) res.status(404).send("Resource not found.");
      else res.status(204).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occured in the server.");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

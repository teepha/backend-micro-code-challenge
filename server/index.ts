import express from "express";

const app = express();
const port = 2020;

app.get("/", (req, res) => {
  res.send("Welcome to Micro-code challenge!");
});

app.all("*", (req, res) => {
  res.status(400).send({ message: "Route/Endpoint does not exist!!!" });
});

app.listen(port, error => {
  if (error) {
    return console.error(error);
  }
  return console.log(`Server is listening on ${port}`);
});

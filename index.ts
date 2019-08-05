import express, { Application, Request, Response, NextFunction } from "express";
import routes from "./route";

const app: Application = express();
const port = 2020;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Micro-code challenge!");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/", routes);

app.all("*", (req: Request, res: Response) => {
  res.status(400).send("Route/Endpoint does not exist!!!");
});

app.listen(port, error => {
  if (error) {
    return console.error(error);
  }
  return console.log(`Server is running on ${port}`);
});

export default app;

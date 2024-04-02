import express, { NextFunction, Request, Response } from "express";

//import cors from 'cors'
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const port =   parseInt(<string>process.env.PORT) || 3000;

//const server = Server(app);

// Routes
app.use("/restaurant", require("./src/restaurants.routes"));

// Guard Routes
app.use((req, res, next) => {
  const error = {
    status: 404,
    message: "Route not found",
  };
  next(error);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500);
  console.log("ERROR", error);
  res.json({
    error: {
      message: error.message,
      status: res.status,
    },
  });
});

app.use(express.static("public"));

app.listen(port, "0.0.0.0", function(){console.log(`Server listening on port ${port}!`)});

import express, { Request, Response, json } from "express";
import { testSqlConnection } from "./config/sqlConfig";
import user_router from "./routes/userRouters";
// import {Routes}

const app = express();
app.use(json());
// app.use((error: Error, req: Request, res: Response) => {
//   res.json({
//     message: error.message,
//   });
// });
app.use("/user", user_router);

app.listen(3800, () => {
  console.log("server is running on 3800");
  testSqlConnection();
});

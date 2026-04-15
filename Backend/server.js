// // // import "dotenv/config";
// // // import express, { application } from "express";
// // // import cors from "cors";
// // // import connectDB from "./config/mongodb.js";
// // // import connectCloudinary from "./config/cloudnary.js";
// // // import adminRouter from "./routes/adminRoute.js";

// // // import doctorRouter from "./routes/doctorRoute.js";
// // // import userRouter from "./routes/usersRoute.js";

// // // //app config

// // // const app = express();
// // // const port = process.env.PORT || 4000;

// // // connectDB();
// // // connectCloudinary();

// // // //middlewares
// // // app.use(express.json());
// // // app.use(cors());

// // // //api end points
// // // app.use("/api/admin", adminRouter);
// // // app.use("/api/doctor", doctorRouter);
// // // app.use("/api/user", userRouter);

// // // app.get("/", (req, res) => {
// // //   res.send("Hello I am working Dude 😎");
// // // });

// // // app.listen(port, () => console.log(`\nserver is running on ${port}`));

// // import dotenv from "dotenv";
// // dotenv.config(); // ✅ load .env

// // import express from "express";
// // import cors from "cors";
// // import connectDB from "./config/mongodb.js";
// // import connectCloudinary from "./config/cloudnary.js";

// // import adminRouter from "./routes/adminRoute.js";
// // import doctorRouter from "./routes/doctorRoute.js";
// // import userRouter from "./routes/usersRoute.js";

// // // app config
// // const app = express();
// // const port = process.env.PORT || 4000;

// // // 🔍 DEBUG (remove later)
// // console.log("MONGO_URI:", process.env.MONGO_URI);

// // // database connection
// // connectDB();
// // connectCloudinary();

// // // middlewares
// // app.use(express.json());
// // app.use(cors());

// // // api endpoints
// // app.use("/api/admin", adminRouter);
// // app.use("/api/doctor", doctorRouter);
// // app.use("/api/user", userRouter);

// // // test route
// // app.get("/", (req, res) => {
// //   res.send("Hello I am working Dude 😎");
// // });

// // // start server
// // app.listen(port, () => {
// //   console.log(`🚀 Server is running on port ${port}`);
// // });
// // console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
// import dotenv from "dotenv";
// dotenv.config(); // ✅ load .env

// import express from "express";
// import cors from "cors";
// import connectDB from "./config/mongodb.js";
// import connectCloudinary from "./config/cloudnary.js";

// import adminRouter from "./routes/adminRoute.js";
// import doctorRouter from "./routes/doctorRoute.js";
// import userRouter from "./routes/usersRoute.js";

// // app config
// const app = express();
// const port = process.env.PORT || 4000;

// // 🔍 DEBUG (IMPORTANT - keep for now)
// console.log("MONGO_URI:", process.env.MONGO_URI);
// console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
// console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);

// // database connection
// connectDB();
// connectCloudinary();

// // middlewares
// app.use(express.json());
// app.use(cors());

// // api endpoints
// app.use("/api/admin", adminRouter);
// app.use("/api/doctor", doctorRouter);
// app.use("/api/user", userRouter);

// // test route
// app.get("/", (req, res) => {
//   res.send("Hello I am working Dude 😎");
// });

// // start server
// app.listen(port, () => {
//   console.log(`🚀 Server is running on port ${port}`);
// });
import dotenv from "dotenv";
dotenv.config(); // ✅ load .env

import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudnary.js";

import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/usersRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// 🔍 DEBUG (IMPORTANT)
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);

// 🔥 ADD THESE
console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
console.log("ADMIN_PASSWORD:", process.env.ADMIN_PASSWORD);

// database connection
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// test route
app.get("/", (req, res) => {
  res.send("Hello I am working Dude 😎");
});

// start server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
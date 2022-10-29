const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const env = require("dotenv");

const app = express();

// routes
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

// environment valirables or constants
env.config();

// mongodb connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.s5pbd.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("**Database connected successfully.");
  });

// middleware
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/public", express.static(path.join("backend")));
app.use("/api/user/", userRoutes);
app.use("/api/posts/", postRoutes);

// running on port 3000
app.listen(process.env.PORT, () => {
  console.log(
    `**Node-Express Live Development Server is listening on localhost:${process.env.PORT};  open your browser on http://localhost:${process.env.PORT}/`
  );
});

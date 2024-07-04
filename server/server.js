const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { connect } = require("./database/database");
const cors = require("cors");
const {
  userRoute,
  blogRoute,
  tokenRoute,
  testRoute,
  reactRoute,
  commentRoute,
} = require("./routes/index");

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://blog-vuejs-frontend.vercel.app"], // replace with the URL of your frontend
    credentials: true,
  })
);
connect();
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 8080;

// Routes
userRoute.init(app);
blogRoute.init(app);
tokenRoute.init(app);
testRoute.init(app);
reactRoute.init(app);
commentRoute.init(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;

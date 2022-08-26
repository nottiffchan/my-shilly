const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const express= require("express")
const app = express();
const connectDB = require("./db/conn");
const errorHandler = require('./middleware/error');

app.use(cors({origin: '*'}));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));
app.use("/api/user", require("./routes/user"));
app.use("/api/uploadImage", require("./routes/uploadImage"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  connectDB();
  console.log(`Server 🤵‍♂️ is running 🏃🏻 on port 🚢 ${PORT}!!!! 😀🙌🏼`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged error: ${err} `);
  server.close(() => process.exit(1));
});
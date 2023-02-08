const express = require("express");
const app = express();
const connectDB = require("./db");
const port = 5000;

app.use(express.json());

connectDB();

// create awailable routes
app.use("/auth", require("./routes/auth"));
app.use("/note", require("./routes/note"));

app.listen(port, () => {
  console.log(`letern at port ${port}`);
});

const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const path = require("path");

const bcrypt = require("bcrypt");

app.use(express.json());

const data = path.join(__dirname, "userData.db");
let db = null;

initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: data,
      driver: sqlite3.Database,
    });
    app.listen(3005, () => {
      console.log("server started at 3005");
    });
  } catch (e) {
    console.log(`error message is ${e.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

// Post Authentication new User Add

app.post("/register/", async (request, response) => {
  const { username, name, password, gender, location } = request.body;
  const hashedPassword = await bcrypt.hash(request.body.password, 10);
  const getQuery = `select * from user where username=${username}`;
  const checkQuery = await db.get(getQuery);
  console.log("checked hthe data");
});

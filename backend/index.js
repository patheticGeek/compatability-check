require("dotenv").config();

const User = require("./models/user");
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
var cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", async (req, res) => {
  try {
    const userData = req.body;

    const hashedPassword = bcrypt.hashSync(userData.password);
    userData.password = hashedPassword;

    const isRegistered = await User.exists({ email: userData.email });

    if (isRegistered) {
      throw new Error("User already registered with that email address");
    }

    const newUser = new User(userData);
    await newUser.save();

    res.jsonp({ ...newUser.toJSON(), password: undefined });
  } catch (err) {
    res.status(400).jsonp({ error: true, message: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const userData = req.body;

    const user = await User.findOne({ email: userData.email });

    if (!user) {
      throw new Error("No user exists with that email");
    }

    const correctPassword = bcrypt.compareSync(
      userData.password,
      user.password
    );

    if (correctPassword) {
      res.jsonp({ ...user.toJSON(), password: undefined });
    } else {
      throw new Error("Wrong password");
    }
  } catch (err) {
    res.status(400).jsonp({ error: true, message: err.message });
  }
});

async function main() {
  await mongoose.connect(process.env.DATABASE_URL);

  console.log("Database connected!");

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

main().catch((err) => console.log(err));

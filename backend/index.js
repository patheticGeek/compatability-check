require("dotenv").config();

const User = require("./models/user");
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");

const JWT_VALIDITY = 1 * 24 * 60 * 60 * 1000; // for 1 day

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

    const token = jwt.sign(
      { userId: newUser._id, createdAt: Date.now() },
      process.env.JWT_SECRET
    );
    res.jsonp({ ...newUser.toJSON(), token, password: undefined });
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
      const expireAt = Date.now() + JWT_VALIDITY;
      const token = jwt.sign(
        { userId: user._id, expireAt },
        process.env.JWT_SECRET
      );
      res.jsonp({ ...user.toJSON(), token, password: undefined });
    } else {
      throw new Error("Wrong password");
    }
  } catch (err) {
    res.status(400).jsonp({ error: true, message: err.message });
  }
});

app.post("/verify-user", async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.replace("Bearer ", "");

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    if (data && data.expireAt && data.expireAt < Date.now()) {
      throw new Error("Token has expired");
    }
    res.jsonp(data);
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

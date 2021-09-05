require("dotenv").config();

const User = require("./models/user");
const Crush = require("./models/crush");
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const getUser = require("./utils/getUser");
const { nanoid } = require("nanoid");

const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");

const JWT_VALIDITY = 1 * 24 * 60 * 60 * 1000; // for 1 day

app.use(cors());

app.use(bodyParser.json());

app.post("/signup", async (req, res) => {
  try {
    const userData = req.body;

    const isRegistered = await User.exists({ email: userData.email });

    if (isRegistered) {
      throw new Error("User already registered with that email address");
    }

    const hashedPassword = bcrypt.hashSync(userData.password);
    userData.password = hashedPassword;
    userData.referer = nanoid(6);

    const newUser = new User(userData);
    await newUser.save();

    const expireAt = Date.now() + JWT_VALIDITY;
    const token = jwt.sign(
      { userId: newUser._id, expireAt },
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

app.get("/verify-user", async (req, res) => {
  try {
    const data = getUser(req);
    const user = await User.findById(data.userId);
    res.jsonp({ ...data, user: user });
  } catch (err) {
    res.status(400).jsonp({ error: true, message: err.message });
  }
});

app.post("/submit", async (req, res) => {
  const data = req.body;

  try {
    const newCrush = new Crush(data);
    await newCrush.save();
    res.jsonp({ success: true, data: newCrush });
  } catch (err) {
    res.status(400).jsonp({ error: true, message: err.message });
  }
});

app.get("/friend-data", async (req, res) => {
  try {
    const { userId } = getUser(req);
    const { referer } = await User.findOne({ _id: userId });
    const data = await Crush.find({ referer });
    res.jsonp(data);
  } catch (err) {
    res.status(400).jsonp({ error: true, message: err.message });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use("/assets", express.static("public/assets"));
  app.all("*", (req, res) =>
    res.sendFile("public/index.html", { root: __dirname })
  );
}

async function main() {
  console.log("NODE_ENV", process.env.NODE_ENV);

  await mongoose.connect(process.env.DATABASE_URL);

  console.log("Database connected!");

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

main().catch((err) => console.log(err));

const express = require("express");
const cors = require("cors");
const connection = require("./db/connection");
const User = require("./models/user");
const app = express();
const bcrypt = require("bcrypt");
const saltRounds = 10;
app.use(express.json());
app.use(cors());
const port = 4000;
connection();

app.post("/register", async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashPassword;
    const userExists = await User.findOne({
      phoneNumber: req.body.phoneNumber,
    });
    const emailExists = await User.findOne({
      email: req.body.email,
    });
    if (userExists) {
      res.status(409).json({ msg: "Phone number already exists!" });
    } else if (emailExists) {
      res.status(409).json({ msg: "Email already exists!" });
    } else {
      const data = await User.create(req.body);
      if (data) res.json({ msg: "user registered" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const userDetails = await User.findOne({
    phoneNumber: req.body.phoneNumber,
  });
  if (!userDetails) {
    res.status(401).json({ msg: "Invalid Credentials" });
  } else {
    const isMatched = await bcrypt.compare(
      req.body.password,
      userDetails.password
    );
    if (isMatched) {
      res.json({ msg: "Login Success" });
    } else {
      res.status(401).json({ msg: "Incorrect Password" });
    }
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

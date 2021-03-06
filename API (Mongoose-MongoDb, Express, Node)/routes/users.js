//bring in all the modules that you want to use (dependencies)
const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database");

//bring in the mongoose schema
const User = require("../models/user");

// Register
router.post("/register", async (req, res, next) => {
  //store the users as variables for easier use from the JSON request
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  console.dir(newUser);
  console.log("START OF METHOD");


   //Validate userName
   const validateUsername = async (username) => {
    let user = await User.findOne({ username });
    return user ? false : true;
  };

  //#region validateEmail
  const validateEmail = async (email) => {
    let user = await User.findOne({ email });
    return user ? false : true;
  };
  //#endregion validateEmail

  // Validate the username
  let usernameNotTaken = await validateUsername(newUser.username);
  console.log("USERNAME AVAILABLE: " + usernameNotTaken);
  if (!usernameNotTaken) {
    // not-not-taken means it is taken because it is a double negative
    return res.json({
      //bad request
      msg: `Username unavailable.`,
      success: false,
    });
  }

  // Validate the email
  let emailNotRegistered = await validateEmail(newUser.email);
  console.log("EMAIL AVAILABLE: " + emailNotRegistered);
  if (!emailNotRegistered) {
    return res.json({
      msg: `This email is already associated with a registered account.`,
      success: false,
    });
  }
 

  await User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: "Failed to register user" });
    } else {
      res.json({ success: true, msg: "User registered" });
    }
  });
});
// Authenticate
router.post("/authenticate", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  //checking for the username (does it exist)
  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: "User not found" });
    }

    //if the username exists we check for a password match
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({ data: user }, config.secret, {
          expiresIn: 604800, // 1 week worth of seconds
        });

        //Password matches, return this response
        res.json({
          success: true,
          token: `Bearer ${token}`,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
          },
        });
      }
      //Password doesn't match, return this response
      else {
        return res.json({ success: false, msg: "Wrong password" });
      }
    });
  });
});

//read all users from the database
router.get("/", (req, res, next) => {
  req.collection
    User.find({})
    .then((results) => res.json(results))
    .catch((error) => res.send(error));
});

//read a specific user from the database
router.get("/:username", (req, res, next) => {
  let username = req.params.username;
  req.collection
    User.findOne({ username })
    .then((results) => res.json(results))
    .catch((error) => res.send(error));
});

//read a specific user from the database
router.delete("/:username", (req, res, next) => {
  let username = req.params.username;
  req.collection
    User.deleteOne({ username })
    .then((results) => res.json(results))
    .catch((error) => res.send(error));
});

// Profile
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({
      user: {
        _id: req.user._id,
        name: req.user.name,
        username: req.user.username,
        email: req.user.email,
      },
    });
  }
);

module.exports = router;

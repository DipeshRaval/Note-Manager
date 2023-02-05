const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/Users");
const fatchUser = require("../middleware/fetchUser");
const jwt = require("jsonwebtoken");
const jwt_Secrate = "Dipu's_Tech@123";

//for valiadation imports
const { body, check, validationResult } = require("express-validator");

router.post(
  "/create",
  //name must more than three charctor
  body("name")
    .isLength({
      min: 3,
    })
    .withMessage("name must be at least 3 chars long"),
  // email must be an email
  body("email").isEmail().withMessage("Enter a valid email"),
  //already exist than error
  check("email").custom((value) => {
    return User.findOne({ email: value }).then((user) => {
      if (user) {
        return Promise.reject("E-mail already in use");
      }
    });
  }),
  // password must be at least 5 chars long
  body("password")
    .isLength({
      min: 5,
    })
    .withMessage("password must be at least 5 chars long"),
  async function (req, res) {
    try {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const salt = await bcrypt.genSalt(10);
      const pwd = await bcrypt.hash(req.body.password, salt);
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: pwd,
      });

      const obj = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(obj, jwt_Secrate);

      return res.json({ authToken });
    } catch (error) {
      console.log(error);
      res.json(error).status(400);
    }
  }
);

// log in end point
router.post(
  "/login",
  body("password").exists().withMessage("Password can't be empty"),
  body("email").isEmail().withMessage("Enter a valid email"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(400).json({ Error: "Invalid credentials" });
      }

      const check = await bcrypt.compare(req.body.password, user.password);

      if (!check) {
        return res.status(400).json({ Error: "Provided a valid creadentials" });
      }

      const obj = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(obj, jwt_Secrate);

      return res.json({ authToken });
    } catch (error) {
      console.log(error);
      res.json(error).status(400);
    }
  }
);

// get user detail and add into req.user

router.post("/getuser", fatchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (error) {
    console.log(error);
    res.json(error).status(400);
  }
});
module.exports = router;

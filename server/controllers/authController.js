const User = require("../models/User");
const jwt = require("jsonwebtoken");

// handle errors
const handleErrors = (err) => {
  let errors = { email: "", password: "", username: "" };

  // Incorrect email at login
  if (err.message === "Incorrect email") {
    errors.email = "Email is not registered";
  }

  // Incorrect password at login
  if (err.message === "Incorrect password") {
    errors.password = "Invalid credentials";
  }

  // Duplicate key error
  if (err.code === 11000) {
    if (err.keyPattern.email) {
      errors.email = "Email is already registered";
    }
    if (err.keyPattern.username) {
      errors.username = "Username is already taken";
    }
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// unlike the cookie, the jwt expects time in seconds
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signup_get = async (req, res) => {
  try {
    const locals = {
      title: "Signup",
    };

    // Check if the user is present using the res.locals set by the middleware
    if (res.locals.user) {
      return res.redirect("/");
    }

    res.render("signup", {
      locals,
      currentRoute: "/signup",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.login_get = (req, res) => {
  try {
    const locals = {
      title: "Login",
    };

    // Check if the user is present using the res.locals set by the middleware
    if (res.locals.user) {
      return res.redirect("/");
    }

    res.render("login", {
      locals,
      currentRoute: "/login",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.signup_post = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const user = await User.create({ email, password, username });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

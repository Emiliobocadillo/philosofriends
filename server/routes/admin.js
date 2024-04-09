const Post = require("../models/Post");
const User = require("../models/User.js");
const express = require("express");
const router = express.Router();
const adminlayout = "../views/layouts/admin";


// GET
// Admin - Dashboard

router.get("/dashboard", async (req, res) => {
  try {
    const locals = {
      title: "Dashboard",
    };

    const data = await Post.find();
    res.render("admin/dashboard", {
      locals,
      data,
      layout: adminlayout,
    });
  } catch (err) {
    console.log(err);
  }
});

// GET
// Admin - create new post
router.get("/add-post", async (req, res) => {
  try {
    const locals = {
      title: "Add Post",
    };
    res.render("admin/add-post", {
      locals,
      layout: adminlayout,
    });
  } catch (err) {
    console.log(err);
  }
});

// POST
// Admin - create new page
router.post("/add-post", async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      body: req.body.body,
    }); 

    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
});

// GET
// Admin - VIEW AND EDIT?
router.get("/edit-post/:id", async (req, res) => {
  try {
    const locals = {
      title: "Edit Post",
    };
    const data = await Post.findOne({
      _id: req.params.id,
    });

    res.render("admin/edit-post", { locals, data, layout: adminlayout });
  } catch (err) {
    console.log(err);
  }
});

// PUT
// Admin - UPDATE post
router.put("/edit-post/:id", async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now(),
    });
    res.redirect(`/edit-post/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
});

// DELETE
// Admin - Delete post

router.delete("/delete-post/:id", async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;

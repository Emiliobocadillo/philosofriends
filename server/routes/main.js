const Post = require("../models/Post");
const Philosophy = require("../models/Philosophy");
const { requireAuth } = require("../middleware/authMiddleware");

const express = require("express");
const router = express.Router();

// GET index PAGE
router.get("/", async (req, res) => {
  try {
    const locals = {
      title: "Welcome",
    };

    res.render("index", {
      locals,
      currentRoute: "/",
    });
  } catch (err) {
    console.log(err);
  }
});

// Get chat PAGE
router.get("/chat", async (req, res) => {
  try {
    const locals = {
      title: "Chat",
    };

    res.render("chat", {
      locals,
      currentRoute: "/chat",
    });
  } catch (err) {
    console.log(err);
  }
});

// GET blog PAGE
router.get("/blog", async (req, res) => {
  try {
    const locals = {
      title: "Blog",
    };

    const data = await Post.find().exec();

    res.render("blog", {
      locals,
      data,
      currentRoute: "/blog",
    });
  } catch (err) {
    console.log(err);
  }
});

// GET
// Post/article: id

router.get("/post/:id", async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
    };
    res.render("post", {
      locals,
      data,
      currentRoute: `/post/${slug}`,
    });
  } catch (err) {
    console.log(err);
  }
});

// POST
// Post - searchTerm

router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "Seach",
    };

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      data,
      locals,
      currentRoute: "/",
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/chatrooms", requireAuth, (req, res) => {
  res.render("chatrooms", { currentRoute: "/chatrooms" });
});

// DATA INSERTION

function insertPostData() {
  Post.insertMany([
    
  ]);
}

//insertPostData();

module.exports = router;

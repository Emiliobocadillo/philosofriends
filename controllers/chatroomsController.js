const Philosophy = require("../models/Philosophy");

module.exports.renderChatrooms = async (req, res) => {
  try {
    const philosophies = await Philosophy.find(); // Retrieve all philosophies from the database
    res.render("chatrooms", { philosophies }); // Pass the philosophies to the view
  } catch (error) {
    console.error("Error fetching philosophies:", error);
    res.status(500).send("Internal Server Error");
  }
};



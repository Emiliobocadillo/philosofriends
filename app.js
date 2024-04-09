require("dotenv").config();
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const connectDB = require("./server/config/db");
const authRoutes = require("./server/routes/authRoutes");
const cors = require("cors");
const { isActiveRoute } = require("./server/helpers/routeHelpers");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 5000;
const botName = "PhilosoBot";

app.use(express.static("public"));

// SOCKET SOCKET SOCKET

// Run when client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    socket.join();

    // welcome current user
    socket.emit(
      "message",
      formatMessage(botName, "Welcome to PhilosoFriends!")
    );

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room)
    })
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

const cookieParser = require("cookie-parser");
const {
  requireAuth,
  checkIfAdmin,
  checkUser,
} = require("./server/middleware/authMiddleware");

connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));

// Template engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.locals.isActiveRoute = isActiveRoute;

// Routes
app.get("*", checkUser);
app.use(authRoutes);
app.use("/", require("./server/routes/main"));
app.use("/", requireAuth, checkIfAdmin, require("./server/routes/admin"));

server.listen(PORT, () => {
  console.log(`Server running on PORT`, PORT, "http://localhost:5000/");
});
module.exports = app;

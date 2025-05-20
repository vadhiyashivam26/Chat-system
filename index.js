const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

const Chat = require("./models/chats.js");

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "/public")));

main()
  .then(() => {
    console.log("connection successfull ");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// let chat1 = new Chat({
//   from: "shivam",
//   to: "sarita",
//   msg: "send me your photo",
//   created_at: new Date(),
// });

// chat1.save().then((res) =>{
//   console.log(res);
// })

//Index Route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();

  res.render("index.ejs", { chats });
});

// New chat route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//Create chat route
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;

  //Create new object for save new data enterd by user(new chat route).
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });

  newChat
    .save()
    .then((res) => {
      console.log("chat was saved,");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

//Edit message route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);

  res.render("edit.ejs", { chat });
});

//Update message route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;

  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true },
    { new: true }
  );

  // console.log(updatedChat);
  res.redirect("/chats");
});

//Delete message Route
app.delete("/chats/:id", async (req, res) =>{
  let {id} = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id, {new: true});
  
  console.log(deletedChat);
  res.redirect("/chats");
});

app.get("/", (req, res) => {
  res.send("Root is working");
});

app.listen("8080", () => {
  console.log("port is listening");
});

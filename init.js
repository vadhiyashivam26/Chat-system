const mongoose = require("mongoose");
const Chat = require("./models/chats.js");

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

let allChats = [
  {
    from: "shivam",
    to: "sarita",
    msg: "send me your photo",
    created_at: new Date(),
  },
  {
    from: "shivam",
    to: "vaibhav",
    msg: "kale javu k?",
    created_at: new Date(),
  },
  {
    from: "vaibhav",
    to: "savan",
    msg: "kya cho bhai?",
    created_at: new Date(),
  },
  {
    from: "mihir",
    to: "dhruv",
    msg: "IMPs mokal fast",
    created_at: new Date(),
  },
  {
    from: "tushar",
    to: "shivam",
    msg: "bhai, kat gaya !",
    created_at: new Date(),
  },
  {
    from: "shivam",
    to: "neel",
    msg: "project nu su kryu?",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats).then((res) => {
  console.log(res);
});

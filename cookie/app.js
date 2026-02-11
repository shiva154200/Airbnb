const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

app.get("/set-cookie", (req, res) => {
  res.cookie("user1", "Shivam", {
    httpOnly: true,
    maxAge: 60 * 1000 // 1 minute
  });
  res.cookie("user2", "Mahesh", {
    httpOnly: true,
    maxAge: 60 * 1000 // 1 minute
  });


  res.send("Cookie set successfully");
});

app.get("/get-cookie", (req, res) => {
  const {user1,user2} = req.cookies;
  res.send(`Cookie values: ${user1},${user2}`);
});

app.listen(3000,()=>{
    console.log("server is listening on port 3000")
})

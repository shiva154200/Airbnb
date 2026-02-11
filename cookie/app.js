const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

app.get("/set-cookie", (req, res) => {
  res.cookie("user", "Shivam", {
    httpOnly: true,
    maxAge: 60 * 1000 // 1 minute
  });

  res.send("Cookie set successfully");
});

app.get("/get-cookie", (req, res) => {
  const user = req.cookies.user;
  res.send(`Cookie value: ${user}`);
});

app.listen(3000,()=>{
    console.log("server is listening on port 3000")
})

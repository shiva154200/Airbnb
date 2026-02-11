const express=require('express')
const app=express();
const session = require("express-session");
app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 2000 // 2 minute
    }
  })
);

app.get("/login", (req, res) => {
  req.session.user = {
    id: 1,
    name: "Shivam"
  };

  res.send("User logged in, session created");
});

app.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Not logged in");
  }

  res.send(`Welcome ${req.session.user.name}`);
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.send("Logged out, session destroyed");
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


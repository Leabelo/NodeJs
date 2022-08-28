const express = require("express");
const register = require("./routes/register");
const login = require("./routes/login");
const user = require("./routes/user");
const card = require("./routes/card");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port = process.env.PORT || 3000;

mongoose
.connect(process.env.db)
.then(()=> console.log("MongoDb connected successfully"))
.catch((err)=> console.log(err));

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/profile", user);
app.use("/api/card", card);


app.listen(port, () => console.log("Server works fine", port));






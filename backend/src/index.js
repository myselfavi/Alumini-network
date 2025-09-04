const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();

// Middleware
app.use(cors({
    origin: ["http://localhost:5173", "https://alumini-network-frontend.onrender.com"],
    credentials: true,
}));


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/post/", require("./routes/post.routes"));

// database connection 
{
    console.log("Connecting to the database...");
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "alumni_network",
        serverSelectionTimeoutMS: 5000
    }).then(() => {
        console.log("Connected to the database.");
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }).catch(error => {
        console.log(error);
    });
}

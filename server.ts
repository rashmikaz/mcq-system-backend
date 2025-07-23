import express from "express";

const app = express();

console.log("Hello World");

app.get("/", (req, res) => {
    res.send("Hello from Express!");
});

app.listen(3000, () => {
    console.log("Express server running at http://localhost:3000");
});

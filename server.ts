import express from "express";
import cors from "cors";
import userRoute from "./routes/user-route";
import examRoute from "./routes/exam-route";
import questionRoute from "./routes/question-route";

const app = express();

app.use(express.json());
app.use(cors());

const corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/user",userRoute);
app.use("/exam",examRoute);
app.use("/question", questionRoute);

app.listen(3000, () => {
    console.log("Express server running at http://localhost:3000");
});

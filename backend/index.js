import express from "express";
import { PORT, mongoDB_URL } from "./config.js";
import mongoose, { mongo } from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from "./routes/bookRoute.js"
import cors from 'cors'


const app = express();

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send("this port works")
});
// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-type'],
// }))

app.use("/books", bookRoute)

mongoose
    .connect(mongoDB_URL)
    .then(() => {
        console.log("App connected to mongo db");
        app.listen(PORT, () => {
            console.log(`the port is up and running on the port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("ledu annai ");
        console.error(error.message);
    });

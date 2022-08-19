import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import VisionRoute from "./Routes/VisionRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";
import dotenv from 'dotenv'

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// to serve images for public
app.use(express.static('public'));
app.use('/images', express.static("images"));

app.use('/upload', UploadRoute)
app.use('/vision', VisionRoute)
// app.use('/search', SearchRoute)

app.listen(4000, () => console.log("port 4000 is active"));
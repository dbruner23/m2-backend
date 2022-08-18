import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import VisionRoute from "./Routes/VisionRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";



const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// to serve images for public
app.use(express.static('public'));
app.use('/images', express.static("images"));

app.use('/upload', UploadRoute)
app.use('/vision', VisionRoute)

app.listen(4000, () => console.log("port 4000 is active"));
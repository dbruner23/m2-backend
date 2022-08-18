import express from 'express';
import { getVisionData } from '../Controllers/VisionController.js';
const router = express.Router()

router.post('/', getVisionData)

export default router
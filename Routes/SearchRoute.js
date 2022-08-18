import express from 'express';
import { getCars } from '../Controllers/SearchController.js';
const router = express.Router()

router.get('/', getCars)

export default router
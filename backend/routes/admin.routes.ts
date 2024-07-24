import dotenv from "dotenv";
import express from "express";

import { login, register } from "../controllers/admin.controllers";

dotenv.config();
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

export default router;

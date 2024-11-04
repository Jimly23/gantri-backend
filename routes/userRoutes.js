import express from "express";
import { createUser, login, getUserById, getUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/users/register", createUser);
router.post("/users/login", login);
router.get("/user/:id", getUserById);
router.get("/users", getUsers);

export default router
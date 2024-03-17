import express from "express";
import { verifyAccessToken } from "../helpers/jwtHelper";
import UserController from "../controllers/user.controller";

const router = express.Router();

router.get("/user", (req, res) => {
  res.send("user");
});

router.post("/user", (req, res) => {
  res.send("user");
});

router.put("/", verifyAccessToken, UserController.updateUser);

export default router;

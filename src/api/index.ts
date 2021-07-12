import express from "express";
import marks from "./mark/mark.routes";
import auth from "./auth/auth.routes";

const router = express.Router();

router.use("/mark", marks);
router.use("/auth", auth);

export default router;
import express from "express";
import marks from "./marks/marks.routes";
import auth from "./auth/auth.routes";

const router = express.Router();

router.use("/marks", marks);
router.use("/auth", auth);

export default router;
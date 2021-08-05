import express from "express";

import mark from "./mark/mark.routes";
import auth from "./auth/auth.routes";
import somtoday from "./somtoday/somtoday.routes";

const router = express.Router();

router.use("/mark", mark);
router.use("/auth", auth);
router.use("/somtoday", somtoday);

export default router;
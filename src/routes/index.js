import { Router } from "express";
import authRouter from "./auth.route";
import articleRoute from "./article.route";

const router = Router();

router.use("/article", articleRoute);
router.use("/auth", authRouter);

export default router;

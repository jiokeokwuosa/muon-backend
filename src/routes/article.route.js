import { Router } from "express";
import ArticleController from "../controllers/article.controller";
import ArticleValidator from "../validations/article/article.validator";
import validateToken from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  // validateToken,
  ArticleValidator.validateAddArticle(),
  ArticleValidator.myValidationResult,
  ArticleController.addArticle
);

router.post(
  "/comment",
  // validateToken,
  ArticleValidator.validateAddComment(),
  ArticleValidator.myValidationResult,
  ArticleController.addArticleComment
);

router.get(
  "/", 
  ArticleController.getArticles
);

router.patch(
  "/comment/:commentId",
//   validateToken,
  ArticleValidator.validateCommentUpdate(),
  ArticleValidator.myValidationResult,
  ArticleController.updateArticleComment
);

router.delete(
  "/comment/:commentId",
  // validateToken,
  ArticleController.deleteComment
);

export default router;

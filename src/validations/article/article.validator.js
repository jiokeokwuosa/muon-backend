import {
  check,
  validationResult
} from 'express-validator';

/**
 *Contains ArticleValidator
 *
 *
 *
 * @class ArticleValidator
 */
class ArticleValidator {
  /**
   * validate Add/Remove comment data.
   * @memberof ArticleValidator
   * @returns {null} - No response.
   */
  static validateAddArticle() {
    return [
      check('userId')
        .exists()
        .withMessage('User ID is required')
        .isMongoId()
        .withMessage('User ID should be a mongoID'),
      check('text')
        .exists()
        .withMessage('Article is required')
        .not()
        .isEmpty()
        .withMessage('Article must not be empty')
    ];
  }

  /**
   * validate add Comment.
   * @memberof ArticleValidator
   * @returns {null} - No response.
   */
  static validateAddComment() {
    return [
      check('userId')
        .exists()
        .withMessage('User ID is required')
        .isMongoId()
        .withMessage('User ID should be a mongoID'),
      check('articleId')
        .exists()
        .withMessage('Article Id is required')
        .isMongoId()
        .withMessage('Article Id should be a mongoID'),
      check('text')
        .exists()
        .withMessage('Comment text is required')
        .not()
        .isEmpty()
        .withMessage('Comment text must not be empty')
    ];
  }

  /**
  * validate Add/Remove comment data.
  * @memberof ArticleValidator
  * @returns {null} - No response.
  */
  static validateCommentUpdate() {
    return [
      check('text')
        .exists()
        .withMessage('Comment text is required')
        .not()
        .isEmpty()
        .withMessage('Comment text must not be empty')
    ];
  }

  
  /**
   * Validate user data.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @param {Response} next - The next parameter.
   * @memberof Login
   * @returns {JSON} - A JSON success response.
   */
   static async myValidationResult(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errArr = errors.array().map(({ msg }) => msg);
      return res.status(400).json({
        status: '400 Invalid Request',
        error: 'Your request contains invalid parameters',
        errors: errArr,
      });
    }
    return next();
  }

  /**
   * validate like and unlike lesson comment.
   * @memberof ArticleValidator
   * @returns {null} - No response.
   */
  static validateLikeComment() {
    return [
      check('userId')
        .exists()
        .withMessage('User ID is required')
        .isMongoId()
        .withMessage('User ID should be a mongoID'),
      check('lessonCommentId')
        .exists()
        .withMessage('Comment ID is required')
        .isMongoId()
        .withMessage('Commend ID should be a mongoID')
    ];
  }

}
export default ArticleValidator;
import Article from "../db/models/article.model";
import ArticleReplies from "../db/models/articleReplies.model";

/**
 *Contains Article Controller
 *
 *
 *
 * @class articleController
 */
class ArticleController {
    /**
     * Add an article
     * @param {Request} req - Response object.
     * @param {Response} res - The payload.
     * @memberof ArticleController
     * @returns {JSON} - A JSON success response.
     *
     */
    static async addArticle(req, res) {
        try {
            let article = await Article.create(req.body)
            article = await Article.findById(article._id).populate({
                path: "articlesReplies",
                model: ArticleReplies,
                populate: {
                    path: "userId",
                    select: "fullName"
                }
            })           
            return res.status(200).json({
                status: "success",
                data: {
                    article
                }
            });
        } catch (error) {
            return res.status(500).json({
                status: "500 Internal server error",
                error: "Error adding article",
            });
        }
    }

    /**
    * Add a comment
    * @param {Request} req - Response object.
    * @param {Response} res - The payload.
    * @memberof ArticleController
    * @returns {JSON} - A JSON success response.
    *
    */
    static async addArticleComment(req, res) {
        try {
            let commentReply = await ArticleReplies.create(req.body)
            commentReply = await ArticleReplies.findById(commentReply.id).populate({
                path: "userId",
                select: "fullName"
            })
            return res.status(200).json({
                status: "success",
                data: {
                    commentReply
                }
            });
        } catch (error) {
            return res.status(500).json({
                status: "500 Internal server error",
                error: "Error adding comment",
            });
        }
    }

    /**
     * get articles
     * @param {Request} req - Response object.
     * @param {Response} res - The payload.
     * @memberof ArticleController
     * @returns {JSON} - A JSON success response.
     *
     */
    static async getArticles(req, res) {
        try {
            const articles = await Article.find().sort({
                createdAt: -1
            })
                .populate({
                    path: "articlesReplies",
                    model: ArticleReplies,
                    populate: {
                        path: "userId",
                        select: "fullName"
                    }
                })
            return res.status(200).json({
                status: "success",
                data: {
                    articles
                }
            });
        } catch (error) {
            return res.status(500).json({
                status: "500 Internal server error",
                error: "Error getting articles",
            });
        }
    }

    /**
     * Update article comment
     * @param {Request} req - Response object.
     * @param {Response} res - The payload.
     * @memberof ArticleController
     * @returns {JSON} - A JSON success response.
     *
     */
    static async updateArticleComment(req, res) {
        try {           
            let comment = await ArticleReplies.findOneAndUpdate({
                _id: req.params.commentId
            }, {
                text: req.body.text,
            }, {
                new: true,
            });

            comment = await ArticleReplies.findById(comment.id).populate({
                path: "userId",
                select: "fullName"
            })

            return res.status(200).json({
                status: "success",
                data: {
                    comment
                }
            });
        } catch (error) {
            return res.status(500).json({
                status: "500 Internal server error",
                error: "Error updating article comment",
            });
        }
    }

    /**
   * Delete a comment
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof ArticleController
   * @returns {JSON} - A JSON success response.
   *
   */
    static async deleteComment(req, res) {
        try {
            await ArticleReplies.findOneAndDelete({
                _id: req.params.commentId
            });
            return res.status(200).json({
                status: "success",
                data: {
                    message: 'Data delected successfully'
                }
            });
        } catch (error) {
            return res.status(500).json({
                status: "500 Internal server error",
                error: "Error deleting article comment",
            });
        }
    }

    // /**
    //  * liked comment
    //  * @param {Request} req - Response object.
    //  * @param {Response} res - The payload.
    //  * @memberof ArticleController
    //  * @returns {JSON} - A JSON success response.
    //  *
    //  */
    // static async likeArticle(req, res) {
    //     try {
    //         const {
    //             userId,
    //             ArticleId
    //         } = req.body;

    //         let DComment = await Article.findById(ArticleId);
    //         DComment.likes = DComment.likes.slice(); // Clone the tags array
    //         DComment.likes.push(userId);
    //         await DComment.save();

    //         let selectedComment = await Article.findById(ArticleId).populate({
    //             path: "userId",
    //             select: "fullName profilePhotoUrl"
    //         })
    //             .populate({
    //                 path: "commentReplies",
    //                 model: ArticleReplies
    //             })
    //         return res.status(200).json({
    //             status: "success",
    //             data: {
    //                 selectedComment
    //             }
    //         });
    //     } catch (error) {
    //         //console.log(error)
    //         return res.status(500).json({
    //             status: "500 Internal server error",
    //             error: "Error saving lesson comment like",
    //         });
    //     }
    // }

    // /**
    //  * unlike comment
    //  * @param {Request} req - Response object.
    //  * @param {Response} res - The payload.
    //  * @memberof ArticleController
    //  * @returns {JSON} - A JSON success response.
    //  *
    //  */
    // static async unLikeArticle(req, res) {
    //     try {
    //         const {
    //             userId,
    //             ArticleId
    //         } = req.body;

    //         let selectedComment = await Article.findById(ArticleId);
    //         selectedComment.likes = selectedComment.likes.slice(); // Clone the tags array
    //         selectedComment.likes.pull(userId);
    //         selectedComment.save();

    //         return res.status(200).json({
    //             status: "success",
    //             data: {
    //                 selectedComment
    //             }
    //         });
    //     } catch (error) {
    //         //console.log(error)
    //         return res.status(500).json({
    //             status: "500 Internal server error",
    //             error: "Error removing lesson comment like",
    //         });
    //     }
    // }





}
export default ArticleController;
import mongoose from "mongoose";

const ArticleRepliesSchema = new mongoose.Schema(
  {    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    articleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "article",
    },   
    text: {
      type: String,
      required: true     
    }    
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const articleReplies = mongoose.model("articleReplies", ArticleRepliesSchema);

export default articleReplies;

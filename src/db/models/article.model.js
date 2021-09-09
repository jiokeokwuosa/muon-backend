import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },  
    title: {
      type: String,
      required: true     
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

ArticleSchema.virtual("articlesReplies", {
  ref: "articleReplies",
  localField: "_id",
  foreignField: "articleId",
  justOne: false,
});

const article = mongoose.model("article", ArticleSchema);

export default article;

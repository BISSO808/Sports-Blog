const mongoose = require('mongoose');
//Articles Schema
const articleSchema = new mongoose.Schema({
title:String,
subtitle: String,
author:String,
category: String,
body: String,
author: String,
created_at:{
type: Date,
default: Date.now
},
comments:[{
    comment_subject : String,
    comment_body: String,
    comment_author:String,
    comment_email:String,
    comment_date:String
    }]
});

const Article  =mongoose.model('Article', articleSchema);
module.exports = Article;
//Get Articles

module.exports.getArticles= function(callback, limit){
    Article.find(callback).limit(limit).sort[['title','ascending']];
}

//add category

module.exports.addArticle = function(article, callback){
Article.create(article, callback);
}

//get single category by its id
module.exports.getArticleByID = function(id, callback ){
    Article.findById(id, callback);
}

// update the category
module.exports.updateArticle=function(query,update,options, callback){
Article.findOneAndUpdate(query,update,options, callback);
}

//delete the category
module.exports.findAndDelete= function(id, callback){
Article.findByIdAndDelete(id,callback);
}
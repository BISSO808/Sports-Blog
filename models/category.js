const mongoose = require('mongoose');
//Categories Schema
const categorySchema = new mongoose.Schema({
title:String,
description:String
});

const Category  =mongoose.model('Category', categorySchema);
module.exports =Category;
//Get categories

module.exports.getCategories= function(callback, limit){
    Category.find(callback).limit(limit).sort[['title','ascending']];
}

//add category

module.exports.addCategory = function(category, callback){
Category.create(category, callback);
}

//get single category by its id
module.exports.getCategoriesByID = function(id, callback ){
    Category.findById(id, callback);
}

// update the category
module.exports.updateCategory=function(query,update,options, callback){
Category.findOneAndUpdate(query,update,options, callback);
}
//delete the category
module.exports.findAndDelete= function(id, callback){
Category.findByIdAndDelete(id,callback);
}
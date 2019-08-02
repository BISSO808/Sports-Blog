const express = require('express');
const router = express.Router();
Category = require('../models/category.js');
router.get('/',(req, res, next)=>{
    Category.getCategories((err,categories)=>{
  if (err){
      res.return('err');
  }
    res.render('category',{
        categories:categories
});
    });
});
//add categories
router.post('/add',(req, res, next)=>{
let category = new Category();
category.title = req.body.title;
category.description = req.body.description;
Category.addCategory( category, (err, category)=>{
 if(err){
     res.send(err);
 }
 res.redirect('/manage/categories');
});
});

// edit categories
router.post('/edit/:id',(req, res, next)=>{
    let category = new Category();
    const query = {_id:req.params.id};
    const update={
        title:req.body.title,
        description:req.body.description
    }
    Category.updateCategory(query, update, {},(err, category)=>{
     if(err){
         res.send(err);
     }
     res.redirect('/manage/categories');
    });
    });
//delete category
router.delete('/delete/:id',(req, res)=>{
        Category.findAndDelete(req.params.id, (err)=>{
         if(err){
            return err;
         }
         res.redirect('/manage/categories');
        });
        });

module.exports = router;

 
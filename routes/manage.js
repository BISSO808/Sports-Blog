const express = require('express');
const router = express.Router();
const Article = require('../models/article')
router.get('/',(req, res, next)=>{
res.send('MANAGE');
});
router.get('/articles/add',(req, res , next)=>{
  Category.getCategories((err,categories)=>{
    if (err){
        res.return('err');
    }
res.render('add_article',
{
  title:'Create articles',
categories:categories
});
});
});
router.get('/categories/add',(req, res , next)=>{
  Category.getCategories((err,categories)=>{
    if (err){
        res.return('err');
    }

res.render('add_categories',
{title:'Create categories',
categories:categories});
});
});

// router.get('/articles',(req, res, next)=>{
//   res.render('manage_article',{title:'Manage Articles'});
//   });
router.get('/articles',(req, res, next)=>{
  // Category.getCategories((err,categories)=>{
  //   if (err){
  //       res.return('err');
  //   }
  //   });

  
Article.getArticles((err,articles)=>{
  if (err){
      res.return('err');
  }

    res.render('manage_article',{
        title:'Manage Articles',
        articles:articles,
        
});
});

});
router.get('/categories',(req, res, next)=>{
    Category.getCategories((err,categories)=>{
  if (err){
      res.return('err');
  }

    res.render('manage_categories',{
        title:'Manage Categories',
        categories:categories
});
    });

});
// router.get('/edit/:id',(req, res, next)=>{
//   res.render('edit_article',{title:'Edit Article'});
//   });

router.get('/categories/edit/:id',(req ,res, next)=>{
  Category.getCategoriesByID(req.params.id, (err, category)=>{
if (err){
  res.send(err);
}
res.render('edit_category',{title:'Edit category',
category:category
});
});
});
router.get('/articles/edit/:id',(req ,res, next)=>{
  Article.getArticleByID(req.params.id, (err, article)=>{
if (err){
  res.send(err);
}
Category.getCategories((err,categories)=>{
  if (err){
      res.return('err');
  }
res.render('edit_article',{title:'Edit article',
article:article,
categories:categories
});
});
});
});
router.get('/categories/delete/:id',(req, res , next)=>{
  Category.findAndDelete(req.params.id,(err,category)=>{
    if(err){
      return err;
    }
    Category.getCategories((err,categories)=>{
      if (err){
          res.return('err');
      }
    
        res.render('manage_categories',{
            title:'Manage Categories',
            categories:categories
    });
        });
  });
  });
  router.get('/articles/delete/:id',(req, res , next)=>{
    Article.findAndDelete(req.params.id,(err,article)=>{
      if(err){
        return err;
      }
      Article.getArticles((err,articles)=>{
        if (err){
            res.return('err');
        }
      
          res.render('manage_article',{
              title:'Manage Articles',
              articles:articles
      });
          });
    });
    });
module.exports = router;


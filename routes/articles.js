const express = require('express');
const router = express.Router();
const Article= require('../models/article');
router.get('/',(req, res, next)=>{
    Article.getArticles((err,articles)=>{
        if (err){
            res.return('err');
        }
res.render('articles',{
articles:articles
});
});
});
router.get('/article/:category_id',(req, res, next)=>{
   res.render('articles',{title:"Articles"});
    });
//add categories
router.post('/add',(req, res, next)=>{
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
    article.subtitle = req.body.subtitle;
    article.category = req.body.category;
    Article.addArticle( article, (err, article)=>{
     if(err){
         res.send(err);
     }
     res.redirect('/manage/articles');
    });
    });
// edit article
router.post('/edit/:id',(req, res, next)=>{
    let article = new Article();
    const query = {_id:req.params.id};
    const update={
        title : req.body.title,
        author:req.body.author,
        body :req.body.body,
        subtitle :req.body.subtitle,
        category : req.body.category
    }
    Article.updateArticle(query, update, {},(err, article)=>{
     if(err){
         res.send(err);
     }
     res.redirect('/manage/articles');
    });
    });
router.get('/edit/:id',(req, res, next)=>{
Experience.get
})
module.exports = router;

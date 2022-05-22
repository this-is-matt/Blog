const express = require('express');
const router = express.Router();
const Article = require('../Article');

router
.get('/', async (req,res) => {
    // res.send('We are on articles');
    try{
        const articles =  await Article.find();
        res.json(articles);
    } catch (err){
        res.json({message:err});  
    }
})
.post('/', async (req, res) => {
    const article = new Article({
        title: req.body.title,
        copy: req.body.copy
    });

    try{
        const savedArticle = await article.save();
        res.json(savedArticle);
    } catch (err) {
        res.json({
            message: err
        });
    }
});


module.exports = router
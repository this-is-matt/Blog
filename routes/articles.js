const express = require('express');
const router = express.Router();
const Article = require('../Article');

router
    .get('/', async (req, res) => {
        // res.send('We are on articles');
        try {
            const articles = await Article.find();
            res.json(articles);
        } catch (err) {
            res.json({
                message: err
            });
        }
    })
    .post('/', async (req, res) => {
        const article = new Article({
            title: req.body.title,
            copy: req.body.copy
        });

        try {
            const savedArticle = await article.save();
            res.json(savedArticle);
        } catch (err) {
            res.json({
                message: err
            });
        }
    })
    .put('/:id', (req, res) => {
        const id = req.params.id;
        Article.findByIdAndUpdate(id, 
            {
                title: req.body.title,
                copy: req.body.copy
            }, 
            {
                useFindAndModify: false
            })
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot update article with id=${id}.`
                    });
                } else res.send({
                    message: "Article was updated successfully."
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error Updating Article with id=" + id
                });
            });
    })


module.exports = router
const express = require('express');
const router = express.Router();
const Article = require('../Article');
const {
    articleValidation,
    validationResult
} = require('../validation');

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
    .post('/', articleValidation, async (req, res) => {
        // I literally have no idea. I can't find any documentation  on this other than the code written below and i can't ever get it to work. I have no idea. as i am sure is evident.
        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        //     return res.status(422).json({
        //         errors: errors.array()
        //     })
        // }
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
        Article.findByIdAndUpdate(id, {
                title: req.body.title,
                copy: req.body.copy
            }, {
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
    .delete('/:id', (req, res) => {
        const id = req.params.id;
        Article.findByIdAndRemove(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot delete article with id=${id}.`
                    });
                } else res.send({
                    message: "Article was deleted successfully."
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error deleting Article with id=" + id
                });
            });
    })


module.exports = router
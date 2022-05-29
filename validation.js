const {check} = require('express-validator');

exports.articleValidation = [
    check('title', 'Please include a title').not().isEmpty(),
    check('copy', 'please include a copy.').not().isEmpty()
];
//set up mongoose
const mongoose = require('mongoose');
const { userInfo } = require('os');
const Article = require('./Article');

// setup express
const express = require('express');
const app = express();

// setup dotenv
require('dotenv/config');

mongoose.connect(process.env.MONGODB_URI, 
() => { console.log("connected to DB")}, 
e => console.error(e));



// run()
// async function run(){
//     const article = await Article.create({title: "any", copy: "any"})
//     // same thing as the next two lines
//     // const article = new Article ({title: "any", copy: "any"});
//     // await article.save()
//     console.log(article)

// }






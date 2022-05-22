//set up mongoose
const mongoose = require('mongoose');
const Article = require('./Article');

//misc
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

// setup express
const express = require('express');
const app = express();

// setup dotenv
require('dotenv/config');

//set up swagger
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


mongoose.connect(process.env.MONGODB_URI, 
() => console.log("connected to DB"), 
e => console.error(e));


app
.use(bodyParser.json())
.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
.use('/', require('./routes'));


//set the port and return the port number
app.listen(port, () => {
    console.log(`App listening on ${port}`)
})


//very simple and basic example of a post. 
// run()
// async function run(){
//     const article = await Article.create({title: "any", copy: "any"})
//     // same thing as the next two lines
//     // const article = new Article ({title: "any", copy: "any"});
//     // await article.save()
//     console.log(article)

// }






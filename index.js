const express = require('express');
const app = express();

const recipesRoute = require('./routes/FetchRecipes');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/recipes', recipesRoute)


app.listen(5000, () => {
    console.log(`IT'S WORKING - PORT 5000`)
})
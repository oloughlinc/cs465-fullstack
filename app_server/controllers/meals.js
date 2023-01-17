var fs = require('fs');
var mealType = JSON.parse(fs.readFileSync('./data/meals.json'));

/* GET meals view */
const meals = (req, res) => {
    res.render('meals', { title: 'Meals - ', mealType});
};

module.exports = {
    meals
};
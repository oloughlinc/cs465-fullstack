/* GET meals view */
const meals = (req, res) => {
    res.render('meals', { title: 'Meals - '});
};

module.exports = {
    meals
};
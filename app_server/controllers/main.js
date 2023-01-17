var fs = require('fs');
var blog = JSON.parse(fs.readFileSync('./data/blog.json'));
var testimonials = JSON.parse(fs.readFileSync('./data/testimonials.json'));

/* GET homepage (index) */
const index = (req, res) => {
    res.render('index', { title: 'Home - ', blog, testimonials});
};

module.exports = {
    index
};
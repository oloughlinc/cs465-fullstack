// Get JSON trip data from server filesystem
// normally we do not want to make a file read on the controller each time it is accessed
var fs = require('fs'); // npm module fs access filesystem
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

/* GET travel view */
const travel = (req, res) => {
    res.render('travel', { title: 'Travel - ', trips});
};

module.exports = {
    travel
};
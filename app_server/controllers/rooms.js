var fs = require('fs');
var roomType = JSON.parse(fs.readFileSync('./data/rooms.json'));

/* GET rooms view */
const rooms = (req, res) => {
    res.render('rooms', { title: 'Rooms - ', roomType});
};

module.exports = {
    rooms
};
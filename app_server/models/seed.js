const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const seed = async function() {
    const trips = JSON.parse(fs.readFileSync(path.join('data', 'trips.json'), 'utf8'));
    const trip = mongoose.model('trips');
    await trip.deleteMany(); // remove all from this collection
    await trip.insertMany(trips); // enter data from trips.json
}

module.exports = {seed};
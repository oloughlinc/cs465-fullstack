const mongoose = require('mongoose');

// mongoose allows us to easily create a schema for our data. New data entering must conform and
// will be checked against this automatically. Mongo doesnt need a schema but this helps keep our data predictable
const tripSchema = new mongoose.Schema({
    code: {type: String, required: true, index: true},
    name: {type: String, required: true, index: true},
    length: {type: String, required: true},
    start: {type: Date, required: true},
    resort: {type: String, required: true},
    perPerson: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true}
});
mongoose.model('trips', tripSchema); // compile the schema



const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};

/* GET travel list*/
// make an api call to retrieve all trips from the database
const getTravelList = (req, res) => {

    const path = '/api/trips'; // define the api endpoint to hit
    const requestOptions = { // npm request module parameters 
        url: `${apiOptions.server}${path}`,
        method: 'GET', // default is GET anyway
        json: {}, // must send a request body, even if empty
    };

    console.info(`[INFO] sending request to ${requestOptions.url}`); // log request

    // create the request
    request(
        requestOptions,
        (err, {statusCode}, body) => {
            if (err) {
                console.error(err); // report error if occurred
            }
            renderTravelList(req, res, body); // handle response body
        }
    )
}

/* response body validator/render for travel list */
const renderTravelList = (req, res, responseBody) => {

    // validate the response data before rendering
    var message = null;
    var pageTitle = 'Travel - '
    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = 'No trips exist in our database!';
        }
    }
    
    // create the view after validation
    // passing the trip data as JSON in response body for template engine to use
    res.render('travel',
        { // these variables are passed to template engine
            title: pageTitle,
            trips: responseBody,
            errorMessage: message
        }
    )
}

module.exports = {
    getTravelList
};
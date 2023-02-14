const express = require('express');
const router = express.Router();

// library for working with bearer tokens
const { expressjwt: jwt } = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256'] // required in later versions, 
    // https://www.npmjs.com/package/jsonwebtoken default HS256
});

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

router
/**
 * @swagger
 * /api/register:
 *      post:
 *          tags:
 *              - Authentication
 *          summary: Register a new account
 *          description: Register a new account on the database.
 * 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  description: The name of the user of this account.
 *                                  example: John Smith
 *                              email:
 *                                  type: string
 *                                  description: The unique email account associated with this account. This will be used for login credentials.
 *                                  example: JohnSmith@email.com
 *                              password:
 *                                  type: string
 *                                  description: The password for this account.
 *                                  example: mySecretPassword    

 *          responses:
 *              200:
 *                  description: New account was created successfully, returns a new timed bearer token for a session (JWT).
 *              401:
 *                  description: Account was not created due to invalid credentials, such as using an email address that already exists in the database. Returns JSON information about the error.
 *              404:
 *                  description: An error occurred during connection to the database. Returns a JSON error message.
 */
    .route('/register')
    .post(authController.register)
    ;

router
/**
 * @swagger
 * /api/login:
 *      post:
 *          tags:
 *              - Authentication
 *          summary: Login to an existing account
 *          description: Login to an existing account on the database.
 * 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  description: The email address associated with this account.
 *                                  example: JohnSmith@email.com
 *                              password:
 *                                  type: string
 *                                  description: The password for this account.
 *                                  example: mySecretPassword    

 *          responses:
 *              200:
 *                  description: Login successful, returns a new timed bearer token for a session (JWT).
 *              401:
 *                  description: Login failed due to invalid credentials, such as an invalid password. Returns JSON information about the error.
 *              404:
 *                  description: An error occurred during connection to the database. Returns a JSON error message.
 */
    .route('/login')
    .post(authController.login)
    ;

router
    .route('/trips') // register route /api/trips (since /api is the base for this router)
/**
 * @swagger
 * /api/trips:
 *      get:
 *          tags:
 *              - Trip Data
 *          summary: Get all trips
 *          description: Get all information on all trips stored in the database.
 *          responses:
 *              200:
 *                  description: Query completed (even if nothing found), returns JSON trip data in an array.
 *              404:
 *                  description: No response from the database or an error occurred. Returns JSON error message.
 */
    .get(tripsController.tripsList) // respond to get commands with this controller function
/**
 * @swagger
 * /api/trips:
 *      post:
 *          tags:
 *              - Trip Data
 *          summary: Create a new trip
 *          description: Create a new trip on the database.
 * 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              code:
 *                                  type: string
 *                                  description: The unique identification code of this trip.
 *                                  example: BBY2023281111
 *                              name:
 *                                  type: string
 *                                  description: The name of this trip.
 *                                  example: Bombaby Bay
 *                              length:
 *                                  type: string
 *                                  description: The length of this trip, X nights / Y days,
 *                                  example: 6 nights / 7 days        
 *                              start:
 *                                  type: string
 *                                  description: The starting date of this trip in standard time format. 
 *                                  example: 2023-02-08T08:00:00Z
 *                              resort:
 *                                  type: string
 *                                  description: The name of the resort included in this trip.
 *                                  example: The Grand Bombaby, 5 stars
 *                              perPerson:
 *                                  type: string
 *                                  description: The price per person.
 *                                  example: 2398.99
 *                              image:
 *                                  type: string
 *                                  description: Link to the image associated with this trip.
 *                                  example: reef4.jpg
 *                              description:
 *                                  type: string
 *                                  description: HTML formatted description text for this trip.
 *                                  example: <p>Fun in the sun!</p>
 *          responses:
 *              201:
 *                  description: Trip was successfully created, returns JSON data of trip added (mirrors back).
 *              400:
 *                  description: Bad request or invalid content, returns JSON error data.
 */
    .post(auth, tripsController.tripsAddTrip)
    ;
    
router
    //:code specifies this as a variable, it can be anything (except nothing, that counts as a different route)
    .route('/trips/code/:code') 
/**
 * @swagger
 * /api/trips/code/{code}:
 *      get:
 *          tags:
 *              - Trip Data
 *          summary: Get a single trip
 *          description: Get all details of a single trip by unique identifier code.
 *          parameters:
 *              - name: code
 *                in: path
 *                description: A unique ID code for a trip
 *                required: true
 *                type: string
 *          responses:
 *              200:
 *                  description: Query completed (even if nothing found), returns JSON trip data
 *              404:
 *                  description: No response from the database or an error occurred. Returns JSON error message.
 */
    .get(tripsController.tripByCode)
/**
 * @swagger
 * /api/trips/code/{code}:
 *      put:
 *          tags:
 *              - Trip Data
 *          summary: Update a single trip
 *          description: Update a single trip on the database referenced by unique identifier code.
 *          parameters:
 *              - name: code
 *                in: path
 *                description: A unique ID code for a trip
 *                required: true
 *                type: string
 *                example: BBY2023281111
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              code:
 *                                  type: string
 *                                  description: The unique identification code of this trip.
 *                                  example: BBY2023281111
 *                              name:
 *                                  type: string
 *                                  description: The name of this trip.
 *                                  example: Bombaby Bay
 *                              length:
 *                                  type: string
 *                                  description: The length of this trip, X nights / Y days,
 *                                  example: 6 nights / 7 days        
 *                              start:
 *                                  type: string
 *                                  description: The starting date of this trip in standard time format. 
 *                                  example: 2023-02-08T08:00:00Z
 *                              resort:
 *                                  type: string
 *                                  description: The name of the resort included in this trip.
 *                                  example: The Grand Bombaby, 5 stars
 *                              perPerson:
 *                                  type: string
 *                                  description: The price per person.
 *                                  example: 2398.99
 *                              image:
 *                                  type: string
 *                                  description: Link to the image associated with this trip.
 *                                  example: reef4.jpg
 *                              description:
 *                                  type: string
 *                                  description: HTML formatted description text for this trip.
 *                                  example: <p>Fun in the sun!</p>
 *          responses:
 *              204:
 *                  description: Trip was successfully updated, returns JSON data of trip updated.
 *              404:
 *                  description: Trip not found or invalid update content, returns JSON error message.
 *              500:
 *                  description: An internal server error occured, returns JSON error message.
 */
    .put(auth, tripsController.tripsUpdateTrip)
    ;



module.exports = router;
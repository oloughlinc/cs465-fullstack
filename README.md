# CS-465 Full Stack Development with MEAN

This project is a full stack application including database implementation, server, API, public facing website, and Angular web application.

# Architecture

This project uses the MEAN stack: MongoDB, Express, Angular, Node.js. This tech stack is well-established and well-supported. It enables this project to be built using JavaScript front to back for a more consistent development environment. Express on top of Node.js is used for the server API and multi-page website. Angular is used to build the admin SPA web application. The backend database is built with MongoDB, a NoSQL database, which is a good choice here due to the ease of setup for a simple application that can be easily extended if needed. 

# Functionality

The multi-page website served via HTML allows users to view travel accomodations. The admin SPA in Angular is a JavaScript driven tool where a user can add or modify accommodations on the database through the API. Data flow from the database out to the user is entirely JSON and is properly decoupled from the views using an MVC pattern. The SPA retreives JSON data via HTTP and adds it to the view, as does the multi-page Express site. 

This project was built iteratively over 7 weeks, and refactored multiple times as needed. For example, the first iteration featured static data in HTML view, which was refactored to JSON files on server added via templating (Handlebars). This was further refactored to a MongoDB retrieval through Mongoose, and finally an API was built to facilitate and generalize database transactions. 

# Testing

Most of the testing here was done manually due to the size of the project and the allotted timeframe. Testing was performed each week along with the next development iteration. UI testing of both the static website and Angular SPA was performed along with testing the API using the Postman HTTP tool. As different features such as security were added it was especially important to continually retest previously built components that were now implementing them. Security authorization was built using web tokens (JWT format) issued by the server API.

# Reflection

Building an entire web application stack start to finish was a fun project, and allowed me to better understand how the different components of a tech stack work together to produce 1) a working, useful tool for a business or other entity and 2) clean, modular coding segments that are easier to build, improve, and maintain. Especially important were being able to experience why documentation and the MVC pattern are so powerful as a foundation for any project, as they make an application fundamentally easier to maintain in the long run for a small investment of development time upfront. 



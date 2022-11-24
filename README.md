# Fish Inventory Application

Here you'll find a barebones Express app used for fish inventory management. It contains your standard CRUD actions and was developed to further practice using Express with the MVC pattern. As this app was created for backend practice with Express it contains no styling aside from that provided through the Express generator. This may be revisited in the future.

This project is done following The Odin Project, which can
be found [here](https://www.theodinproject.com/courses/nodejs/lessons/inventory-application).

## Local Setup

To run the application, first install the dependencies using **npm install**.

Create a .env to setup the environment variables needed for database access and setting your own password for DELETE actions. These variables are as follows:

- MONGODB_URI
- ADMIN_PASSWORD

Then use **npm start** to start the application.

## Usage

Prior to usage, a populatedb file is provided with different types of fish and categories for the type of water they thrive in. Feel free to populate the database using **node populatedb <your DB url>** to add some sample data.

The application is an inventory management application that contains **Items** and **Categories** for organizing items into.

The following features are available in this app:

- Adding items
- Adding categories
- Viewing items
- Viewing categories
- Updating items
- Updating categories
- Removing items (with admin password)
- Removing categories (with admin password)

### Important

All items are to be associated with an available category that has been previously created. If no categories exist, then item creation will be prevented. Make sure there is always one active category available.

Items containing previously removed categories will be marked as _Missing Category_.

## Useful References

- Mozilla Express Node Tutorial: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs
- Idea of approaching referencing an object by id: https://stackoverflow.com/questions/36201689/mongoose-find-a-document-by-reference-property
- Then query chaining using prior results, see second answer: https://stackoverflow.com/questions/20699947/how-to-return-query-results-to-a-variable-using-mongoose/20702542
- Setting up environment variables with Node: https://codeburst.io/how-to-easily-set-up-node-environment-variables-in-your-js-application-d06740f9b9bd

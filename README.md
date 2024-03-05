# Frontend project

# eMart

![Homepage](./src/images/homepage.JPG)
![Login page](./src/images/loginn.JPG)

An innovative e-commerce platform designed to simplify your shopping experience. eMart enables users to browse through a wide range of products, manage their shopping cart, register, and login to access personalized features. Crafted with TypeScript and Redux Toolkit for the frontend and robust Node.js will be used in the backend, eMart exemplifies a responsive and user-friendly shopping environment.

## Overview

**Architecture & Technologies:** eMart leverages React, and Node.js for application development. The frontend employs TypeScript and Redux Toolkit for state management, alongside Material-UI for a responsive design.

**Project Structure:** The project is organized into two main sections:

- The emart-frontend directory hosts the React application, incorporating Redux for global state management, Material-UI components for styling, and React Router for navigation.
- The backend directory will contain server configurations, API routes, models, and a database connection setup.

## Features

- **Product Browsing:** Users can view all products, with functionalities to filter by category and sort by price.
- **User Authentication:** Features for user registration and login, enabling personalized experiences like profile management.
- **Shopping Cart:** Functionality to add, update quantity, or remove products from the cart.
- **Admin Features:** Exclusive product management capabilities for application administrators.(Under construction)

## Getting started

### Requirements

- Modern web browser with JavaScript enabled
- Node.js (version 14 or newer)
- MongoDB (version 4.0 or newer)(WIP)

### Quickstart

1. Clone the repository to your local machine.
2. Navigate to the directories to install dependencies using `npm install`.
3. Configure your `.env` files in the respective directories as per provided specifications.
4. Execute `npm start` in the backend directory to launch the server.
5. Concurrently, run `npm start` in the Frontend-project directory to serve the React application.

### Testing

- Run `npm test` in the frontend directory to run the tests.
  -Test is carried out on the product reducers using React testing library and Jest.

### Deployment

-The project is ready to be deployed to Netlify with this link: https://emart-frontend-project.netlify.app/

## License

Copyright (c) 2024.
This repository for the Frontend project to build an e-commerce website.

## Requirements

#####################################################################################################

### Basic requirements

The Front end project must use TypeScript and Redux toolkit.

1. Use the API endpoint `https://fakeapi.platzi.com/`.

2. Create at lease 4 pages (can be more if you want): Page for all products, product page, profile page (only available if user logins), and cart page (cart page could be a page or a modal)

3. Create Redux store for following features:

   - product reducer: get all products, find a single products, filter products by categories, sort products by price. Create, update and delete a product (enable update & delete features only for admin of the webapp)
   - user reducer: register and login
   - cart reducer: add product to cart, remove products, update products's quantity in cart

4. When adding routers to your application, set certain routes to be private. For example, route to user profile page should not be accessible if user has not logged in.

5. Styling: must have responsive

6. Implement unit testing for the reducers

7. **Deploy** the application and rewrite README file.

### Additional features:

- Use Context API to switch theme
- Use pagination when fetching/displaying all the products
- Implement performance optimization where applicable

## Grading (1-5)

1: Late submission or not complete basic requirements

2: Basic requirement + Presentation

3: Folder structure + follow convention(naming convention ,loading, error) + some additional features

4: All additional features + reusable logic + custom hook

5: UI-UX (for example: send alert when user add same product) + styling (animation or transition, scroll to top) + advanced feature (google log in)

## Deadline

- Presentation: **7/3** and **8/3/ 2024**
- Submitting Front-end project **10am 8/3/2024**

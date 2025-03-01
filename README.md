# Vidhya Ghar

## Overview

Vidhya Ghar is a web application that allows users to buy and sell old books online.

## Features

- User Authentication
- Book Listing and Search
- Shopping Cart
- Order Processing

## Technologies Used

- React
- Node.js
- Express
- MongoDB

## Installation

1. Clone the repository
    ```bash
    git clone https://github.com/sakshamgandhi20/VidyaGhar.git
    ```
2. Install dependencies in both frontend and backend
    ```bash
    cd my-react-app
    npm install
    ```
    ```bash
    cd Backend
    npm install
    ```
3. Start the servers
    Before starting the servers, make sure to create a `.env` file in the Backend folder and add the following variables:
    
    ```bash
    dburl=<your_mongodb_url>
    SEC_KEY=<your_secret_key>
    EMAIL=<your_email>
    EMAIL_PASSWORD=<your_email_password>
    ```

    Then you can start the servers by running the following commands:
    ```bash
    cd Backend
    npm start
    ```

    ```bash
    cd my-react-app
    npm start
    ```




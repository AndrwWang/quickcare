const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors')

const url = 'https://www.piedmont.org/emergency-room-wait-times/emergency-room-wait-times';

let htmlContent;

axios.get(url)
  .then((response) => {
    htmlContent = response.data;
    module.exports = htmlContent; // Export the HTML content as a module
  })
  .catch((error) => {
    console.error('An error occurred while fetching the web page:', error);
  });

  app.use(
    cors({
      origin: 'http://localhost:3000', // Update this with the actual origin of your React app
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    })
  );

  app.get('/api/data', (req, res) => {
    res.send(htmlContent);
  });
  
  // Add any additional routes and logic as needed
  // You can also process the HTML content further using Cheerio or other libraries here
  
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
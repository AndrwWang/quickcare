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

  app.get('/api/fetch-data', async (req, res) => {
    try {
      // Make a server-side Axios GET request
      const response = await axios.get('https://www.choa.org/Tools/CareCenters.aspx?v=1697249584693&_=1697249584672', {
        headers: {
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'Accept-Language': 'en-US,en;q=0.9'
        },
      });
  
      // Extract and format the data
      const emergencies = [
        "Children's Scottish Rite Hospital: " + response.data.linked.waitTimes[5].maxWaitTime,
        "Children's Egleston Hospital: " + response.data.linked.waitTimes[6].maxWaitTime,
        "Children's Hughes Spalding Hospital: " + response.data.linked.waitTimes[7].maxWaitTime
      ];
  
      // Log the server-side data to the console
      console.log('Server-side data:', emergencies);
  
      // Send a response to the client
      res.json(emergencies);
    } catch (error) {
      console.error('Error fetching data:', error);
  
    }
  });
  
  // Add any additional routes and logic as needed
  // You can also process the HTML content further using Cheerio or other libraries here
  
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
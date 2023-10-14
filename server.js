const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001; // Choose any available port


app.use(express.json());
app.use(cors());

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

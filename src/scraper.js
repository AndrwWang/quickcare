import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function DataGatherer () {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/data')
    .then((response) => {
        if (!response.ok) {
        throw new Error("Network response was not ok");
        }
        return response.text(); // Get the response as text
    })
    .then((htmlContent) => {
        htmlContent = htmlContent

        // Create a div element to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;

        // Find all the elements with class "erLocation" (assuming each location is within a container with this class)
        const locationElements = tempDiv.querySelectorAll('.erLocation');

        // Extract and format the data for each location
        const extractedData = Array.from(locationElements).map(locationElement => {
        const name = locationElement.querySelector('a')?.textContent || 'N/A';
        const address = locationElement.querySelector('.erLocationInfo')?.textContent.trim() || 'N/A';
        const time = locationElement.querySelector('.erLocationTime')?.textContent.trim() || 'N/A';

          return { name, address, time };
        });
        setData(extractedData);
    })
    .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
    });
}, []);

    return data;
  
}
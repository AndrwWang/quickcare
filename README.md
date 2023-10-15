[Website Demo Video](https://youtu.be/C5ccDFRQd88?si=zq6KAwx2JMMQlsWI)

## Inspiration
Since 2018, the median wait time in hospital emergency rooms in the US has been increasing, even after the Covid pandemic ended (2:15 hours in 2018 to 2:40 hours in 2022). This is highly concerning, as longer wait times result in delayed treatments, increased pain for waiting patients, and unpleasant treatment environments. What people don’t realize is that wait times are so long that they greatly offset the driving time, meaning that the closest facility to drive to will not necessarily get you treatment the fastest. Realizing a need for this solution, we wanted to create a platform that finds optimal facilities to minimize the suffering of desperate patients. 

## What it does
Using live hospital ER and urgent care wait times and live traffic information, QuickCare finds the optimal facility a user should commute to based on their location. With a clean UI, users can navigate the website easily so they can find the urgent information they need as conveniently as possible.

## How we built it and challenges
To get real time wait times for different hospital systems, we had to create server side requests using Node.js because no official API’s were provided. These wait times are updated every 15 minutes. Express was used to expose the server side requests as an end point to the client side so that we can access the real time data from the web. 
Real time driving estimates using real time traffic data was crucial to our website, so we had to navigate the Google Map Routes API instead of older API’s like the Direction API. As the Routes API was very new, there was little documentation that we could follow. As the Routes API uses real time traffic data, we had to make efficient requests to Google Cloud to quickly display data to the user. 
Adding up the driving times and waiting times, we sorted the total time, visualizing the most navigation to the medical facility with the quickest treatment time. For every facility, we also displayed their address, phone number, and reviews to give the user as much information as possible.
We used React.js to develop a website with clean UI and informative visualizations. We made the website as easily to navigate as possible as people are in a rush when in an emergency and in pain. 



## Accomplishments that we're proud of
Though we are proud of the technical challenges that we have overcome, we are most satisfied with our execution of a promising idea. We designed and built a user-centric product that has the potential to directly benefit people in an innovative way. This website, if deployed to the public, can directly ease pain for many people. 

## What we learned

Some technical skills we learned were …


##What's next 
There are many more features we can add to enhance our existing version. For example, we can filter facilities by the insurances they accept and the specialty services they offer. Not everyone commutes by car, so we can toggle our calculations to account for commuting by public transit. We want a smooth user experience across all mediums, so working on compatibility for all device dimensions is important to us too. 
Also, many ER/urgent care centers do not have public wait times, which are vital information for patients. We can work with these facilities and help them establish wait time estimations, and then connect the wait time with QuickCare. The more facilities in our system, the more optimized our website is for finding the facility with the quickest treatment. Other than hospitals, we can also work with insurance companies and the government to further the website’s reach.

# Food Finder Application

Application to help find food near the office. Users can get random restaurants, search for a specific type of restaurants and view specific information a restaurant.

## Technical Stack

- ReactJS / Typescript
- ViteJS
- ChakraUI
- ExpressJS
- NodeJS

## Solution / Design Decisions

Document shows initial design mocks and a quick architecture diagram. Typically this is more fleshed out but it shows initial design implementation process.

Process: List Requirements -> design software architecture basic -> wireframe UI -> implement api points and test on postman -> create Frontend

https://www.figma.com/file/RrYcfF7hsBJGobk7Du86IE/lunch-app?type=design&node-id=0%3A1&mode=design&t=liYaFOwtxqgKiQSE-1


- This Application uses Google Places API and Map API Node Client and the React Google Maps package to display results on on a google map. Using React Query features, caching of data and creating a search that then puts additional markers on to the map. When clicking a Marker, user can see the information on the left hand side. If user clicks on name of restaurant they are taken to individual page for the restaurant giving more detailed information.

#### ChakraUI

- A component library to speed up the designing the UI, this allows for quick UI development.

#### ExpressJS / NodeJS

- While this is frontend focused application, due to Google map and Places API, it is most suitable to make some of the calls in a Backend( explained more in tradeoffs section). Due to this I can manipulate the data I need not on the client. 

#### Cypress
- This project uses Cypress to do E2E tests and test API. 

### Build Instructions

Frontend

```
cd client

yarn add / npm install

yarn dev / npm run dev

```

Backend
```
yarn add / npm install

yarn start / npm run start
```
Open http://localhost:5173 with your browser to see the result

### Testing Instructions
```
yarn cypress open
```
## Trade Offs

1. Backend Image Processing
   
   a. Due to google returning only "blob" | "arraybuffer" | "stream" and not a direct link to the image, it is best not to process and manipulate the images on the front end. This project makes a very simple api to handle this. A more optimal way would be the backend processing the image and saving it to a server or in cloud while creating a link to the image that the frontend can access.

2. Get Random Restaurant API
  
    a.  The Google Places API only gives 20 restaurants at a time, so the backend of the projects just grabs a random restaurant from these restaurants. To further improve on this, the backend can track if restaurant has been picked and keep picking from list so the Google Places API is not called until new restaurants is needed.
3. Folder Structure

## Additional Possible Features
1. User Favorites
  - To further expand, one can add a heart button that will store a list of the restaurants the user likes. For a simple solution without a BE, it can be done with context and localStorage. 
2. List all the restaurants shown on Left side and have next and back buttons.
3. Show Route to the Restaurant picked.
4. Docker the App and create additional functional testing.

### Links

Personal Site: https://keyaria.github.io/

Worked on 
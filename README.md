# Food Finder Application

Application to help find food near the office. Users can get random restaurants, search for a specific type of restaurants and view specific information a restaurant.

## Technical Stack

- ReactJS / Typescript
- ViteJS
- ChakraUI
- ExpressJS
- NodeJS

// TODO: Add diagram

## Solution / Design Decisions
- This Application uses Google Places API and Map API Node Client and the React Google Maps package to display results on on a google map. Using React Query features, caching of data and creating a search that then puts additional markers on to the map. When clicking a Marker, user can see the information on the left hand side. If user clicks on name of restaurant they are taken to individual page for the restaurant giving more detailed information.

#### ChakraUI

- A component library to speed up the designing the UI, this allows for quick UI development.

#### ExpressJS / NodeJS

- While this is frontend focused application, due to Google map and Places API, it is most suitable to make some of the calls in a Backend( explained more in tradeoffs section). Due to this I can manipulate the data I need not on the client. 

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
2. Get Random API

## Additional Feature
1. User Favorites
  - To further expand, one can add a heart button that will store a list of the restaurants the user likes. For a simple solution without a BE, it can be done with context and localStorage. 
2. List all the restaurants shown on Left side and have next and back buttons.

### Links

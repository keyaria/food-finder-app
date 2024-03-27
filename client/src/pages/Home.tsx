import { useState } from "react";
//import reactLogo from "../assets/react.svg";

import "../App.css";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

import {
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";

const cogentLocation = {
  lat: 35.665499,
  long: 139.7382,
};

function HomePage() {
  return (
    <>
      <Flex align="center" justify="center" w="100%" bg="cyan.50" px="1rem">
        <Input
          placeholder="Search Bar"
          size="md"
          m="1.4rem"
          ml="0"
          variant="outline"
          maxW="800px"
          bg="white"
        />
        <Button>Search</Button>
      </Flex>
      <Grid templateColumns="repeat(5, 1fr)" w="100%" h="100%">
        {/* Restaurant Component */}
        <GridItem bg="gray.50" colSpan={2}>
          res
        </GridItem>
        {/* Map Component */}
        <GridItem colSpan={3}>
          <Map
            style={{ width: "100%", height: "100%" }}
            defaultCenter={{
              lat: cogentLocation.lat,
              lng: cogentLocation.long,
            }}
            defaultZoom={16}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          >
            <Marker
              position={{ lat: cogentLocation.lat, lng: cogentLocation.long }}
            />
          </Map>
        </GridItem>
      </Grid>
    </>
  );
}

export default HomePage;

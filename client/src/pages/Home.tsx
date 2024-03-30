import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import "../App.css";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

import {
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  SimpleGrid,
  Card,
  Text,
} from "@chakra-ui/react";
import { Restaurant } from "../types/Restaurant";

import RestaurantCard from "../components/Restaurant/RestaurantCard";
import useDebounce from "../hooks/useDebounce";
import {
  useQueryClient,
  useSuspenseQuery,
  useIsFetching,
} from "@tanstack/react-query";
import { fetchPlace } from "../helpers/helpers";
import { cogentLocation } from "../constants/data";


// TODO: add simple Errors and validation
function HomePage() {
  const [restaurant, setRestaurant] = useState();

  const [queryId, setQueryId] = useState<string>("1");
  // const [text, setText] = useState<string>("home");

  const [searchedRestaurants, setSearchedRestaurants] = useState([]);
  const queryClient = useQueryClient();

  const {
    status,
    data: recRestaurant,
    error,
  } = useQuery<Restaurant>({
    queryKey: ["getPlace"],
    queryFn: fetchPlace,
  });

  // TODO: Fix bug, search is called onMount
  //Checks Cache after debouncing to see if data has already been retrieved
  const { data: searchResults, isLoading } =useDebounce(useQuery({
    queryKey: [`getResults/${queryId}`],
    queryFn: async (arg) => {
      const cache = getFromCache(`getResults/${queryId}`); // try to access the data from cache
      if (cache) return cache; // use the data if in the cache

      // if not, get the data
      const data = await fetch(
        `http://localhost:8080/restaurant/search?lat=${cogentLocation.lat}&lng=${cogentLocation.long}&text=${arg.queryKey[0].split("/")[1]}`,
      );

      const restaurants = await data;
      console.log("the res", restaurants);
      return restaurants.json();
    },
  }), 500);

  const searching = useIsFetching({ queryKey: ["getResults"] }) > 0;

  if (searchResults) {
    console.log("res", searchResults);
  }
  if (error) {
    console.log("error", error);
  }

  const handleChange = (id: string) => {
    setQueryId(id || "1");
  };

  const getFromCache = (key: string) => {
    return queryClient.getQueryData([key]);
  };

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
          onChange={(e) => handleChange(e.target.value)}
        />
        <Button>Search</Button>
      </Flex>
      <Grid templateColumns="repeat(5, 1fr)" w="100%" h="100%">
        {/* Restaurant Component */}
        <GridItem bg="gray.50" colSpan={2}>
          {/* {isLoading ? "loading" : searchResults} */}
          <div id="search-spinner" aria-hidden hidden={!searching} />
          <Card></Card>
          {recRestaurant && <RestaurantCard restaurant={recRestaurant} />}
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
            {recRestaurant && (
              <Marker
                position={{
                  lat: recRestaurant.geometry.location.lat,
                  lng: recRestaurant.geometry.location.lng,
                }}
              />
            )}
            {searchResults &&
              searchResults.map((item: Restaurant) => {
                return (
                  <Marker
                    position={{
                      lat: item.geometry.location.lat,
                      lng: item.geometry.location.lng,
                    }}
                  />
                );
              })}
          </Map>
        </GridItem>
      </Grid>
    </>
  );
}

export default HomePage;

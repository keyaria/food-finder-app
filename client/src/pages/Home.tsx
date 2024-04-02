import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import "../App.css";
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map,
  Marker,
  Pin,
  useAdvancedMarkerRef,
  useMarkerRef,
} from "@vis.gl/react-google-maps";

import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import { Button, Flex, Grid, GridItem, Input, Card } from "@chakra-ui/react";
import { Restaurant, RestaurantResponse } from "../types/Restaurant";

import RestaurantCard from "../components/Restaurant/RestaurantCard";
import useDebounce from "../hooks/useDebounce";
import { useQueryClient, useIsFetching } from "@tanstack/react-query";
import { fetchPlace } from "../helpers/helpers";
import { cogentLocation } from "../constants/data";
import AllRestaurantsCard from "../components/Restaurant/AllRestaurants";

// TODO: add simple Errors and validation, Make Map Component, add get random Restaurant Button
function HomePage() {
  const [queryId, setQueryId] = useState<string>("1");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRes, setSelectedRes] = useState<Restaurant>();

  const queryClient = useQueryClient();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infowindowShown, setInfowindowShown] = useState(false);

  const toggleInfoWindow = () =>
    setInfowindowShown((previousState) => !previousState);

  const closeInfoWindow = () => setInfowindowShown(false);

  const {
    status,
    data: recRestaurant,
    error,
  } = useQuery<RestaurantResponse>({
    queryKey: ["getPlace", selectedRes],
    queryFn: fetchPlace,
  });

  // TODO: Fix bug, search is called onMount
  //Checks Cache after debouncing to see if data has already been retrieved
  const { data: searchResults, isLoading } = useDebounce(
    useQuery({
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
      enabled: searchTerm.trim() !== "",
    }),
    500,
  );

  const searching = useIsFetching({ queryKey: ["getResults"] }) > 0;

  if (error) {
    console.log("error", error);
  }

  const handleChange = (id: string) => {
    setQueryId(id || "1");
    setSearchTerm(id);
    // refetch()
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
          data-testid="search"
          onChange={(e) => handleChange(e.target.value)}
        />
        <Button>Search</Button>
      </Flex>
      <Grid templateColumns="repeat(5, 1fr)" w="100%" h="100%">
        {/* Restaurant Component */}
        <GridItem bg="gray.50" colSpan={2}>
          {/* {isLoading ? "loading" : searchResults} */}
          <div id="search-spinner" aria-hidden hidden={!searching} />
          {recRestaurant && <RestaurantCard restaurantInfo={recRestaurant} />}
        </GridItem>
        {/* Map Component */}
        <GridItem colSpan={3}>
          <Map
            style={{ width: "100%", height: "100%", minHeight: "100vh" }}
            defaultCenter={{
              lat: cogentLocation.lat,
              lng: cogentLocation.long,
            }}
            defaultZoom={16}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            mapId={"bf51a910020fa25a"}
          >
            <AdvancedMarker
              position={{ lat: cogentLocation.lat, lng: cogentLocation.long }}
              data-testid="marker"
            >
              <Pin
                background={"#22ccff"}
                borderColor={"#1e89a1"}
                glyphColor={"#0f677a"}
              ></Pin>
            </AdvancedMarker>
            {recRestaurant && (
              <AdvancedMarker
                position={{
                  lat: recRestaurant.restaurant.geometry.location.lat,
                  lng: recRestaurant.restaurant.geometry.location.lng,
                }}
              >
                <Pin></Pin>
              </AdvancedMarker>
            )}
            {searchResults &&
              searchResults.map((item: Restaurant) => {
                return (
                  <>
                    <AdvancedMarker
                      position={{
                        lat: item.geometry.location.lat,
                        lng: item.geometry.location.lng,
                      }}
                      // ref={markerRef}
                      data-testid="searchResults"
                      onClick={() => {
                        setSelectedRes(item);
                      }}
                    />
                    {/* {infowindowShown && (
                  <InfoWindow anchor={marker}>
                             <ChakraLink
        as={ReactRouterLink}
        to={`/restaurant/` + item.place_id}
      >{item.name}
                </ChakraLink>
                </InfoWindow>
                  )} */}
                  </>
                );
              })}
          </Map>
        </GridItem>
      </Grid>
    </>
  );
}

export default HomePage;

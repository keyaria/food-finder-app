import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import "../App.css";

import { Button, Flex, Grid, GridItem, Input, Text } from "@chakra-ui/react";
import { Restaurant, RestaurantResponse } from "../types/Restaurant";

import RestaurantCard from "../components/Restaurant/RestaurantCard";
import useDebounce from "../hooks/useDebounce";
import { useQueryClient, useIsFetching } from "@tanstack/react-query";
import { fetchPlace } from "../helpers/helpers";
import { cogentLocation } from "../constants/data";

import CustomMap from "../components/Map";
// import { useAdvancedMarkerRef } from "@vis.gl/react-google-maps";

// TODO: add simple Errors and validation, Make Map Component, add get random Restaurant Button
function HomePage() {
  const [queryId, setQueryId] = useState<string>("1");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRes, setSelectedRes] = useState<Restaurant>();

  const queryClient = useQueryClient();

  const {
    data: recRestaurant,
    error,
    refetch,
    isLoading,
  } = useQuery<RestaurantResponse>({
    queryKey: ["getPlace"],
    queryFn: fetchPlace,
  });

  // TODO: Fix bug, search is called onMount
  //Checks Cache after debouncing to see if data has already been retrieved
  const { data: searchResults } = useDebounce(
    useQuery({
      queryKey: [`getResults/${queryId}`],
      queryFn: async (arg) => {
        const cache = getFromCache(`getResults/${queryId}`); // try to access the data from cache
        if (cache) return cache; // use the data if in the cache

        // if not, get the data
        const data = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/restaurant/search?lat=${cogentLocation.lat}&lng=${cogentLocation.long}&text=${arg.queryKey[0].split("/")[1]}`,
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

  const handleClick = () => {
    // manually refetch
    refetch();
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
          maxW="600px"
          bg="white"
          data-testid="search"
          onChange={(e) => handleChange(e.target.value)}
        />
        <Text mr="1rem">OR</Text>
        <Button onClick={handleClick}>Find Restaurant</Button>
      </Flex>
      <Grid templateColumns={{ md: "repeat(5, 1fr)" }} w="100%" h="100%">
        {/* Restaurant Component */}
        <GridItem bg="gray.50" colSpan={2}>
          <div
            id="search-spinner"
            aria-hidden
            hidden={!searching || !isLoading}
          />
          {recRestaurant && <RestaurantCard restaurantInfo={recRestaurant} />}
        </GridItem>
        {/* Map Component */}
        <GridItem colSpan={3}>
          <CustomMap
            recRestaurant={recRestaurant}
            searchResults={searchResults}
            setSelectedRes={setSelectedRes}
            selectedRes={selectedRes}
          />
        </GridItem>
      </Grid>
    </>
  );
}

export default HomePage;

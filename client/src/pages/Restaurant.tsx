import { VStack, Text } from '@chakra-ui/react'
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Restaurant } from "../types/Restaurant";

async function fetchRestaurantInfo(id: string | undefined): Promise<Restaurant> {
    console.log('sea',id)
    const response = await fetch(
      'http://localhost:8080/restaurant/place/' + id,
    );
    if (!response.ok) {
      throw new Error("Problem fetching restaurant");
    }
   // restaurant = response.json()
   const restaurant = response.json();
   return restaurant;
  }

function Restaurant() {
    let { id } = useParams();

    const {
        status,
        data: restaurant,
        error,
        isLoading
      } = useQuery<Restaurant>({
        queryKey: ["getInfo"],
        queryFn: () => fetchRestaurantInfo(id)
    
      } );

   
      if (error) {
        console.log("error", error);
      }
    
    return(
        <VStack>
            {isLoading ? (
               <p> Loading</p>
            ) : (
              <Text>{restaurant?.name}</Text>  
            )}
           
        </VStack>
        
    )
}

export default Restaurant
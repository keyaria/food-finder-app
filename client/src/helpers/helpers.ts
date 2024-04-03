import { cogentLocation } from "../constants/data";
import { RestaurantResponse } from "../types/Restaurant";

export async function fetchPlace(): Promise<RestaurantResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/restaurant/place?lat=${cogentLocation.lat}&lng=${cogentLocation.long}`,
  );
  if (!response.ok) {
    throw new Error("Problem fetching restaurant");
  }
  const restaurant = response.json();

  return restaurant;
}

export async function fetchRestaurantInfo(
  id: string | undefined,
): Promise<RestaurantResponse> {
  const response = await fetch(
    import.meta.env.VITE_API_BASE_URL + "/restaurant/place/" + id,
  );
  if (!response.ok) {
    throw new Error("Problem fetching restaurant");
  }
  const restaurant = response.json();
  return restaurant;
}

// export async function fetchSearch(arg: { queryKey: string[]; }, queryId: string): Promise<Restaurant[] | any> {
//   const cache = getFromCache(`getResults/${queryId}`); // try to access the data from cache
//   if (cache) return cache; // use the data if in the cache

//   // if not, get the data
//   const data = await fetch(
//     `${import.meta.env.VITE_API_BASE_URL}/restaurant/search?lat=${cogentLocation.lat}&lng=${cogentLocation.long}&text=${arg.queryKey[0].split("/")[1]}`,
//   );

//   const restaurants = await data;
//   console.log("the res", restaurants);
//   return restaurants.json();
// }

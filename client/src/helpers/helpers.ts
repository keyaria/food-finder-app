import { cogentLocation } from "../constants/data";
import { Restaurant, RestaurantResponse } from "../types/Restaurant";

export async function fetchPlace(): Promise<RestaurantResponse> {
  const response = await fetch(
    `http://localhost:8080/restaurant/place?lat=${cogentLocation.lat}&lng=${cogentLocation.long}`,
  );
  if (!response.ok) {
    throw new Error("Problem fetching restaurant");
  }
  const restaurant = response.json();
  return restaurant;
}

export async function fetchSearch(text: string): Promise<Restaurant[]> {
  const response = await fetch(
    `/search?lat=${cogentLocation.lat}&lng=${cogentLocation.long}&text=${text}`,
  );

  if (!response.ok) {
    throw new Error("Problem fetching restaurant");
  }
  const restaurants = await response;
  console.log("dadada", restaurants);
  return response.json();
}

import {
  AdvancedMarker,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { cogentLocation } from "../constants/data";
import { Restaurant, RestaurantResponse } from "../types/Restaurant";

type Props = {
  recRestaurant: RestaurantResponse | undefined;
  searchResults: Restaurant[];
  setSelectedRes: any;
};

const CustomMap = ({
  recRestaurant,
  searchResults,
  setSelectedRes,
}: Props): any => {
  return (
    <Map
      style={{ width: "100%", height: "100%", minHeight: "100vh" }}
      defaultCenter={{
        lat: cogentLocation.lat,
        lng: cogentLocation.long,
      }}
      defaultZoom={15}
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
   
          <Pin> 
   </Pin>
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

            </>
          );
        })}
    </Map>
  );
};

{
  /* {infowindowShown && (
                  <InfoWindow anchor={marker}>
                             <ChakraLink
        as={ReactRouterLink}
        to={`/restaurant/` + item.place_id}
      >{item.name}
                </ChakraLink>
                </InfoWindow>
                  )} */
}
export default CustomMap;

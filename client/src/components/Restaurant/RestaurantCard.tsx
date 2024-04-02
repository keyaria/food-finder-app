import { VStack, Heading, Text, Link, Image, Icon } from "@chakra-ui/react";
import { Rating, ThinStar } from "@smastrom/react-rating";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";

function RestaurantCard({ restaurantInfo }: any) {
  const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#fbf1a9",
  };

  return (
    <VStack>
      <ChakraLink
        as={ReactRouterLink}
        to={`/restaurant/` + restaurantInfo.restaurant.place_id}
      >
        <Heading as="h3" py="4" size="lg">
          {restaurantInfo.restaurant.name}
        </Heading>
      </ChakraLink>
      <Image
        src={`data:image/jpeg;base64,${restaurantInfo.photoStream}`}
        alt="Restaurant"
        maxH="12rem"
      />
      <Rating
        style={{ maxWidth: 150 }}
        value={parseInt(restaurantInfo.restaurant.rating)}
        readOnly={true}
        halfFillMode="svg"
        itemStyles={myStyles}
      />
      <Text>
        # of User Ratings: {restaurantInfo.restaurant.user_ratings_total}
      </Text>

      <Text mx="auto" textColor={"gray"}>
        {restaurantInfo.restaurant.vicinity}
      </Text>
      {/* <Icons count={5} /> */}
      {/* <Text>{inputs.map((i:any) => '$')}</Text> */}
    </VStack>
  );
}

export default RestaurantCard;

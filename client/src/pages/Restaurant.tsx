import {
  VStack,
  Text,
  CircularProgress,
  Heading,
  Image,
  Flex,
  Avatar,
  Card,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { RestaurantResponse } from "../types/Restaurant";
import { Rating, ThinStar } from "@smastrom/react-rating";
import { fetchRestaurantInfo } from "../helpers/helpers";

function RestaurantPage() {
  let { id } = useParams();

  const { data, error, isLoading } = useQuery<RestaurantResponse>({
    queryKey: ["getInfo"],
    queryFn: () => fetchRestaurantInfo(id),
  });

  if (error) {
    console.log("error", error);
  }

  if (isLoading) {
    return <CircularProgress isIndeterminate color="cyan.300" />;
  }
  const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#fbf1a9",
  };

  return (
    <VStack>
      {data && (
        <>
          <Flex h={"460px"} w="100%">
            <Image
              src={`data:image/jpeg;base64,${data?.photoStream[0]}`}
              w="100%"
            />
          </Flex>
          <Flex
            mt="-51px"
            bg="white"
            width="80%"
            rounded="lg"
            flexDir="column"
            p="12"
            gap="1rem"
          >
            <Heading>{data?.restaurant.name}</Heading>
            <Rating
              style={{ maxWidth: 150 }}
              value={data.restaurant.rating}
              readOnly={true}
              halfFillMode="svg"
              itemStyles={myStyles}
            />
            <Text>{data.restaurant.user_ratings_total} Photos</Text>
            <Flex flexDir={"row"} flexWrap={"wrap"} w="100%">
              {(data.photoStream as String[]).map((photo) => {
                return (
                  <Image src={`data:image/jpeg;base64,${photo}`} w="10%" />
                );
              })}
            </Flex>
            <Text>{data.restaurant.user_ratings_total} Reviews</Text>
            {data.restaurant.reviews?.map((review) => {
              return (
                <Card p="1.2rem" w={["100%"]} mb="1rem">
                  <Flex>
                    <Avatar
                      name={review.author_name}
                      src={review.profile_photo_url}
                    />
                    <Text fontWeight="bold">{review.author_name}</Text>
                    <Text color="gray.400" pl="1rem">
                      {review.relative_time_description}
                    </Text>
                  </Flex>

                  <Text>{review.rating} out of 5</Text>
                  <Text fontSize="xs">{review.text}</Text>
                </Card>
              );
            })}
          </Flex>
        </>
      )}
    </VStack>
  );
}

export default RestaurantPage;

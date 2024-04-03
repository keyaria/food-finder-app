import { Box, Flex, Heading, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import viteLogo from "/vite.svg";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

function Layout() {
  return (
    <>
      <VStack gap="0">
        <Box bg="cyan.700" h="10px" w="100%" />
        <Flex as="nav" align="center" w="100%" color="black" h="4rem" pl="1rem">
          <img src={viteLogo} className="logo" alt="Vite logo" />
          <Heading as="h1" color="blackAlpha.800" size="lg">
            <ChakraLink as={ReactRouterLink} to={`/`}>
              Food Finder
            </ChakraLink>
          </Heading>
        </Flex>
        <Outlet />
      </VStack>
    </>
  );
}

export default Layout;

import { Box, Flex, HStack, Heading, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import viteLogo from "/vite.svg";

function Layout() {
  return (
    <>
      <VStack gap="0">
        <Box bg="cyan.700" h="10px" w="100%" />
        <Flex as="nav" align="center" w="100%" color="black">
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <Heading as="h1" color="blackAlpha.800" size="lg">
            Food Finder
          </Heading>
        </Flex>
        <Outlet />
      </VStack>
    </>
  );
}

export default Layout;

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Input,
} from "@chakra-ui/react";

import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  Search2Icon,
} from "@chakra-ui/icons";

import { Link } from "react-router-dom";

import DrawerComponent from "../Drawer";

const Links = [
  {
    name: "My Events",
    path: "/user/events",
  },
  {
    name: "Requests",
    path: "/request/summary",
  },
];

const NavLink = ({ children, path }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    to={path}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawer = useDisclosure();

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
      >
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none", lg: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />

          {/* *This HStack will make visible all the links in the medium and large screen */}

          <HStack
            spacing={8}
            alignItems={"center"}
          >
            <Link to="/">
              <Box>Home</Box>
            </Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {/* Mapping NavLink Component */}

              {Links.map((link) => (
                <NavLink
                  key={link.name}
                  path={link.path}
                >
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>

          {/* Here we have Drawer Component that will visible on search button click */}

          <Flex alignItems={"center"}>
            <IconButton
              //   colorScheme="teal"
              aria-label="Call Segun"
              size="sm"
              icon={<Search2Icon />}
              onClick={drawer.onOpen}
            />
            <DrawerComponent
              placement={"top"}
              isOpen={drawer.isOpen}
              onClose={drawer.onClose}
            >
              <Input
                mt={6}
                type="text"
                placeholder="Search Events here"
              />
            </DrawerComponent>

            {/* Add Event Button */}

            <Button
              variant={"solid"}
              colorScheme={"teal"}
              size={"sm"}
              mx={2}
              leftIcon={<AddIcon />}
            >
              Events
            </Button>

            {/* Login Link */}

            <NavLink path={"/auth"}>Login</NavLink>
          </Flex>
        </Flex>

        {/* Mapping NavLink Component */}

        {isOpen ? (
          <Box
            pb={4}
            display={{ md: "none", lg: "none" }}
          >
            <Stack
              as={"nav"}
              spacing={4}
            >
              {Links.map((link) => (
                <NavLink
                  key={link.name}
                  path={link.path}
                >
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;

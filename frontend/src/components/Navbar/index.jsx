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
  Text,
  Image,
} from "@chakra-ui/react";

import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  Search2Icon,
} from "@chakra-ui/icons";

import { Link, Navigate } from "react-router-dom";

import DrawerComponent from "../Drawer";
import ModalComponent from "../Modal";
import Form from "../Form";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, getAllEvents } from "../../store/Event/event.action";
import useToastComponent from "../../custom-hook/useToast";
import { useEffect, useRef, useState } from "react";
import { logoutUser } from "../../store/Auth/auth.action";

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
  //* For Filter
  const [search, setSearch] = useState("");

  // * for storing timeoutId
  const ref = useRef("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawer = useDisclosure();
  const modal = useDisclosure();

  //   * consuming redux state
  const { token, auth } = useSelector((state) => state.authManager);

  const dispatch = useDispatch();

  //* Toast from Custom Hook
  const Toast = useToastComponent();

  //   * for adding event when user click on submit
  const addEventFunc = (eventData) => {
    //* dispatching add Event action
    dispatch(createEvent(token, eventData, Toast));

    //* for closing modal
    modal.onClose();
  };

  // For opening Modal
  const openModal = () => {
    if (!auth) return <Navigate to="/auth" />;
    modal.onOpen();
  };

  // Fpr Logging Out User
  const logout = () => {
    dispatch(logoutUser(Toast));
  };

  // *Handle change for serach
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // *Debouncing in Search Filter

  useEffect(() => {
    ref.current = setTimeout(() => {
      dispatch(getAllEvents(`q=${search}`, Toast));
    }, 400);

    //* cleanup function clears the timeout
    return () => {
      clearTimeout(ref.current);
    };
  }, [search]);

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
              <Box>
                <Image
                  w="40px"
                  src="/logo.png"
                  alt="logo"
                />
              </Box>
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
                placeholder="Search Events by Events Name"
                onChange={handleChange}
              />
            </DrawerComponent>

            {/* Add Event Button */}

            <Button
              variant={"solid"}
              colorScheme={"teal"}
              size={"sm"}
              mx={2}
              leftIcon={<AddIcon />}
              onClick={openModal}
            >
              Events
            </Button>

            {/* Modal Component for adding Event */}

            <ModalComponent
              title={"Add Event"}
              isOpen={modal.isOpen}
              onClose={modal.onClose}
            >
              <Form addEventFunc={addEventFunc} />
            </ModalComponent>

            {/* Login Link and Logout Button */}

            {auth ? (
              <Text
                cursor="pointer"
                onClick={logout}
              >
                Logout
              </Text>
            ) : (
              <NavLink path={"/auth"}>Login</NavLink>
            )}
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

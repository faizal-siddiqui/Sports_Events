import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import useToastComponent from "../../custom-hook/useToast";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as authAction from "../../store/Auth/auth.action";

// * initialState for formComponent

const initialState = {
  name: "",
  username: "",
  password: "",
};

// * SignUp Component

const SignUp = ({ setToggle }) => {
  const [userCreds, setUserCreds] = useState(initialState);

  //   * Consuming Redux State
  const { loading } = useSelector((state) => state.authManager);

  const dispatch = useDispatch();

  //* Toast from custom hook
  const Toast = useToastComponent();

  //   * function to render login Component
  const showLoginComponent = () => {
    setToggle(false);
  };

  //   * for handling form Inputs
  const handleChange = (e) => {
    setUserCreds({
      ...userCreds,
      [e.target.id]: e.target.value,
    });
  };

  //   * when user click on signup
  const userSignUp = (e) => {
    e.preventDefault();

    // * dispatching actions to signup
    dispatch(authAction.signUpUser(userCreds, Toast, showLoginComponent));

    // * reset Inputs
    setUserCreds(initialState);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={12}
        px={6}
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Create your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={userSignUp}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Enter Name"
                  type="text"
                  id="name"
                  value={userCreds.name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Enter Username"
                  type="text"
                  id="username"
                  autoComplete="username"
                  value={userCreds.username}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="Enter Password"
                  type="password"
                  autoComplete="current-password"
                  id="password"
                  value={userCreds.password}
                  onChange={handleChange}
                />
              </FormControl>
              <Stack
                mt={7}
                spacing={10}
              >
                <Button
                  type="submit"
                  bg={"teal.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  isLoading={loading}
                >
                  Sign Up
                </Button>
                <Text
                  textAlign="center"
                  cursor="pointer"
                  onClick={showLoginComponent}
                >
                  Already have an account
                </Text>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUp;

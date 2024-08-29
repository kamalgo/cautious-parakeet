import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FcBusinessman, FcComments, FcAndroidOs, FcLock } from "react-icons/fc";
import { FaMobileAlt } from "react-icons/fa";

import { GrUserSettings } from "react-icons/gr";

import { MdOutlineEmail } from "react-icons/md";

import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";

const Signup = () => {
  const toast = useToast();

  const navigate = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");
  const [ref_code, setRefCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleShowClick = () => setShowPassword(!showPassword);

  const PasswordErrorMessage = () => {
    return (
      <p className="FieldError" style={{ color: "red" }}>
        Password should have at least 8 characters
      </p>
    );
  };

  const getIsFormValid = () => {
    return username && password.length >= 8;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    navigate.replace("/dashboard/admin");
    // signin({
    //   username,
    //   password,
    // })
    //   .then((res) => {
    //     if (res.success) {
    //       authenticate(res, () => {
    //         const { role } = isAuthenticated().user;
    //         switch (role) {
    //           case ROLES.ADMIN:
    //             return navigate.replace("/dashboard/admin");
    //           case ROLES.ANALYST:
    //             return navigate.replace("/dashboard/analyst");
    //           case ROLES.COMMITTEE:
    //             return navigate.replace("/dashboard/committee");
    //           case ROLES.UMPIRE:
    //             return navigate.replace("/dashboard/umpire");
    //           default:
    //             return navigate.replace("/");
    //         }
    //       });
    //     } else {
    //       signout();
    //       toast({
    //         title: "Operation failed!",
    //         description: res.message,
    //         status: "error",
    //         duration: 9000,
    //         isClosable: true,
    //         position: "top-right",
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     toast({
    //       title: "Error",
    //       description: "Operation Failed!",
    //       status: "error",
    //       duration: 9000,
    //       isClosable: true,
    //       position: "top-right",
    //     });

    //     console.error(error);
    //   });
  };

  return (
    <>
      <Box bg="primary.main">
        <Container>
          <Box height={"100vh"} pt="120px">
            <Box
              py={"80px"}
              bg="primary.900"
              borderRadius={"20px"}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            // mt="30px"
            >
              <Box>
                <Box>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDirection={"column"}
                  >
                    {/* <Box boxSize="80px" objectFit="cover">
                      <Image src={bccilogo} alt="" />
                    </Box> */}
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      flexDirection={"column"}
                    >
                      <Heading as="h5" size={"lg"} color="primary.200" m={2}>
                        Create User Account
                      </Heading>
                      <Heading as="h6" size="sm" color="secondary.main" m={2}>
                        Forstu
                      </Heading>
                    </Box>
                  </Box>
                  <Box minW={{ base: "90%", md: "468px" }}>
                    <form onSubmit={handleSubmit}>
                      <Stack
                        spacing={4}
                        p="1rem"
                        backgroundColor="whiteAlpha.900"
                        boxShadow="md"
                      >
                        <FormControl>
                          <InputGroup>
                            <InputLeftElement
                              pointerEvents="none"
                              children={<FcBusinessman size={20} />}
                            />

                            <Input
                              type="text"
                              placeholder="Username"
                              value={username}
                              onChange={(e) => {
                                setUsername(e.target.value);
                              }}
                              required
                            />
                            <br />
                            <br />
                          </InputGroup>
                        </FormControl>

                        <FormControl>
                          <InputGroup>
                            <InputLeftElement
                              pointerEvents="none"
                              children={<MdOutlineEmail size={20} />}
                            />

                            <Input
                              type="email"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => {
                                setUsername(e.target.value);
                              }}
                              required
                            />
                            <br />
                            <br />
                          </InputGroup>
                        </FormControl>



                        <FormControl>
                          <InputGroup>
                            <InputLeftElement
                              pointerEvents="none"
                              children={<FaMobileAlt size={20} />}
                            />

                            <Input
                              type="number"
                              placeholder="Mobile Number"
                              value={mobile}
                              onChange={(e) => {
                                setMobile(e.target.value);
                              }}
                              required
                            />
                            <br />
                            <br />
                          </InputGroup>
                        </FormControl>

                        <FormControl>
                          <InputGroup>
                            <InputLeftElement
                              pointerEvents="none"
                              children={<GrUserSettings size={20} />}
                            />

                            <Input
                              type="text"
                              placeholder="Role"
                              value={role}
                              onChange={(e) => {
                                setRole(e.target.value);
                              }}
                              required
                            />
                            <br />
                            <br />
                          </InputGroup>
                        </FormControl>

                        <FormControl>
                          <InputGroup>
                            <InputLeftElement
                              pointerEvents="none"
                              children={<FcComments size={20} />}
                            />

                            <Input
                              type="text"
                              placeholder="REF_CODE"
                              value={ref_code}
                              onChange={(e) => {
                                setRefCode(e.target.value);
                              }}
                              required
                            />
                            <br />
                            <br />
                          </InputGroup>
                        </FormControl>

                        <FormControl>
                          <InputGroup>
                            <InputLeftElement
                              pointerEvents="none"
                              color="gray.300"
                              children={<FcLock size={20} />}
                            />
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                              required
                            />

                            {password.isTouched && password.length < 8 ? (
                              <PasswordErrorMessage />
                            ) : null}
                            <InputRightElement width="4.5rem">
                              <Button
                                h="1.75rem"
                                size="sm"
                                onClick={handleShowClick}
                              >
                                {showPassword ? (
                                  <ViewOffIcon color="#F98E2B" />
                                ) : (
                                  <ViewIcon color="#F98E2B" />
                                )}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                        </FormControl>
                        <Button
                          borderRadius={0}
                          disabled={!getIsFormValid()}
                          type="submit"
                          variant="solid"
                          bg="secondary.main"
                          width="full"
                          color="text.light"
                        >
                          Register
                        </Button>
                      </Stack>
                    </form>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Signup;

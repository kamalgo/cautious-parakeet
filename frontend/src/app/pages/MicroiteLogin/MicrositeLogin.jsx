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
import { FcBusinessman, FcLock } from "react-icons/fc";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { signin } from "../../api/Auth";
import ROLES from "../../helpers/Roles";
import {
  authenticate,
  getOTPSecret,
  isAuthenticated,
  setOTPSecret,
  signout,
} from "../../helpers/AuthHelpers";
import {
  getOTPforStudent,
  verifyStudentByOtpAndEmail,
} from "../../api/MicrositeAPI/MicrositeAPI";

const MicrositeLogin = () => {
  const toast = useToast();

  const navigate = useHistory();

  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [showOTP, setshowOTP] = useState(false);

  const handleShowClick = () => setshowOTP(!showOTP);

  const OTPErrorMessage = () => {
    return (
      <p className="FieldError" style={{ color: "red" }}>
        OTP should have at least 6 characters
      </p>
    );
  };

  const getIsFormValid = () => {
    return email && otp.length >= 8;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const secret = getOTPSecret().secret;
    console.log("JJJJJ", email, otp, secret);
    let data = {
      secret,
      otp,
      email,
    };
    verifyStudentByOtpAndEmail(data).then((res) => {
      if (res.success) {
        console.log("res", res);
        toast({
          title: "Success!",
          description: res.message,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });

        return navigate.replace("signin/incompletprofile");
      } else {
        console.log("error");
        toast({
          title: "Operation failed!",
          description: res.message,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      }
    });
  };

  function getOTP() {
    let to = [email];

    getOTPforStudent(to)
      .then((res) => {
        if (res.success) {
          console.log("res", res);
          setOTPSecret(res.data, () => {
            console.log(res);
          });
          toast({
            title: "Success!",
            description: res.message,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        } else {
          toast({
            title: "Operation failed!",
            description: res.message,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Operation Failed!",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });

        console.error(error);
      });
  }

  return (
    <>
      {/* <Box bg="primary.main">
        <Container>
          <Box height={"100vh"} pt="120px">

          </Box>
        </Container>
      </Box> */}

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
                Login to Student Account
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
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
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
                      type={showOTP ? "text" : "password"}
                      placeholder="OTP"
                      value={otp}
                      onChange={(e) => {
                        setOTP(e.target.value);
                      }}
                      required
                    />

                    {otp.isTouched && otp.length < 8 ? (
                      <OTPErrorMessage />
                    ) : null}
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showOTP ? (
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
                  Submit
                </Button>
              </Stack>
            </form>

            <Button
              borderRadius={0}
              disabled={!getIsFormValid()}
              variant="solid"
              mt={2}
              bg="secondary.main"
              width="half"
              color="text.light"
              onClick={() => {
                getOTP();
              }}
            >
              Get OTP
            </Button>
            <Heading as="h6" size="xs" pt={2} textAlign={"center"}>
              Note: Enter your Email to get OTP
            </Heading>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MicrositeLogin;

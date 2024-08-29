// import {
//   Box,
//   Button,
//   Container,
//   FormControl,
//   Heading,
//   Input,
//   InputGroup,
//   InputLeftElement,
//   InputRightElement,
//   Stack,
//   useToast,
// } from "@chakra-ui/react";
// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import { FcBusinessman, FcLock } from "react-icons/fc";
// import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
// import { signin } from "../../api/Auth";
// import ROLES from "../../helpers/Roles";
// import {
//   authenticate,
//   isAuthenticated,
//   signout,
// } from "../../helpers/AuthHelpers";

// const Login = () => {
//   const toast = useToast();

//   const navigate = useHistory();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleShowClick = () => setShowPassword(!showPassword);

//   const PasswordErrorMessage = () => {
//     return (
//       <p className="FieldError" style={{ color: "red" }}>
//         Password should have at least 8 characters
//       </p>
//     );
//   };

//   const getIsFormValid = () => {
//     return username && password.length >= 8;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("JJJJJ", username, password);
//     signin({
//       username,
//       password,
//     })
//       .then((res) => {
//         if (res.success) {
//           console.log("res", res);
//           authenticate(res, () => {
//             const { role } = isAuthenticated().user;
//             switch (role) {

//               case ROLES.ADMIN:
//                 return navigate.replace("/dashboard/admin");

//                 case ROLES.COLLEGE:
//                   return navigate.replace("/dashboard/college"); 

//                 case ROLES.STUDENT:
//                 return navigate.replace("/dashboard/student");

//                 case ROLES.COWORKER:
//                   navigate("/dashboard/coworker");
//                   break;

//               default:
//                 return navigate.replace("/");
//             }
//           });
//         } else {
//           signout();
//           toast({
//             title: "Operation failed!",
//             description: res.message,
//             status: "error",
//             duration: 9000,
//             isClosable: true,
//             position: "top-right",
//           });
//         }
//       })
//       .catch((error) => {
//         toast({
//           title: "Error",
//           description: "Operation Failed!",
//           status: "error",
//           duration: 9000,
//           isClosable: true,
//           position: "top-right",
//         });

//         console.error(error);
//       });
//   };

//   return (
//     <>
//       {/* <Box bg="primary.main">
//         <Container>
//           <Box height={"100vh"} pt="120px">
//             <Box
//               py={"80px"}
//               bg="primary.900"
//               borderRadius={"20px"}
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//               justifyContent="center"
//             >

//             </Box>
//           </Box>
//         </Container>
//       </Box> */}

//       <Box>
//         <Box>
//           <Box
//             display={"flex"}
//             justifyContent={"center"}
//             alignItems={"center"}
//             flexDirection={"column"}
//           >
//             {/* <Box boxSize="80px" objectFit="cover">
//                     <Image src={bccilogo} alt="" />
//                   </Box> */}
//             <Box
//               display={"flex"}
//               justifyContent={"center"}
//               alignItems={"center"}
//               flexDirection={"column"}
//             >
//               <Heading as="h5" size={"lg"} color="primary.200" m={2}>
//                 Login to your Account
//               </Heading>
//               <Heading as="h6" size="sm" color="secondary.main" m={2}>
//                 Forstu
//               </Heading>
//             </Box>
//           </Box>
//           <Box minW={{ base: "90%", md: "468px" }}>
//             <form onSubmit={handleSubmit}>
//               <Stack
//                 spacing={4}
//                 p="1rem"
//                 backgroundColor="whiteAlpha.900"
//                 boxShadow="md"
//               >
//                 <FormControl>
//                   <InputGroup>
//                     <InputLeftElement
//                       pointerEvents="none"
//                       children={<FcBusinessman size={20} />}
//                     />

//                     <Input
//                       type="text"
//                       placeholder="Username"
//                       value={username}
//                       onChange={(e) => {
//                         setUsername(e.target.value);
//                       }}
//                       required
//                     />
//                     <br />
//                     <br />
//                   </InputGroup>
//                 </FormControl>
//                 <FormControl>
//                   <InputGroup>
//                     <InputLeftElement
//                       pointerEvents="none"
//                       color="gray.300"
//                       children={<FcLock size={20} />}
//                     />
//                     <Input
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Password"
//                       value={password}
//                       onChange={(e) => {
//                         setPassword(e.target.value);
//                       }}
//                       required
//                     />

//                     {password.isTouched && password.length < 8 ? (
//                       <PasswordErrorMessage />
//                     ) : null}
//                     <InputRightElement width="4.5rem">
//                       <Button h="1.75rem" size="sm" onClick={handleShowClick}>
//                         {showPassword ? (
//                           <ViewOffIcon color="#F98E2B" />
//                         ) : (
//                           <ViewIcon color="#F98E2B" />
//                         )}
//                       </Button>
//                     </InputRightElement>
//                   </InputGroup>
//                 </FormControl>
//                 <Button
//                   borderRadius={0}
//                   disabled={!getIsFormValid()}
//                   type="submit"
//                   variant="solid"
//                   bg="secondary.main"
//                   width="full"
//                   color="text.light"
//                 >
//                   Login
//                 </Button>
//               </Stack>
//             </form>
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default Login;


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
import { useHistory } from "react-router-dom";  // Use useHistory for v5
import { FcBusinessman, FcLock } from "react-icons/fc";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { signin } from "../../api/Auth";
import ROLES from "../../helpers/Roles";
import {
  authenticate,
  isAuthenticated,
  signout,
} from "../../helpers/AuthHelpers";

const Login = () => {
  const toast = useToast();

  const history = useHistory();  // Use useHistory for v5

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    console.log("JJJJJ", username, password);
    signin({
      username,
      password,
    })
      .then((res) => {
        if (res.success) {
          console.log("res", res);
          authenticate(res, () => {
            const { role } = isAuthenticated().user;
            switch (role) {
              case ROLES.ADMIN:
                return history.replace("/dashboard/admin");  // Use history.replace for v5

              case ROLES.COLLEGE:
                return history.replace("/dashboard/college");  // Use history.replace for v5

              case ROLES.STUDENT:
                return history.replace("/dashboard/student");  // Use history.replace for v5

              // case ROLES.COWORKER:  // Added case for COWORKER
              //   return history.replace("/dashboard/coworker");  // Use history.replace for v5

              case ROLES.COWORKER:
                // Navigate to the coworker route and pass username as state
                return history.push("/dashboard/coworker", { username }); 

              default:
                return history.replace("/");  // Use history.replace for v5
            }
          });
        } else {
          signout();
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
  };

  return (
    <>
      {/* <Box bg="primary.main">
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
            >

            </Box>
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
                Login to your Account
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
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
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
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;

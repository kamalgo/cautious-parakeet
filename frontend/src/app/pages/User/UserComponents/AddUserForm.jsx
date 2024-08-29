import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Box,
  VStack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { useToast } from "@chakra-ui/react";
// import { passwordRegex, usernameRegex } from "../../util/regex";
import ROLES from "../../../helpers/Roles";
import { addUserApi } from "../../../api/User";

const roles = ROLES.DB_ROLE_ENUM;
// const handleShowClick = () => setShowPassword(!showPassword);
const AddUserForm = ({ getAllUsers, onClose }) => {
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [ref_code, setRef_code] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);

  const handleClick = () => setShow(!show);
  const handleClick2 = () => setShow2(!show2);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Do something with the form data, such as submit it to a backend server

    addUserApi({
      username,
      email,
      mobile,
      password,
      ref_code,
      role,
    })
      .then((res) => {
        if (res.success) {
          toast({
            title: "User created.",
            description: res.message,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
          onClose();
          getAllUsers();
          setUsername("");
          setPassword("");
          setRole("");
        } else {
          toast({
            title: "Operation failed!",
            description: res.message,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
          onClose();
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
      <Box maxW="md" mx="auto" mt="8">
        <form onSubmit={handleSubmit}>
          <VStack spacing="4">
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </FormControl>
            <FormControl id="mobile">
              <FormLabel>Mobile</FormLabel>
              <Input
                type="text"
                placeholder="Enter your Mobile"
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
                required
              />
            </FormControl>

            <FormControl id="ref_code">
              <FormLabel>Reference Code</FormLabel>
              <Input
                type="text"
                placeholder="Enter your ref_code"
                value={ref_code}
                onChange={(event) => setRef_code(event.target.value)}
                required
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup size="md" flexDirection={"column"} gap={5}>
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />

                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="confirmpassword">
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup size="md" flexDirection={"column"} gap={5}>
                <Input
                  pr="4.5rem"
                  type={show2 ? "text" : "password"}
                  pattern={password}
                  placeholder="Enter password"
                  // value={password}
                  // onChange={(event) => setPassword(event.target.value)}
                  required
                />

                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick2}>
                    {show2 ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl id="role">
              <FormLabel>Role</FormLabel>
              <Select
                placeholder="Select Role"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                required
              >
                {roles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Button
              color="text.light"
              type="submit"
              bg="primary.main"
              variant={"outline"}
            >
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </>
  );
};

export default AddUserForm;

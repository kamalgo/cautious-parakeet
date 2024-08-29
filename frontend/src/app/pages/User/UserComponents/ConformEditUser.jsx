import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

// import ROLES from "../../helpers/Roles";

// import { updateUserApi } from "../../api/User";
import { useToast } from "@chakra-ui/react";
import { MdModeEdit } from "react-icons/md";
import ROLES from "../../../helpers/Roles";

const roles = ROLES.DB_ROLE_ENUM;

function ConformEditUser({ user, getAllUsers }) {
  const toast = useToast();

  const [userData, setUserData] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data, such as submit it to a backend server

    const data = {
      id: userData.id,
      username: userData.username,
      role: userData.role,
    };

    updateUserApi(data)
      .then((res) => {
        if (res.success) {
          onClose();
          getAllUsers();
          toast({
            title: "User Updated.",
            description: res.message,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        } else {
          onClose();
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

  const handleChange = (param) => (event) => {
    setUserData({ ...userData, [param]: event.target.value });
  };

  useEffect(() => {
    setUserData(user);
  }, []);

  return (
    <>
      <Button onClick={onOpen} variant={"ghost"}>
        {/* <FaUserEdit color="grey" /> */}
        <Box marginRight={3} color="gray.500">
          {" "}
          <MdModeEdit size={"15"} />
        </Box>
        <Text fontSize="xs"> Edit</Text>
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Update User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box maxW="md" mx="auto" mt="8">
                <VStack spacing="4">
                  <FormControl id="username">
                    <FormLabel>Username</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      value={userData.username}
                      onChange={handleChange("username")}
                      required
                    />
                  </FormControl>

                  <FormControl id="role">
                    <FormLabel>Role</FormLabel>
                    <Select
                      placeholder="Select Role"
                      value={userData.role}
                      onChange={handleChange("role")}
                      required
                    >
                      {roles.map((role, index) => (
                        <option key={index} value={role}>
                          {role}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </VStack>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button
                color="text.light"
                type="submit"
                bg="primary.main"
                variant={"outline"}
              >
                Submit
              </Button>
              <Button
                mx={2}
                type="button"
                onClick={onClose}
                variant={"outline"}
              >
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ConformEditUser;

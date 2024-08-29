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
import { updateCollageApi } from "../../../api/College";

const roles = ROLES.DB_ROLE_ENUM;

function ConformEditCollage({ collage, getAllColleges }) {
  const toast = useToast();

  const [collageData, setCollageData] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data, such as submit it to a backend server

    const data = {
      id: collageData.id,
      institute_choice_code: collageData.institute_choice_code,
      institute_name: collageData.institute_name,
      institute_state: collageData.institute_state,
    };

    updateCollageApi(data)
      .then((res) => {
        if (res.success) {
          onClose();
          getAllColleges();
          toast({
            title: "Collage Updated.",
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
    setCollageData({ ...collageData, [param]: event.target.value });
  };

  useEffect(() => {
    // console.log("collage", collage);
    setCollageData(collage);
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
            <ModalHeader>Update Collage</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box maxW="md" mx="auto" mt="8">
                <VStack spacing="4">
                  <FormControl id="institute_choice_code">
                    <FormLabel>Institute Choice Code</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your Institute Choice Code"
                      value={collageData.institute_choice_code}
                      onChange={handleChange("institute_choice_code")}
                      required
                    />
                  </FormControl>

                  <FormControl id="institute_name">
                    <FormLabel>Institute Name</FormLabel>

                    <Input
                      type="text"
                      placeholder="Enter your Institute Name"
                      value={collageData.institute_name}
                      onChange={handleChange("institute_name")}
                      required
                    />
                  </FormControl>

                  <FormControl id="institute_state">
                    <FormLabel>Institute State</FormLabel>

                    <Input
                      type="text"
                      placeholder="Enter your Institute State"
                      value={collageData.institute_state}
                      onChange={handleChange("institute_state")}
                      required
                    />
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

export default ConformEditCollage;
